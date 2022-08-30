import{s as b,_ as w}from"./index.85ad4f27.js";import{r as s}from"./rules.a17129b4.js";import{P as D,Q as V,E as _,g as a,h as B,o as l,k as c,v as C,f as g,w as r,i as d,q as v,F as $,l as z,j as n,t as O,n as P,G as A,H as E}from"./vendor.8c10c2f2.js";const I=D({name:"Upload",props:{modelValue:s.Array,url:s.String,type:s.Array,size:{type:Number,default:80},read:s.Boolean,limit:{type:Number,default:99},one:s.Boolean,isPath:s.Boolean,filterData:s.Function},model:{prop:"modelValue",event:"change"},components:{UploadFilled:V},computed:{fileList:{get:function({modelValue:e}){return[...e]},set:function(e){this.$emit("update:modelValue",e)}}},data(){return{loading:!1,progress:0}},methods:{beforeAvatarUpload(e){const t=this.type.length?this.type.filter(o=>new RegExp(o).test(e.type)||o===e.name.replace(/.+(?=\.)|\./g,"")).length>0:!0,i=e.size/1024/1024<this.size;return t||_.error(`\u8BF7\u4E0A\u4F20\u683C\u5F0F\u6B63\u786E\u7684\u6587\u4EF6,${this.type.join(",")}!`),i||_.error(`\u4E0A\u4F20\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7${this.size}MB!`),t&&i},handleUploadLearnSignVoucherFileChange(e){this.loading=!0;const{file:t}=e;let i=new FormData;i.append("file",t),b({url:this.url,method:"POST",data:i,onUploadprogresss:({loaded:o,total:p})=>{this.progress=Math.ceil(o/p*100)}}).then(({data:o})=>{if(this.one)this.fileList=o;else{const p=JSON.parse(JSON.stringify(this.fileList));p.push(...o),this.fileList=p}}).finally(()=>{this.loading=!1})},handleDelete(e){const t=JSON.parse(JSON.stringify(this.fileList));t.splice(e,1),this.fileList=t},returnData(){return this.fileList}}}),y=e=>(A("data-v-360231d8"),e=e(),E(),e),J={class:"upload"},T=P("\u5220\u9664"),q={class:"image-slot"},j=["href"],M=y(()=>n("i",{class:"el-icon-picture-outline"},null,-1)),G={key:2,class:"item"},H=y(()=>n("div",{slot:"error",class:"image-slot"},[n("a",{class:"tip-text"},"\u672A\u4E0A\u4F20\u4EFB\u4F55\u6587\u4EF6"),n("i",{class:"el-icon-picture-outline"})],-1));function Q(e,t,i,o,p,R){const S=a("UploadFilled"),L=a("el-icon"),F=a("el-upload"),N=a("el-button"),U=a("el-popconfirm"),u=a("el-image"),k=B("loading");return l(),c("div",J,[e.read?v("",!0):C((l(),g(F,{key:0,"element-loading-text":e.progress+"%",class:"avatar-uploader",action:"#",limit:e.limit,"show-file-list":!1,"before-upload":e.beforeAvatarUpload,"http-request":e.handleUploadLearnSignVoucherFileChange,"attr-icon":"\u6CE8:\u53EA\u80FD\u4E0A\u4F20"+e.type.join()},{default:r(()=>[d(L,{class:"el-upload-icon"},{default:r(()=>[d(S)]),_:1})]),_:1},8,["element-loading-text","limit","before-upload","http-request","attr-icon"])),[[k,e.loading]]),e.read?(l(),c("div",G,[d(u,{fit:"cover"},{default:r(()=>[H]),_:1})])):(l(!0),c($,{key:1},z(e.fileList,(f,h)=>(l(),c("div",{key:h,class:"item"},[e.read?v("",!0):(l(),g(U,{key:0,placement:"top",title:"\u786E\u5B9A\u5220\u9664\uFF1F",onConfirm:m=>e.handleDelete(h)},{reference:r(()=>[d(N,{class:"delete",type:"danger",slot:"reference"},{default:r(()=>[T]),_:1})]),_:2},1032,["onConfirm"])),d(u,{src:f.filePath,fit:"cover","preview-src-list":e.fileList.map(({filePath:m})=>m)},{error:r(()=>[n("div",q,[n("a",{class:"tip-text",href:f.filePath,target:"_blank"},O("\u70B9\u51FB\u4E0B\u8F7D"),8,j),M])]),_:2},1032,["src","preview-src-list"])]))),128))])}var X=w(I,[["render",Q],["__scopeId","data-v-360231d8"]]);export{X as U};