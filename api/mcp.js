const TOOL="baken_task_mcp_test";
const OK="BAKEN_TASK_MCP_TEST_OK";
function send(res,status,body){
  res.status(status);
  if(status===204) return res.end();
  res.setHeader("Content-Type","application/json");
  return res.send(JSON.stringify(body));
}
export default function handler(req,res){
  if(req.method!=="POST") return send(res,405,{error:"method_not_allowed"});
  const b=req.body;
  if(!b||typeof b!=="object") return send(res,400,{jsonrpc:"2.0",id:null,error:{code:-32700,message:"Parse error"}});
  const id=b.id??null;
  if(b.method==="initialize") return send(res,200,{jsonrpc:"2.0",id,result:{protocolVersion:"2025-06-18",capabilities:{tools:{}},serverInfo:{name:"baken-task-mcp-test",version:"1.0.1"}}});
  if(b.method==="ping") return send(res,200,{jsonrpc:"2.0",id,result:{}});
  if(b.method==="notifications/initialized") return send(res,204,null);
  if(b.method==="tools/list") return send(res,200,{jsonrpc:"2.0",id,result:{tools:[{name:TOOL,description:"BAKEN Scheduled Task MCP connectivity test. No external I/O.",inputSchema:{type:"object",properties:{test_value:{type:"string",const:"BAKEN_TASK_MCP_TEST"}},required:["test_value"],additionalProperties:false}}]}});
  if(b.method==="tools/call"){
    const a=b.params?.arguments;
    if(b.params?.name!==TOOL) return send(res,200,{jsonrpc:"2.0",id,error:{code:-32602,message:"Unknown tool"}});
    if(!a||a.test_value!=="BAKEN_TASK_MCP_TEST"||Object.keys(a).length!==1) return send(res,200,{jsonrpc:"2.0",id,error:{code:-32602,message:"Invalid arguments"}});
    return send(res,200,{jsonrpc:"2.0",id,result:{content:[{type:"text",text:OK}]}});
  }
  return send(res,200,{jsonrpc:"2.0",id,error:{code:-32601,message:"Method not found"}});
}