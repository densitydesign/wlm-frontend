(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return c(5141)}])},7709:function(a,b,c){"use strict";c.d(b,{Z:function(){return r}});var d=c(5893),e=c(7294),f=c(1664),g=c.n(f),h=c(1163),i=c(5005),j=c(9459),k=c(453),l=c.n(k),m=c(3854),n=c(6653),o=c(4184),p=c.n(o),q=(0,e.forwardRef)(function(a,b){var c=a.children,e=a.onClick;return(0,d.jsxs)(i.Z,{href:"",ref:b,onClick:function(a){a.preventDefault(),e(a)},size:"sm",variant:"lightBlue",className:p()(l().btnWlm,"w-100","d-flex","justify-content-between","align-items-center"),children:[(0,d.jsx)("span",{children:c}),(0,d.jsx)(m.r0I,{className:p()("ms-1")})]})});q.displayName="HairyMenu";var r=function(){(0,h.useRouter)().basePath;var a=(0,h.useRouter)(),b=function(b,c){b.preventDefault(),a.push(c),a.reload()};return(0,d.jsxs)(j.Z,{className:p()("mb-2"),autoClose:!0,children:[(0,d.jsxs)(j.Z.Toggle,{as:q,id:"dropdown-autoclose-false",children:["Wiki",(0,d.jsx)(n.OBE,{}),"Monuments"]}),(0,d.jsxs)(j.Z.Menu,{className:p()("w-100"),children:[(0,d.jsx)(j.Z.Item,{href:"/",onClick:function(a){return b(a,"/")},children:"Map"}),(0,d.jsx)(g(),{href:"/list",passHref:!0,children:(0,d.jsx)(j.Z.Item,{children:"List"})}),(0,d.jsx)(g(),{href:"/about",passHref:!0,children:(0,d.jsx)(j.Z.Item,{children:"About"})}),(0,d.jsx)(j.Z.Item,{href:"https://www.wikimedia.it/wiki-loves-monuments/",children:"WikiLovesMonuments"}),(0,d.jsx)(j.Z.Header,{children:"Contests"}),(0,d.jsx)(j.Z.Item,{href:"/#selectedRegion=Umbria&dateFrom=2022-09-01&dateTo=2022-09-30",onClick:function(a){return b(a,"/#selectedRegion=Umbria&dateFrom=2022-09-01&dateTo=2022-09-30")},children:"2022: Castelli e fortificazioni"}),(0,d.jsx)(j.Z.Item,{href:"/#selectedRegion=Umbria&dateFrom=2021-09-01&dateTo=2021-09-30",onClick:function(a){return b(a,"/#selectedRegion=Umbria&dateFrom=2021-09-01&dateTo=2021-09-30")},children:"Concorso 2021"}),(0,d.jsx)(j.Z.Item,{href:"/#selectedRegion=Umbria&dateFrom=2020-09-01&dateTo=2020-09-30",onClick:function(a){return b(a,"/#selectedRegion=Umbria&dateFrom=2020-09-01&dateTo=2020-09-30")},children:"Concorso 2020"})]})]})}},947:function(a,b,c){"use strict";c.d(b,{Z:function(){return p}});var d=c(4924),e=c(5893),f=c(1664),g=c.n(f),h=c(1163),i=c(2711),j=c(5498),k=c(4184),l=c.n(k),m=c(2371),n=c.n(m),o=JSON.parse('[{"label":"Home","url":"/","menues":["main","footer"]},{"label":"Page","url":"/page","menues":["main","footer"]}]');function p(){var a=(0,h.useRouter)();return(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)(i.Z,{className:l()(n().navbar,"px-3"),sticky:"top",expand:"lg",children:[(0,e.jsx)(g(),{href:"/",children:(0,e.jsx)("a",{className:l()(n().logo,"no-hover"),children:"Project Title"})}),(0,e.jsx)(i.Z.Toggle,{"aria-controls":"abilitiamo-main-navbar"}),(0,e.jsx)(i.Z.Collapse,{children:(0,e.jsx)(j.Z,{className:l()("ms-auto","align-items-left"),children:o.filter(function(a){return a.menues.indexOf("main")> -1}).map(function(b){return(0,e.jsx)(g(),{href:b.url,children:(0,e.jsx)("a",{className:l()("nav-link","no-hover",n().item,(0,d.Z)({},"".concat(n().active),a.pathname==b.url),(0,d.Z)({},"".concat(n().specificPage),"/dona-ora"===b.url)),children:b.label})},b.label)})})})]})})}},5141:function(a,b,c){"use strict";c.r(b),c.d(b,{default:function(){return aX}});var d=c(5893),e=c(9008),f=c.n(e);c(947);var g=c(828),h=c(8804),i=c.n(h),j=c(7294),k=c(1163),l=c(2992),m=c(682),n=c(1608),o=c(1555),p=c(4184),q=c.n(p),r=c(9459),s=c(5005),t=c(3750),u=c(1174),v=c.n(u);function w(a){var b=a.label,c=a.items,e=a.value,f=a.setValue,g=a.defaultLabel,h=a.disabled;return(0,d.jsxs)("div",{className:q()("d-flex","justify-content-start","align-items-center","mb-2"),children:[b&&(0,d.jsx)("span",{children:b}),(0,d.jsxs)(r.Z,{className:q()({"ms-1":b}),children:[(0,d.jsxs)(r.Z.Toggle,{className:q()(v().btnWlm),id:"dropdown-basic",size:"sm",variant:"lightBlue",disabled:h,children:[e&&e.label,!e&&g]}),(0,d.jsx)(r.Z.Menu,{style:{maxHeight:"50vh",overflowY:"auto"},children:c.map(function(a,b){return(0,d.jsx)(r.Z.Item,{eventKey:b,onClick:function(){f(a)},children:a.label},b)})})]}),e&&(0,d.jsx)(s.Z,{className:q()("ms-1",v().btnWlm),size:"sm",variant:"lightBlue",onClick:function(){f(void 0)},disabled:h,children:(0,d.jsx)(t.C7Q,{})})]})}w.defaultProps={transferSelection:function(a){return console.warn("No function specified for rtansferring the selection to parent. Value:",a)},defaultLabel:"Select an item",items:[{label:"action 1"},{label:"action 2"},{label:"action 3"},{label:"action 4"}]};var x=c(2914);function y(a){var b=a.label,c=a.value,e=a.transferSelection,f=a.min,g=a.max;return(0,d.jsxs)(x.Z.Group,{controlId:"date",className:q()("d-flex","justify-content-start","align-items-center","mb-2"),children:[b&&(0,d.jsx)(x.Z.Label,{children:b}),(0,d.jsx)(x.Z.Control,{className:q()({"ms-1":b}),type:"date",name:"date",min:f,max:g,placeholder:"Pick a date",value:c,size:"sm",variant:"lightBlue",onChange:function(a){return e(a.target.value)}})]})}function z(a){var b=a.label,c=a.onClickAction,e=a.content,f=a.disabled;return(0,d.jsxs)("div",{className:q()("d-flex","justify-content-start","align-items-center","mb-2"),children:[b&&(0,d.jsx)("span",{children:b}),(0,d.jsx)(s.Z,{className:q()(v().btnWlm,{"ms-1":b}),size:"sm",variant:"lightBlue",onClick:function(a){return c(a)},disabled:f,children:e})]})}y.defaultProps={value:"2012-01-01",transferSelection:function(a){return console.warn("No function specified for transferring the selection to parent. Value:",a)}},z.defaultProps={initialDate:"2012-01-01",onClickAction:function(a){return console.warn("No function specified for onClickAction. Value:",a)}};var A=c(2086);function B(a){var b=a.label,c=a.items,e=a.disabled;return(0,d.jsxs)("div",{className:q()("d-flex","justify-content-start","align-items-center","mb-2"),children:[b&&(0,d.jsx)("span",{children:b}),(0,d.jsx)(A.Z,{className:q()({"ms-1":b}),"aria-label":"Basic example",children:c.map(function(a,b){return(0,d.jsx)(s.Z,{size:"sm",variant:"lightBlue",onClick:function(b){return a.onClickAction(b)},disabled:e,children:a.content},b)})})]})}B.defaultProps={items:[{content:"btn",onClickAction:function(a){return console.warn("No function specified for onClickAction. Value:",a)}},{content:"btn",onClickAction:function(a){return console.warn("No function specified for onClickAction. Value:",a)}},{content:"btn",onClickAction:function(a){return console.warn("No function specified for onClickAction. Value:",a)}},]};var C=c(7709),D=c(9815),E=c(2846),F=c.n(E),G=c(6042),H=c(9396),I={blueJeans:"#0978AB",lightBlue:"#DDF7FF",terrain:"#ECE5E0",white:"#ffffff",onWIki:"#C3C5C3",inContest:"#F8FF0E",photographed:"#22B8B4",interactive:"#FF004D"},J=150,K=function(a,b){R=J/a.history.length,b.selectAll(".collisionArea").data(function(a){return[a]},function(a){return a.code}).join("circle").attr("class","collisionArea").attr("r",function(a){return a.maxRaius||a.history.slice(-1)[0].groups.slice(-1)[0].outerRadius}).lower(),b.selectAll(".tickBg").data(function(a){return O(a).slice(0,1)},function(a){return a.code}).join("path").attr("d",function(a){var b;return M(0,0,a.outerRadius,-J/2,J/2)}).attr("stroke","none").attr("fill","url(#tick-background)").classed("tickBg",!0).lower(),b.selectAll(".bubble").data(function(a){return[a]},function(a){return a.code}).join("circle").attr("class","bubble").attr("fill",function(a){return I[a.history.slice(-1)[0].groups.reduce(function(a,b){return a.valueDelta>b.valueDelta?a:b}).label]}).attr("stroke","#fff").attr("r",4).attr("display","none"),b.selectAll(".snapshot").data(function(a){return a.history},function(a){return a.date}).join("g").attr("class","snapshot").attr("transform",function(a,b){return"rotate(".concat(-J/2+R*b,")")}).selectAll(".status").data(function(a){return a.groups},function(a){return a.label}).join(function(a){return a.append("path").attr("class","status").attr("fill",function(a){return I[a.label]}).attr("d",function(a){return N(a)})},function(a){return a.attr("fill",function(a){return I[a.label]}).attr("d",function(a){return N(a)})},function(a){return a.remove()}),b.selectAll(".label").data(function(a){return[a]},function(a){return a.code}).join("text").attr("text-anchor","middle").attr("font-size",10).attr("class","label").attr("y",12).text(function(a){return a.label||"Unknown Region"}).raise();var c=b.select(".ticks");c.empty()&&(c=b.append("g").classed("ticks",!0)),c.raise();var d=c.selectAll(".tick").data(function(a){return O(a)},function(a){return a.label+a.value}).join("g").attr("data-tick",function(a,b){return a.label+a.value}).classed("tick",!0);d.selectAll(".axis").data(function(a){return[a]},function(a){return a}).join("path").classed("axis",!0).attr("d",function(a){var b;return M(0,0,a.outerRadius,-J/2,J/2)}).attr("stroke","rgba(255,255,255,0.75)").attr("stroke-width",.5).attr("fill","none"),d.selectAll(".axisLabel").data(function(a){return[a]},function(a){return a}).join("text").classed("axisLabel",!0).attr("fill","#aaa").attr("font-size",7).attr("font-weight","bold").attr("x",function(a){var b=a.outerRadius,c=J/2;return c=a.index%2==0?c:-c,L(0,0,b,c).x}).attr("y",function(a){var b;return L(0,0,a.outerRadius,J/2).y+7}).attr("text-anchor",function(a){return a.index%2==0?"start":"end"}).text(function(a){return a.value})};function L(a,b,c,d){var e=(d-90)*Math.PI/180;return{x:a+c*Math.cos(e),y:b+c*Math.sin(e)}}function M(a,b,c,d,e){var f=L(a,b,c,e),g=L(a,b,c,d);return["M",f.x,f.y,"A",c,c,0,e-d<=180?"0":"1",0,g.x,g.y].join(" ")}function N(a){var b;if(0===a.innerRadius){var c=a.outerRadius,d=0,e=R-1,f=L(0,0,a.outerRadius,e),g=L(0,0,a.outerRadius,d),h=e-d<=180?"0":"1";b=["M",0,0,"L",f.x,f.y,"A",c,c,0,h,0,g.x,g.y,"Z"].join(" ")}else{var i=a.outerRadius,j=0,k=R-1,l=L(0,0,i,k),m=L(0,0,i,j),n=k-j<=180?"0":"1",o=a.innerRadius,p=0,q=R-1,r=L(0,0,o,q),s=L(0,0,o,p),t=q-p<=180?"0":"1";b=["M",r.x,r.y,"L",l.x,l.y,"A",i,i,0,n,0,m.x,m.y,"L",s.x,s.y,"A",o,o,0,t,1,r.x,r.y,"Z",].join(" ")}return b}function O(a){for(var b=function(a){var b=e[a];if(0===b.value)return"continue";var f=b.outerRadius,g=(0,H.Z)((0,G.Z)({},b),{index:a}),h=7;d.find(function(a){return a>=f-h&&a<=f+h})||(d.push(f),c.push(g))},c=[],d=[],e=a.history.slice(-1)[0].groups,f=e.length-1;f>=0;f--)b(f);return c}var P={onWIki:{explained:"Monuments on Wikidata"},inContest:{explained:"Monuments in contest"},photographed:{explained:"Photographed for the first time"}};function Q(a){var b=a.group,c=a.max,e=a.filterData,f=a.setFilterData,g=e.find(function(a){return b.label===a.label}).active,h=(0,j.useState)(g),i=h[0],k=h[1],l=(0,j.useState)(!1),m=l[0],n=l[1],o=(0,j.useMemo)(function(){return b.value[1]-b.value[0]},[b]),p=(0,j.useMemo)(function(){return o/c*100},[o,c]);return(0,j.useEffect)(function(){var a=(0,D.Z)(e);a.find(function(a){return b.label===a.label}).active=i,f(a)},[i]),(0,j.useEffect)(function(){k(e.find(function(a){return b.label===a.label}).active),n(e.filter(function(a){return a.active}).length<2&& !0===i)},[e]),(0,d.jsxs)("div",{className:q()(F().group),children:[(0,d.jsx)("input",{name:b.label,type:"checkbox",checked:i,onChange:function(){return k(!i)},disabled:m}),(0,d.jsxs)("span",{className:q()(F().bar),children:[(0,d.jsx)("div",{style:{backgroundColor:I[b.label],width:"".concat(p,"%")}}),(0,d.jsxs)("span",{className:q()(F().amount),children:[o>=0?"+":"",o]})]}),(0,d.jsx)("span",{className:q()(F().explained),children:P[b.label].explained})]})}var R,S,T,U,V,W,X,Y=function(a){var b=a.data,c=a.filterData,e=a.setFilterData,f=(0,j.useState)(),g=f[0],h=f[1];return(0,j.useEffect)(function(){h((0,l.Fp7)(b.extent.map(function(a){return a.value[1]-a.value[0]})))},[b]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("h6",{children:"What's new"}),(0,d.jsx)("div",{className:"mb-3",children:b.extent.map(function(a,b){return(0,d.jsx)(Q,{group:a,max:g,filterData:c,setFilterData:e},b)})})]})},Z=c(7211),$=c.n(Z),_={left:20,right:1,top:30,bottom:20},aa=l.Xf(),ab=l.BYU(),ac=function(a){(X=(S=l.Ys(a)).select(".quantityAxisGroup")).empty()&&(X=S.append("g").classed("quantityAxisGroup",!0)),(V=S.selectAll(".areaChart")).empty()&&(V=S.append("g").classed("areaChart",!0)),(W=S.select(".timeAxisGroup")).empty()&&(W=S.append("g").classed("timeAxisGroup",!0))},ad=function(a,b){var c=S.node().getBoundingClientRect();T=c.width,U=c.height;var d=[],e=new Set,f=[],h=[],i=b.filter(function(a){return a.active}).map(function(a){return a.label});a.data.forEach(function(a){a.history.forEach(function(a){var b=(0,g.Z)(a.date.split("-"),3),c=b[0],j=b[1],k=b[2],l=new Date(c,j-1,k);f.push(l);var m={date:l},n=a.groups.filter(function(a){return -1!==i.indexOf(a.label)});n.forEach(function(a,b){var c=a.value;b>0&&(c-=n[b-1].value),h.push(a.value),e.add(a.label),m[a.label]=c}),d.push(m)})});var j,k=l.knu().keys(Array.from(e)).order(l.Qxt).offset(l.HLf)(d),m=l.Wem(f);aa.domain(m).range([_.left,T-_.right]);var n=l.LLu(aa);W.attr("transform","translate(0, ".concat(U-_.bottom,")")).call(n).call(function(a){a.select(".domain").remove()});var o=l.Wem(h);ab.domain([0,o[1]]).range([U-_.bottom,_.top]),ab.ticks(5);var p=ab.tickFormat(5,"~s"),q=l.Khx(ab.copy()).tickFormat(p),r=[];X.attr("transform","translate(".concat(0,",0)")).call(q).call(function(a){a.select(".domain").attr("display","none"),a.selectAll(".tick > text").attr("x",0).each(function(a){r.push(this.getComputedTextLength())}),a.selectAll(".tick > line").attr("stroke-dasharray","1, 4").attr("x1",Math.ceil(l.Fp7(r))+4).attr("x2",T),a.selectAll(".tick").filter(function(a){return 0===a}).attr("display","none")});var s=l.SOn().x(function(a){return aa(a.data.date)}).y0(function(a){return ab(a[0])}).y1(function(a){return ab(a[1])}).curve(l.jsv);V.selectAll(".area").data(k).join("path").attr("class","area").attr("fill",function(a){return I[a.key]}).attr("d",s)},ae=function(a){var b=a.data,c=a.filterData,e=(0,j.useRef)();return(0,j.useEffect)(function(){ac(e.current)},[]),(0,j.useEffect)(function(){ad(b,c)},[b,c]),(0,d.jsx)("div",{className:q()($().areaChart,"d-flex","justify-content-center","align-items-center"),children:(0,d.jsx)("svg",{ref:e})})};function af(a){var b=a.regions,c=a.selectedRegion,e=a.setSelectedRegion,f=a.provinces,g=a.selectedProvince,h=a.setSelectedProvince,i=a.municipalities,j=a.selectedMunicipality,k=a.setSelectedMunicipality,l=a.typologiesList,m=a.typology,n=a.setTypology,o=a.minDate,p=a.dateFrom,r=a.setDateFrom,s=a.maxDate,u=a.dateTo,x=a.setDateTo,A=a.parentData,D=a.filterData,E=a.setFilterData;return(0,d.jsxs)("div",{className:q()(v().toolBar,"d-flex","flex-column"),children:[(0,d.jsx)(C.Z,{}),(0,d.jsx)("h6",{children:"Monuments"}),(0,d.jsx)(w,{label:"Region",items:b.items,value:c,setValue:e,defaultLabel:"Select a region",disabled:b.disabled||g}),(0,d.jsx)(w,{label:"Province",items:f.items,value:g,setValue:h,defaultLabel:"Select a province",disabled:f.disabled||j}),(0,d.jsx)(w,{label:"Municipality",items:i.items,value:j,setValue:k,defaultLabel:"Select a municipality",disabled:i.disabled}),(0,d.jsx)(w,{label:"Type",items:l,value:m,setValue:n,disabled:!l}),(0,d.jsx)(y,{label:"From",min:o,max:u,value:p,transferSelection:r}),(0,d.jsx)(y,{label:"To",min:p,max:s,value:u,transferSelection:x}),A&&D&&(0,d.jsx)(Y,{data:A,filterData:D,setFilterData:E}),(0,d.jsx)("h6",{children:"Timeline"}),(0,d.jsxs)("div",{className:q()("d-flex","justify-content-between"),children:[(0,d.jsx)(B,{label:"Play",items:[{content:(0,d.jsx)(t.mz0,{}),onClickAction:function(a){return console.log(a)}},{content:"0.5X",onClickAction:function(a){return console.log(a)}},{content:"1X",onClickAction:function(a){return console.log(a)}},{content:"2X",onClickAction:function(a){return console.log(a)}},{content:(0,d.jsx)(t.cAs,{}),onClickAction:function(a){return console.log(a)}},],disabled:!0}),(0,d.jsx)(z,{label:"Save",content:(0,d.jsx)(t.QNI,{}),disabled:!0})]}),A&&D&&(0,d.jsx)(ae,{data:A,filterData:D})]})}var ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as,at,au,av,aw,ax=c(8576),ay=c.n(ax);l.A4v().force("x",l.RUJ(function(a){return a.x})).force("y",l.Mrm(function(a){return a.y})).on("tick",aH).stop();var az,aA,aB=1,aC=void 0,aD=l.vY$(),aE=function(a,b){var c=b.lvl4,d=(ag=l.Ys(a)).node().getBoundingClientRect();ah=d.width,ai=d.height,aj=ag.select(".bgRect"),aj.empty()&&(aj=ag.append("rect").classed("bgRect",!0)),aj.attr("fill",I.lightBlue).attr("width","100%").attr("height","100%").attr("pointer-events","none"),an=ag.select(".main-g"),an.empty()&&(an=ag.append("g").classed("main-g",!0)),ao=an.select(".g_geographies"),ao.empty()&&(ao=an.append("g").classed("g_geographies",!0)),ap=ao.select(".regions"),ap.empty()&&(ap=ao.append("g").classed("regions",!0)),ar=ao.select(".provinces"),ar.empty()&&(ar=ao.append("g").classed("provinces",!0)),at=ao.select(".municipalities"),at.empty()&&(at=ao.append("g").classed("municipalities",!0)),av=an.select(".g_ventagli"),av.empty()&&(av=an.append("g").classed("g_ventagli",!0)),aw=av.selectAll(".ventaglio"),ak=l.mw4().fitSize([ah,ai],{type:"FeatureCollection",features:c}),al=l.l49(ak),am=l.sPX().scaleExtent([1,1024]).extent([[0,0],[ah,ai],]).on("zoom",function(a){return aG(a.transform)}).on("end",function(){aw.call(aJ)}),ag.call(am),aF(b)},aF=function(a){var b,c=function(a){if(a){var b=(0,g.Z)(al.bounds(a),2),c=(0,g.Z)(b[0],2),d=c[0],e=c[1],f=(0,g.Z)(b[1],2),h=f[0],i=f[1],j=("municipality"===aC?.25:1)/Math.max((h-d)/ah,(i-e)/ai);ag.call(am.transform,l.CRH.translate(ah/2,ai/2).scale(j).translate(-(d+h)/2,-(e+i)/2))}else console.log("zoom to italy"),ag.call(am.transform,l.CRH)},d=a.data,e=a.extent,f=a.lvl4,h=a.lvl6,i=a.lvl8,j=a.selectedRegion,k=a.selectedProvince,m=a.selectedMunicipality,n=a.setSelectedRegion,o=a.setSelectedProvince,p=a.setSelectedMunicipality;aD.exponent(.5).domain([0,l.Fp7(e.map(function(a){return a.value[1]}))]).range([0,70]),aq=ap.selectAll(".region").data(f,function(a){return a.properties.code}).join("path").attr("class","region").attr("fill",I.terrain).attr("stroke",I.white).attr("stroke-width","var(--stroke-width)").attr("stroke-linecap","round").attr("stroke-linejoin","round").attr("d",function(a){return al(a)}).on("click",function(a,b){a.stopPropagation();var c=b.properties,d=c.code,e=c.label;p(void 0),o(void 0),n({code:d,label:e})}),as=ar.selectAll(".province").data(h,function(a){return a.properties.code}).join("path").attr("class","province").attr("fill",I.terrain).attr("stroke",I.white).attr("stroke-width","var(--stroke-width)").attr("stroke-linecap","round").attr("stroke-linejoin","round").attr("d",function(a){return al(a)}).on("click",function(a,b){a.stopPropagation();var c=b.properties,d=c.code,e=c.label;p(void 0),o({code:d,label:e})}),au=at.selectAll(".municipality").data(i,function(a){return a.properties.code}).join("path").attr("class","municipality").attr("fill",I.terrain).attr("stroke",I.white).attr("stroke-width","var(--stroke-width)").attr("stroke-linecap","round").attr("stroke-linejoin","round").attr("d",function(a){return al(a)}).on("click",function(a,b){if(a.stopPropagation(),m)p(void 0);else{var c=b.properties,d=c.code,e=c.label,f={code:d,label:e};p(f)}}),m?(b=i,aC="municipality",aq.attr("opacity",.5),as.attr("opacity",.5),au.attr("display","none").filter(function(a){return a.properties.code===m.code}).attr("display","block").each(c)):k?(b=i,aC="province",aq.attr("opacity",.5),as.attr("opacity",.5).filter(function(a){return a.properties.code===k.code}).attr("opacity",1).each(c),au.attr("display","block")):j?(b=h,aC="region",aq.attr("opacity",.5).filter(function(a){return a.properties.code===j.code}).attr("opacity",1).each(c),au.attr("display","block")):(b=f,aC=void 0),d=aI(d,b),aw=av.selectAll(".ventaglio").data(d,function(a){return a.code}).join("g").attr("class","ventaglio").classed("overlapping",!1).on("click",function(a,b){if("municipality"===aC)console.log("Clicked.",b),p(void 0);else if("province"===aC){var c=b.code,d=b.label,e={code:c,label:d};p(e)}else if("region"===aC){var f=b.code,g=b.label,h={code:f,label:g};o(h)}else{var i=b.code,j=b.label,k={code:i,label:j};n(k)}}).each(function(a){K(a,l.Ys(this))}),aH()};function aG(a){an.attr("transform",a);var b=a.x,c=a.y,d=a.k;az=b,aA=c,aB=d,document.documentElement.style.setProperty("--stroke-width",1/d),aw.attr("transform",function(a){return"translate(".concat(a.x,", ").concat(a.y,") scale(").concat(1/(d>=35?35:d),")")})}function aH(){aw.attr("transform",function(a){return"translate(".concat(a.x,", ").concat(a.y,") scale(").concat(1/(aB>=35?35:aB),")")})}function aI(a,b){return a.forEach(function(a){var c=b.find(function(b){return b.properties.code===a.code});if(c){var d=ak(c.properties.centroid.coordinates);a.x=d[0],a.y=d[1]}else{var e=ak([12.4,39.3]);a.x=e[0],a.y=e[1]}a.maxRadius=aD(a.maxValue),a.history.forEach(function(a){var b=a.groups;a.groups.forEach(function(c,d){c.innerRadius=0===d?0:a.groups[d-1].outerRadius,c.outerRadius=aD(c.value),c.valueDelta=0==d?c.value:c.value-b[d-1].value})})}),a}function aJ(a){aC&&"region"!==aC&&(a.classed("overlapping",!1),a.selectAll(".bubble").attr("display","none"),a.selectAll("*:not(.bubble)").attr("display","block"),a.each(function(b){var c=this;a.each(function(a){if(a!==b){var d=aK([b.x,b.y],[a.x,a.y]),e=b.history.slice(-1)[0].groups.slice(-1)[0].outerRadius,f=a.history.slice(-1)[0].groups.slice(-1)[0].outerRadius,g=(e+f)/aB*.7;if(d<g){var h,i=l.Ys(c),j=l.Ys(this);if(i.classed("overlapping")||j.classed("overlapping"))return;(h=b.maxValue<a.maxValue?l.Ys(c):l.Ys(this)).classed("overlapping",!0),h.selectAll(".bubble").attr("display","block"),h.selectAll("*:not(.bubble)").attr("display","none")}}})}))}function aK(a,b){var c=(0,g.Z)(a,2),d=c[0],e=c[1],f=(0,g.Z)(b,2),h=f[0],i=f[1],j=h-d,k=i-e;return Math.sqrt(j*j+k*k)}function aL(a){var b=a.ventagli,c=a.lvl4,e=a.lvl6,f=a.lvl8,g=a.selectedRegion,h=a.selectedProvince,i=a.selectedMunicipality,k=a.setSelectedRegion,l=a.setSelectedProvince,m=a.setSelectedMunicipality,n=a.typology,o=a.dateFrom,p=a.dateTo;a.isFetching;var r=(0,j.useRef)(),s=b.data,t=b.extent;return(0,j.useEffect)(function(){aE(r.current,{data:s,extent:t,lvl4:c,lvl6:e,lvl8:f,selectedRegion:g,selectedProvince:h,selectedMunicipality:i,setSelectedRegion:k,setSelectedProvince:l,setSelectedMunicipality:m,typology:n,dateFrom:o,dateTo:p})},[]),(0,j.useEffect)(function(){aF({data:s,extent:t,lvl4:c,lvl6:e,lvl8:f,selectedRegion:g,selectedProvince:h,selectedMunicipality:i,setSelectedRegion:k,setSelectedProvince:l,setSelectedMunicipality:m,typology:n,dateFrom:o,dateTo:p})},[b,g,h,i]),(0,d.jsx)("div",{className:q()(ay().map,"position-relative"),children:(0,d.jsx)("svg",{ref:r,children:(0,d.jsxs)("linearGradient",{id:"tick-background",x1:"50%",y1:"0%",x2:"50%",y2:"100%",children:[(0,d.jsx)("stop",{offset:"0%",stopColor:"rgb(255,255,255)",stopOpacity:"0.75"}),(0,d.jsx)("stop",{offset:"100%",stopColor:"rgb(255,255,255)",stopOpacity:"0"})]})})})}var aM=c(7820),aN=c.n(aM),aO=c(6968);function aP(){return(0,d.jsxs)("div",{className:q()(aN().fetching,"position-absolute","top-50","start-50","translate-middle","d-flex","flex-column","justify-content-center","align-items-center"),children:[(0,d.jsx)(aO.Z,{variant:"blue-jeans",animation:"border",role:"status",size:"sm",children:(0,d.jsx)("span",{className:"visually-hidden",children:"Loading..."})}),(0,d.jsx)("p",{className:q()("position-relative"),style:{color:"var(--bs-blue-jeans)"},children:"Fetching Data"})]})}var aQ=c(8565),aR=aQ.DateTime,aS=aQ.Interval,aT="https://wlm.inmagik.com",aU="force-cache",aV=function(a,b,c,d){var e=a.selectedRegion,f=a.selectedProvince,h=a.selectedMunicipality,i=a.typology,j=a.dateFrom,k=a.dateTo;d(!0);var m=aT,n=aT;if(h?(m+="/api/municipality/".concat(h.code,"/wlm/"),n+="/api/municipality/".concat(h.code,"/wlm/")):f?(m+="/api/province/".concat(f.code,"/wlm-areas/"),n+="/api/province/".concat(f.code,"/wlm/")):e?(m+="/api/region/".concat(e.code,"/wlm-areas/"),n+="/api/region/".concat(e.code,"/wlm/")):(console.log("All Italian regions"),m+="/api/region/wlm-regions/",n+="/api/region/wlm-aggregate"),m){var o,p,q=aR.fromISO(j),r=aR.fromISO(k),s=aS.fromDateTimes(q,r),t=15;31>=Math.ceil(s.length("days")/1)?(p="days",o=1):Math.ceil(s.length("days")/5)<=t?(p="days",o=5):Math.ceil(s.length("days")/10)<=t?(p="days",o=10):Math.ceil(s.length("months")/1)<=t?(p="months",o=1):Math.ceil(s.length("months")/3)<=t?(p="months",o=3):Math.ceil(s.length("months")/4)<=t?(p="months",o=4):Math.ceil(s.length("months")/6)<=t?(p="months",o=6):(p="years",o=1);var u={step_size:o,step_unit:p};u.date_from=j,u.date_to=k,i&&(u.theme=i.id),u.format="json";var v=new URLSearchParams(u).toString();m+="?"+v,n+="?"+v,Promise.all([(0,l.AVB)(m,{cache:aU}),(0,l.AVB)(n,{cache:aU}),]).then(function(a){var e=(0,g.Z)(a,2),f=e[0],h=e[1];b(f),c(h),d(!1)})}},aW=function(){var a=(0,k.useRouter)().asPath,b=(0,j.useState)(!0),c=b[0],e=b[1],f=(0,j.useState)(!1),h=f[0],p=f[1],r=(0,j.useState)(),s=r[0],t=r[1],u=(0,j.useState)(),v=u[0],w=u[1],x=(0,j.useState)(),y=x[0],z=x[1],A=(0,j.useState)([]),B=A[0],C=A[1],D=(0,j.useState)([]),E=D[0],F=D[1],G=(0,j.useState)([]),H=G[0],I=G[1],J=(0,j.useState)([]),K=J[0],L=J[1],M=(0,j.useState)([]),N=M[0],O=M[1],P=(0,j.useState)([]),Q=P[0],R=P[1],S=(0,j.useState)([]),T=S[0],U=S[1],V=(0,j.useState)(),W=V[0],X=V[1],Y=(0,j.useState)(),Z=Y[0],$=Y[1],_=(0,j.useState)(),aa=_[0],ab=_[1],ac=(0,j.useState)(),ad=ac[0],ae=ac[1],ag=(0,j.useState)("2012-01-01"),ah=ag[0];ag[1];var ai=(0,j.useState)(),aj=ai[0],ak=ai[1],al=(0,j.useState)(),am=al[0],an=al[1],ao=(0,j.useState)(),ap=ao[0],aq=ao[1];(0,j.useEffect)(function(){Promise.all([l.AVB(aT+"/api/region/geo/?format=json",{cache:aU}),l.AVB(aT+"/api/domain/?format=json",{cache:aU}),]).then(function(b){var c=(0,g.Z)(b,2),d=c[0],f=c[1];an(f.last_snapshot);var h=f.themes;U(h),C(d.features);var i=d.features.map(function(a){return{label:a.properties.name,code:a.properties.code}});L(i);var j=a.split("#")[1],k={};j&&(k=Object.fromEntries(j.split("&").map(function(a){return a.split("=").map(function(a){return decodeURIComponent(a)})})));var m=k.typology,n=k.dateFrom,o=k.dateTo,p=k.selectedRegion,q=k.selectedProvince,r=k.selectedMunicipality,s=k.filterDataParams;if(m&&ae(h.find(function(a){return a.id==m})),n?ak(n):ak(dateMin),o?aq(o):aq(f.last_snapshot),s&&z(s.split(";").map(function(a){return a.split(":")}).map(function(a){return{label:a[0],active:"true"===a[1]}})),p){var t=i.find(function(a){return a.label===p});X(t),l.AVB(aT+"/api/region/".concat(t.code,"/areas/?format=json"),{cache:aU}).then(function(a){F(a.features);var b=a.features.map(function(a){return{label:a.properties.name,code:a.properties.code}});if(O(b),q){var c=b.find(function(a){return a.label===q});$(c),l.AVB(aT+"/api/province/".concat(c.code,"/areas/?format=json"),{cache:aU}).then(function(a){I(a.features);var b=a.features.map(function(a){return{label:a.properties.name,code:a.properties.code}});R(b),r&&ab(b.find(function(a){return a.label===r})),e(!1)})}else e(!1)})}else e(!1)})},[]),(0,j.useEffect)(function(){W&&!c?l.AVB(aT+"/api/region/".concat(W.code,"/areas/?format=json")).then(function(a){F(a.features),O(a.features.map(function(a){return{label:a.properties.name,code:a.properties.code}}))}):(F([]),O([]))},[W]),(0,j.useEffect)(function(){Z&&!c?l.AVB(aT+"/api/province/".concat(Z.code,"/areas/?format=json")).then(function(a){I(a.features),R(a.features.map(function(a){return{label:a.properties.name,code:a.properties.code}}))}):(I([]),R([]))},[Z]),(0,j.useEffect)(function(){if(v){var a=v.extent.reverse().map(function(a){var b=!0;return y&&(b=y.find(function(b){return b.label===a.label}).active),{label:a.label,active:b}});z(a)}},[v]),(0,j.useEffect)(function(){var a={},b={};W&&(a.selectedRegion=encodeURIComponent(W.label),b.selectedRegion=W),Z&&(a.selectedProvince=encodeURIComponent(Z.label),b.selectedProvince=Z),aa&&(a.selectedMunicipality=encodeURIComponent(aa.label),b.selectedMunicipality=aa),ad&&(a.typology=encodeURIComponent(ad.id),b.typology=ad),aj&&(a.dateFrom=encodeURIComponent(aj),b.dateFrom=aj),ap&&(a.dateTo=encodeURIComponent(ap),b.dateTo=ap);var d=[];for(var e in a)d.push(e+"="+a[e]);var f="#"+d.join("&");location.replace(f),c||aV(b,t,w,p)},[W,Z,aa,ad,aj,ap,c]),(0,j.useEffect)(function(){if(y){var a=Object.fromEntries(location.hash.split("#")[1].split("&").map(function(a){return a.split("=").map(function(a){return decodeURIComponent(a)})}));a.filterDataParams=encodeURIComponent(y.map(function(a){return a.label+":"+a.active.toString()}).join(";"));var b=[];for(var c in a)b.push(c+"="+a[c]);var d="#"+b.join("&");location.replace(d)}},[y]);var ar=(0,j.useMemo)(function(){if(y&&s){var a=JSON.parse(JSON.stringify(s));return y.filter(function(a){return!a.active}).forEach(function(b){a.data.forEach(function(a){a.history.forEach(function(a){var c=a.groups,d=c.find(function(a){return a.label===b.label}),e=c.indexOf(d);e> -1&&c.splice(e,1)})});var c=a.extent.find(function(a){return a.label===b.label}),d=a.extent.indexOf(c);d> -1&&a.extent.splice(d,1)}),a}},[y,s]);return(0,d.jsx)(m.Z,{className:q()(i().vizController),fluid:!0,children:(0,d.jsxs)(n.Z,{className:q()("h-100"),children:[(0,d.jsx)(o.Z,{className:q()("h-100","pe-0"),md:3,xl:3,children:(0,d.jsx)(af,{regions:{items:K,disabled:!K.length},selectedRegion:W,setSelectedRegion:X,provinces:{items:N,disabled:!N.length},selectedProvince:Z,setSelectedProvince:$,municipalities:{items:Q,disabled:!Q.length},selectedMunicipality:aa,setSelectedMunicipality:ab,typologiesList:T,typology:ad,setTypology:ae,minDate:ah,dateFrom:aj,setDateFrom:ak,maxDate:am,dateTo:ap,setDateTo:aq,parentData:v,filterData:y,setFilterData:z})}),(0,d.jsx)(o.Z,{className:q()("h-100","position-relative"),children:(0,d.jsxs)(d.Fragment,{children:[!c&&ar&&(0,d.jsx)(aL,{ventagli:ar,lvl4:B,lvl6:E,lvl8:H,selectedRegion:W,setSelectedRegion:X,selectedProvince:Z,setSelectedProvince:$,selectedMunicipality:aa,setSelectedMunicipality:ab,typology:ad,dateFrom:aj,dateTo:ap,isFetching:h}),(c||h)&&(0,d.jsx)(aP,{})]})})]})})};function aX(){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(f(),{children:(0,d.jsx)("title",{children:"Home"})}),(0,d.jsx)(aW,{})]})}},7211:function(a){a.exports={areaChart:"AreaChart_areaChart__qAbnb"}},7820:function(a){a.exports={fetching:"Fetching_fetching__EY3MZ",bgAnimation:"Fetching_bgAnimation__x3WK0"}},8576:function(a){a.exports={map:"MapVentagli_map__NmyTz"}},453:function(a){a.exports={btnWlm:"NavMenu_btnWlm___ociY"}},2371:function(a){a.exports={navbar:"Navigation_navbar__clCa1",logo:"Navigation_logo__AbP0d",item:"Navigation_item__j_Te9",specificPage:"Navigation_specificPage__k2gFH"}},1174:function(a){a.exports={toolBar:"UI-Components_toolBar__KROSq",btnWlm:"UI-Components_btnWlm__51KGY"}},8804:function(a){a.exports={vizController:"VisualizationController_vizController__KxPt2"}},2846:function(a){a.exports={group:"WhatsNew_group__mJ_bs",bar:"WhatsNew_bar__Y8vj9",amount:"WhatsNew_amount__QWQbL",explained:"WhatsNew_explained__LsAxI"}}},function(a){a.O(0,[556,13,225,549,381,333,186,774,888,179],function(){var b;return a(a.s=5557)}),_N_E=a.O()}])