import{I as p,a as h,u as v,J as x,K as w,k,i as o,w as n,L as V,g as m,o as g,n as y}from"./vendor.d8f33275.js";import{_ as C,s as L,a as R}from"./index.80bda23c.js";import{b as f}from"./rules.a17129b4.js";import{u as T}from"./detail.c4cf94b4.js";const B={name:"info",setup(b){const a=p(null),i=h();v();const e=x({username:"",password:""}),_=p({username:f,password:f}),c=()=>{L({url:"/login",method:"post",data:e}).then(({data:l})=>{const{token:d}=l;R(d),V(()=>{i.push("/project/list")})})},{handleDetail:t,submit:s}=T("/user");return w(()=>{s({username:"admin",password:"admin123",name:"admin",type:[],avatar:""}).then(l=>{r(l)})}),{formRef:a,form:e,rules:_,handleLogin:c}}},D={class:"login"},I=y(" \u767B\u5F55 ");function N(b,a,i,e,_,c){const t=m("el-form-item"),s=m("el-input"),l=m("el-button"),d=m("el-form");return g(),k("div",D,[o(d,{model:e.form,ref:"formRef",rules:e.rules,"label-width":"60px"},{default:n(()=>[o(t,{label:"\u6B22\u8FCE\u767B\u5F55"}),o(t,{label:"\u7528\u6237\u540D"},{default:n(()=>[o(s,{modelValue:e.form.username,"onUpdate:modelValue":a[0]||(a[0]=u=>e.form.username=u),placeholder:"\u8BF7\u8F93\u5165",clearable:""},null,8,["modelValue"])]),_:1}),o(t,{label:"\u5BC6\u7801"},{default:n(()=>[o(s,{modelValue:e.form.password,"onUpdate:modelValue":a[1]||(a[1]=u=>e.form.password=u),placeholder:"\u8BF7\u8F93\u5165",clearable:""},null,8,["modelValue"])]),_:1}),o(t,null,{default:n(()=>[o(l,{type:"primary",onClick:e.handleLogin,style:{width:"100%"}},{default:n(()=>[I]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model","rules"])])}var K=C(B,[["render",N],["__scopeId","data-v-435afb38"]]);export{K as default};
