await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("0:1"));
const keys=["x","y","width","height","rotation","visible","opacity","blendMode","fills","strokes","strokeWeight","strokeAlign","strokeTopWeight","strokeRightWeight","strokeBottomWeight","strokeLeftWeight","dashPattern","cornerRadius","topLeftRadius","topRightRadius","bottomLeftRadius","bottomRightRadius","effects","layoutMode","layoutWrap","layoutSizingHorizontal","layoutSizingVertical","primaryAxisSizingMode","counterAxisSizingMode","primaryAxisAlignItems","counterAxisAlignItems","paddingTop","paddingRight","paddingBottom","paddingLeft","itemSpacing","counterAxisSpacing","layoutAlign","layoutGrow","layoutPositioning","constraints","clipsContent","boundVariables"];
const styles=[],map=new Map(),nodes=[];
function serial(v){return typeof v==="symbol"?"MIXED":JSON.parse(JSON.stringify(v));}
function visit(n,parent){const v={};for(const k of keys)if(k in n){try{v[k]=serial(n[k]);}catch(e){v[k]={unavailable:String(e)};}}
if(n.type==="TEXT"){for(const k of ["characters","fontName","fontSize","fontWeight","lineHeight","letterSpacing","textAlignHorizontal","textAlignVertical","textAutoResize","textStyleId","paragraphSpacing","paragraphIndent","textCase","textDecoration"])if(k in n)v[k]=serial(n[k]);v.textSegments=serial(n.getStyledTextSegments(["fontName","fontSize","fontWeight","lineHeight","letterSpacing","fills","textCase","textDecoration"]));}
const geom={};for(const k of ["x","y","width","height"]) {geom[k]=v[k];delete v[k];}
const key=JSON.stringify(v);let ix=map.get(key);if(ix===undefined){ix=styles.length;styles.push(v);map.set(key,ix);}nodes.push({id:n.id,parent,name:n.name,type:n.type,...geom,style:ix});if("children"in n)for(const c of n.children)visit(c,n.id);}
for(const id of ["37:6223","37:7135","37:8200"])visit(await figma.getNodeByIdAsync(id),null);
const data=JSON.stringify({fileKey:"gLjFWK9wRUo3yqEGC02IrU",rootIds:["37:6223","37:7135","37:8200"],nodes,styles});
return {fileKey:figma.fileKey,nodes,styles};
