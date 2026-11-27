import json,base64,sys,time,urllib.request,ssl,os
model,ref,out,prompt=sys.argv[1:5]
parts=[{"text":prompt}]
if ref!="-":
    parts.insert(0,{"inline_data":{"mime_type":"image/png","data":base64.b64encode(open(ref,'rb').read()).decode()}})
body={"contents":[{"parts":parts}],"generationConfig":{"responseModalities":["IMAGE"],"imageConfig":{"aspectRatio":"16:9"}}}
ctx=ssl.create_default_context(cafile=os.environ.get("SSL_CERT_FILE"))
req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",data=json.dumps(body).encode(),headers={"content-type":"application/json"})
t0=time.time()
try:
    d=json.loads(urllib.request.urlopen(req,context=ctx,timeout=240).read())
except urllib.error.HTTPError as e:
    print(out,"HTTP",e.code,e.read()[:300].decode()); sys.exit(1)
dt=time.time()-t0
for p in d["candidates"][0]["content"]["parts"]:
    if "inlineData" in p or "inline_data" in p:
        x=p.get("inlineData") or p.get("inline_data"); open(out,"wb").write(base64.b64decode(x["data"]))
        u=d.get("usageMetadata",{}); print(out, f"{dt:.1f} s", x.get("mimeType",x.get("mime_type")), "tokens", u.get("promptTokenCount"), u.get("candidatesTokenCount")); break
else: print(out,"pas d'image",json.dumps(d)[:300])
