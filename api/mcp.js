const TOOL="baken_task_mcp_test";
const OK="BAKEN_TASK_MCP_TEST_OK";
function json(body,status=200){return new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json"}})}
export default async function handler(req){
 if(req.method!=="POST") return json({error:"method_not_allowed"},405);
 let b; try{b=typeof req.body==="object"?req.body:JSON.parse(req.body||"{}")}catch{return json({jsonrpc:"2.0",id:null,error:{code:-32700,message:"Parse error"}},400)}
 const id=b.id??null;
 if(b.method==="initialize") return json({jsonrpc:"2.0",id,result:{protocolVersion:"2025-06-18",capabilities:{tools:{}},serverInfo:{name:"baken-task-mcp-test",version:"1.0.0"}}});
 if(b.method==="ping") return json({jsonrpc:"2.0",id,result:{}});
 if(b.method==="notifications/initialized") return new Response(null,{status:204});
 if(b.method==="tools/list") return json({jsonrpc:"2.0",id,result:{tools:[{name:TOOL,description:"BAKEN Scheduled Task MCP connectivity test. No external I/O.",inputSchema:{type:"object",properties:{test_value:{type:"string",const:"BAKEN_TASK_MCP_TEST"}},required:["test_value"],additionalProperties:false}}]}});
 if(b.method==="tools/call"){
   const a=b.params?.arguments;
   if(b.params?.name!==TOOL) return json({jsonrpc:"2.0",id,error:{code:-32602,message:"Unknown tool"}});
   if(!a||a.test_value!=="BAKEN_TASK_MCP_TEST"||Object.keys(a).length!==1) return json({jsonrpc:"2.0",id,error:{code:-32602,message:"Invalid arguments"}});
   return json({jsonrpc:"2.0",id,result:{content:[{type:"text",text:OK}]}});
 }
 return json({jsonrpc:"2.0",id,error:{code:-32601,message:"Method not found"}});
}