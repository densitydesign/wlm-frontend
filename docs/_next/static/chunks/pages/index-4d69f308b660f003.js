(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return c(2202)}])},947:function(a,b,c){"use strict";c.d(b,{Z:function(){return p}});var d=c(4924),e=c(5893),f=c(1664),g=c.n(f),h=c(1163),i=c(2711),j=c(5498),k=c(4184),l=c.n(k),m=c(2371),n=c.n(m),o=JSON.parse('[{"label":"Home","url":"/","menues":["main","footer"]},{"label":"Page","url":"/page","menues":["main","footer"]}]');function p(){var a=(0,h.useRouter)();return(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)(i.Z,{className:l()(n().navbar,"px-3"),sticky:"top",expand:"lg",children:[(0,e.jsx)(g(),{href:"/",children:(0,e.jsx)("a",{className:l()(n().logo,"no-hover"),children:"Project Title"})}),(0,e.jsx)(i.Z.Toggle,{"aria-controls":"abilitiamo-main-navbar"}),(0,e.jsx)(i.Z.Collapse,{children:(0,e.jsx)(j.Z,{className:l()("ms-auto","align-items-left"),children:o.filter(function(a){return a.menues.indexOf("main")> -1}).map(function(b){return(0,e.jsx)(g(),{href:b.url,children:(0,e.jsx)("a",{className:l()("nav-link","no-hover",n().item,(0,d.Z)({},"".concat(n().active),a.pathname==b.url),(0,d.Z)({},"".concat(n().specificPage),"/dona-ora"===b.url)),children:b.label})},b.label)})})})]})})}},2202:function(a,b,c){"use strict";c.r(b),c.d(b,{default:function(){return a9}});var d=c(5893),e=c(9008),f=c.n(e);c(947);var g,h,i=c(828),j=c(8804),k=c.n(j),l=c(7294),m=c(1163),n=c(9237),o=c(4184),p=c.n(o),q={},r={},s=175,t=500,u=null,v=n.PUr().range([1,.5*s]),w=n.PKp(["mapped","authorized","photographed"],["#C3C5C3","#F8FF0E","#22B8B4"]),x=150;function y(a){return a.forEach(function(a){a[1].forEach(function(a){var b=a[1].find(function(a){return"photographed"===a.group});b.innerRadius=0,b.outerRadius=v(b.valueIncremental);var c=a[1].find(function(a){return"authorized"===a.group});c.innerRadius=b.outerRadius,c.outerRadius=v(c.valueIncremental);var d=a[1].find(function(a){return"mapped"===a.group});d&&(d.innerRadius=c.outerRadius,d.outerRadius=v(d.valueIncremental))})}),a}function z(a,b,c,d){var e=(d-90)*Math.PI/180;return{x:a+c*Math.cos(e),y:b+c*Math.sin(e)}}function A(a,b,c,d,e){var f=z(a,b,c,e),g=z(a,b,c,d),h=e-d<=180?"0":"1";return["M",f.x,f.y,"A",c,c,0,h,0,g.x,g.y].join(" ")}function B(a){var b,c=0,d=0;if(0===a.innerRadius){var e=a.outerRadius,f=0,g=ay,h=z(c,d,a.outerRadius,g),i=z(c,d,a.outerRadius,f),j=g-f<=180?"0":"1";b=["M",c,d,"L",h.x,h.y,"A",e,e,0,j,0,i.x,i.y,"Z",].join(" ")}else{var k=a.outerRadius,l=0,m=ay,n=z(c,d,k,m),o=z(c,d,k,l),p=m-l<=180?"0":"1",q=a.innerRadius,r=0,s=ay,t=z(c,d,q,s),u=z(c,d,q,r),v=s-r<=180?"0":"1";b=["M",t.x,t.y,"L",n.x,n.y,"A",k,k,0,p,0,o.x,o.y,"L",u.x,u.y,"A",q,q,0,v,1,t.x,t.y,"Z",].join(" ")}return b}function C(a,b){var c=arguments.length>2&& void 0!==arguments[2]&&arguments[2];if(c){var d=.1*g+Math.random()*g*.8,e=.1*h+Math.random()*h*.8;return"translate(".concat(d,", ").concat(e,")")}var f=b%r.columns*s+s/2+q.left,i=Math.floor(b/r.columns)*s+s/2+q.top;return"translate(".concat(f,",").concat(i,") rotate(",0,")")}function D(a){var b=a[1][a[1].length-1][1][0].valueIncremental,c=-1,d=u.filter(function(a){return a<=b}).length+c,e=Math.max(0,d-3),f=u.slice(e,d);return f.push(b),f}function E(a){return 1===a?"":a>=1e3?(a=(a/1e3).toFixed(1))+"K":a}var F=c(682),G=c(1608),H=c(1555),I=c(5312),J=c(5005),K=c(3750),L=c(1174),M=c.n(L);function N(a){var b=a.label,c=a.items,e=a.value,f=a.setValue,g=a.defaultLabel,h=a.disabled;return(0,d.jsxs)("div",{className:p()("d-flex","justify-content-start","align-items-center","mb-2"),children:[b&&(0,d.jsx)("span",{children:b}),(0,d.jsxs)(I.Z,{className:p()({"ms-1":b}),children:[(0,d.jsxs)(I.Z.Toggle,{className:p()(M().btnWlm),id:"dropdown-basic",size:"sm",disabled:h,children:[e&&e.label,!e&&g]}),(0,d.jsx)(I.Z.Menu,{style:{maxHeight:"50vh",overflowY:"auto"},children:c.map(function(a,b){return(0,d.jsx)(I.Z.Item,{eventKey:b,onClick:function(){f(a)},children:a.label},b)})})]}),e&&(0,d.jsx)(J.Z,{className:p()("ms-1",M().btnWlm),size:"sm",onClick:function(){f(void 0)},disabled:h,children:(0,d.jsx)(K.C7Q,{})})]})}N.defaultProps={transferSelection:function(a){return console.warn("No function specified for rtansferring the selection to parent. Value:",a)},defaultLabel:"Select an item",items:[{label:"action 1"},{label:"action 2"},{label:"action 3"},{label:"action 4"}]};var O=c(2914);function P(a){var b=a.label,c=a.value,e=a.transferSelection;return(0,d.jsxs)(O.Z.Group,{controlId:"date",className:p()("d-flex","justify-content-start","align-items-center","mb-2"),children:[b&&(0,d.jsx)(O.Z.Label,{children:b}),(0,d.jsx)(O.Z.Control,{className:p()({"ms-1":b}),type:"date",name:"date",placeholder:"Pick a date",value:c,size:"sm",onChange:function(a){return e(a.target.value)}})]})}function Q(a){var b=a.label,c=a.onClickAction,e=a.content,f=a.disabled;return(0,d.jsxs)("div",{className:p()("d-flex","justify-content-start","align-items-center","mb-2"),children:[b&&(0,d.jsx)("span",{children:b}),(0,d.jsx)(J.Z,{className:p()(M().btnWlm,{"ms-1":b}),size:"sm",onClick:function(a){return c(a)},disabled:f,children:e})]})}P.defaultProps={value:"2012-01-01",transferSelection:function(a){return console.warn("No function specified for rtansferring the selection to parent. Value:",a)}},Q.defaultProps={initialDate:"2012-01-01",onClickAction:function(a){return console.warn("No function specified for onClickAction. Value:",a)}};var R=c(2086);function S(a){var b=a.label,c=a.items,e=a.disabled;return(0,d.jsxs)("div",{className:p()("d-flex","justify-content-start","align-items-center","mb-2"),children:[b&&(0,d.jsx)("span",{children:b}),(0,d.jsx)(R.Z,{className:p()({"ms-1":b}),"aria-label":"Basic example",children:c.map(function(a,b){return(0,d.jsx)(J.Z,{size:"sm",onClick:function(b){return a.onClickAction(b)},disabled:e,children:a.content},b)})})]})}S.defaultProps={items:[{content:"btn",onClickAction:function(a){return console.warn("No function specified for onClickAction. Value:",a)}},{content:"btn",onClickAction:function(a){return console.warn("No function specified for onClickAction. Value:",a)}},{content:"btn",onClickAction:function(a){return console.warn("No function specified for onClickAction. Value:",a)}},]},c(1664);var T=c(453),U=c.n(T),V=c(3854),W=c(6653),X=(0,l.forwardRef)(function(a,b){var c=a.children,e=a.onClick;return(0,d.jsxs)(J.Z,{href:"",ref:b,onClick:function(a){a.preventDefault(),e(a)},size:"sm",className:p()(U().btnWlm,"w-100","d-flex","justify-content-between","align-items-center"),children:[(0,d.jsx)("span",{children:c}),(0,d.jsx)(V.r0I,{className:p()("ms-1")})]})});X.displayName="HairyMenu";var Y=function(){return(0,d.jsxs)(I.Z,{className:p()("mb-2"),autoClose:!0,children:[(0,d.jsxs)(I.Z.Toggle,{as:X,id:"dropdown-autoclose-false",children:["Wiki",(0,d.jsx)(W.OBE,{}),"Monuments"]}),(0,d.jsxs)(I.Z.Menu,{className:p()("w-100"),children:[(0,d.jsx)(I.Z.Item,{href:"#",children:"About"}),(0,d.jsx)(I.Z.Item,{href:"#",children:"WikiLovesMonuments"}),(0,d.jsx)(I.Z.Header,{children:"Contests"}),(0,d.jsx)(I.Z.Item,{href:"#",children:"2022: Castelli e fortificazioni"}),(0,d.jsx)(I.Z.Item,{href:"#",children:"Concorso 2021"}),(0,d.jsx)(I.Z.Item,{href:"#",children:"Concorso 2020"})]})]})},Z=c(9815),$=c(2846),_=c.n($),aa=c(6042),ab=c(9396),ac={blueJeans:"#0978AB",lightBlue:"#DDF7FF",terrain:"#ECE5E0",white:"#ffffff",onWIki:"#C3C5C3",inContest:"#F8FF0E",photographed:"#22B8B4",interactive:"#FF004D"},ad=150,ae=function(a,b){az=ad/a.history.length,b.selectAll(".tickBg").data(function(a){return ai(a).slice(-1)},function(a){return a.label}).join("path").attr("d",function(a){var b=a.outerRadius,c=-ad/2,d=ad/2;return ag(0,0,b,c,d)}).attr("fill","url(#tick-background)").classed("tickBg",!0),b.selectAll(".snapshot").data(function(a){return a.history},function(a){return a.code}).join("g").attr("class","snapshot").attr("transform",function(a,b){return"rotate(".concat(-ad/2+az*b,")")}).selectAll(".status").data(function(a){return a.groups},function(a){return a.label}).join(function(a){return a.append("path").attr("class","status").attr("fill",function(a){return ac[a.label]}).attr("d",function(a){return ah(a)})},function(a){return a.attr("fill",function(a){return ac[a.label]}).attr("d",function(a){return ah(a)})},function(a){return a.remove()}),b.selectAll(".label").data(function(a){return[a.label]},function(a){return a}).join("text").attr("text-anchor","middle").attr("font-size","var(--label-size)").attr("class","label").attr("y",12).text(function(a){return a}).raise();var c=b.selectAll(".tick").data(function(a){return ai(a)},function(a){return a.label}).join(function(a){return a.append("g").attr("data-tick",function(a,b){return a.label}).classed("tick",!0)},function(a){return a},function(a){return a.remove()}).raise();c.selectAll(".axis").data(function(a){return[a]},function(a){return a}).join("path").classed("axis",!0).attr("d",function(a){var b=a.outerRadius,c=-ad/2,d=ad/2;return ag(0,0,b,c,d)}).attr("fill","none").attr("stroke","#aaa").attr("stroke-dasharray","1, 2").style("mix-blend-mode","multiply"),c.selectAll(".axisLabel").data(function(a){return[a]},function(a){return a}).join("text").classed("axisLabel",!0).attr("fill","#aaa").attr("font-size","var(--small-label-size)").attr("x",function(a){var b=a.outerRadius,c=ad/2;return c=a.index%2==0?c:-c,af(0,0,b,c).x}).attr("y",function(a){var b;return af(0,0,a.outerRadius,ad/2).y+10}).attr("text-anchor","middle").text(function(a){return a.value})};function af(a,b,c,d){var e=(d-90)*Math.PI/180;return{x:a+c*Math.cos(e),y:b+c*Math.sin(e)}}function ag(a,b,c,d,e){var f=af(a,b,c,e),g=af(a,b,c,d),h=e-d<=180?"0":"1";return["M",f.x,f.y,"A",c,c,0,h,0,g.x,g.y].join(" ")}function ah(a){var b,c=0,d=0;if(0===a.innerRadius){var e=a.outerRadius,f=0,g=az-1,h=af(c,d,a.outerRadius,g),i=af(c,d,a.outerRadius,f),j=g-f<=180?"0":"1";b=["M",c,d,"L",h.x,h.y,"A",e,e,0,j,0,i.x,i.y,"Z"].join(" ")}else{var k=a.outerRadius,l=0,m=az-1,n=af(c,d,k,m),o=af(c,d,k,l),p=m-l<=180?"0":"1",q=a.innerRadius,r=0,s=az-1,t=af(c,d,q,s),u=af(c,d,q,r),v=s-r<=180?"0":"1";b=["M",t.x,t.y,"L",n.x,n.y,"A",k,k,0,p,0,o.x,o.y,"L",u.x,u.y,"A",q,q,0,v,1,t.x,t.y,"Z",].join(" ")}return b}function ai(a){var b=[],c=[];return a.history.slice(-1)[0].groups.forEach(function(a,d){var e=a.value,f=(0,ab.Z)((0,aa.Z)({},a),{index:d});0>c.indexOf(e)&&(c.push(e),b.push(f))}),b}var aj={onWIki:{explained:"Monuments on Wikidata"},inContest:{explained:"Monuments in contest"},photographed:{explained:"Photographed for the first time"}};function ak(a){var b=a.group,c=a.max,e=a.filterData,f=a.setFilterData,g=e.find(function(a){return b.label===a.label}).active,h=(0,l.useState)(g),i=h[0],j=h[1],k=(0,l.useMemo)(function(){return b.value[1]-b.value[0]},[b]),m=(0,l.useMemo)(function(){return k/c*100},[k,c]);return(0,l.useEffect)(function(){var a=(0,Z.Z)(e);a.find(function(a){return b.label===a.label}).active=i,f(a)},[i]),(0,l.useEffect)(function(){j(e.find(function(a){return b.label===a.label}).active)},[e]),(0,d.jsxs)("div",{className:p()(_().group),children:[(0,d.jsx)("input",{name:b.label,type:"checkbox",checked:i,onChange:function(){return j(!i)}}),(0,d.jsxs)("span",{className:p()(_().bar),children:[(0,d.jsx)("div",{style:{backgroundColor:ac[b.label],width:"".concat(m,"%")}}),(0,d.jsxs)("span",{className:p()(_().amount),children:[k>=0?"+":"",k]})]}),(0,d.jsx)("span",{className:p()(_().explained),children:aj[b.label].explained})]})}var al=function(a){var b=a.data,c=a.filterData,e=a.setFilterData,f=(0,l.useState)(),g=f[0],h=f[1];return(0,l.useEffect)(function(){h((0,n.Fp7)(b.extent.map(function(a){return a.value[1]-a.value[0]})))},[b]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("h6",{children:"What's new"}),(0,d.jsx)("div",{className:"mb-3",children:b.extent.map(function(a,b){return(0,d.jsx)(ak,{group:a,max:g,filterData:c,setFilterData:e},b)})})]})},am=c(7211),an=c.n(am),ao=function(a){return a.data,(0,d.jsx)("div",{className:p()(an().areaChart,"d-flex","justify-content-center","align-items-center"),children:"[ Areachart will be here ]"})};function ap(a){var b=a.regions,c=a.selectedRegion,e=a.setSelectedRegion,f=a.provinces,g=a.selectedProvince,h=a.setSelectedProvince,i=a.municipalities,j=a.selectedMunicipality,k=a.setSelectedMunicipality,l=a.typologiesList,m=a.typology,n=a.setTypology,o=a.dateFrom,q=a.setDateFrom,r=a.dateTo,s=a.setDateTo,t=a.parentData,u=a.filterData,v=a.setFilterData;return(0,d.jsxs)("div",{className:p()(M().toolBar,"d-flex","flex-column"),children:[(0,d.jsx)(Y,{}),(0,d.jsx)("h6",{children:"Monuments"}),(0,d.jsx)(N,{label:"Region",items:b.items,value:c,setValue:e,defaultLabel:"Select a region",disabled:b.disabled||g}),(0,d.jsx)(N,{label:"Province",items:f.items,value:g,setValue:h,defaultLabel:"Select a province",disabled:f.disabled||j}),(0,d.jsx)(N,{label:"Municipality",items:i.items,value:j,setValue:k,defaultLabel:"Select a municipality",disabled:i.disabled}),(0,d.jsx)(N,{label:"Type",items:l,value:m,setValue:n,disabled:!0}),(0,d.jsx)(P,{label:"From",value:o,transferSelection:q}),(0,d.jsx)(P,{label:"To",value:r,transferSelection:s}),t&&u&&(0,d.jsx)(al,{data:t,filterData:u,setFilterData:v}),(0,d.jsx)("h6",{children:"Timeline"}),(0,d.jsxs)("div",{className:p()("d-flex","justify-content-between"),children:[(0,d.jsx)(S,{label:"Play",items:[{content:(0,d.jsx)(K.mz0,{}),onClickAction:function(a){return console.log(a)}},{content:"0.5X",onClickAction:function(a){return console.log(a)}},{content:"1X",onClickAction:function(a){return console.log(a)}},{content:"2X",onClickAction:function(a){return console.log(a)}},{content:(0,d.jsx)(K.cAs,{}),onClickAction:function(a){return console.log(a)}},],disabled:!0}),(0,d.jsx)(Q,{label:"Save",content:(0,d.jsx)(K.QNI,{}),disabled:!0})]}),t&&(0,d.jsx)(ao,{data:t,filterData:u})]})}var aq=c(8576),ar=c.n(aq);c(3163);var as,at,au,av,aw,ax,ay,az,aA,aB,aC,aD,aE,aF,aG,aH,aI,aJ,aK,aL,aM,aN,aO,aP,aQ,aR,aS,aT,aU=350,aV=1,aW=n.PUr().range([0,70]),aX=function(a,b){var c=b.lvl4,d=(aA=n.Ys(a)).node().getBoundingClientRect();aB=d.width,aC=d.height,aD=aA.select(".bgRect"),aD.empty()&&(aD=aA.append("rect").classed("bgRect",!0)),aD.attr("fill",ac.lightBlue).attr("width",aB).attr("height",aC).attr("pointer-events","none"),aH=aA.select(".main-g"),aH.empty()&&(aH=aA.append("g").classed("main-g",!0)),aI=aH.select(".g_geographies"),aI.empty()&&(aI=aH.append("g").classed("g_geographies",!0)),aJ=aI.select(".regions"),aJ.empty()&&(aJ=aI.append("g").classed("regions",!0)),aL=aI.select(".provinces"),aL.empty()&&(aL=aI.append("g").classed("provinces",!0)),aN=aI.select(".municipalities"),aN.empty()&&(aN=aI.append("g").classed("municipalities",!0)),aP=aH.select(".g_ventagli"),aP.empty()&&(aP=aH.append("g").classed("g_ventagli",!0)),aQ=aP.selectAll(".ventaglio"),aE=n.mw4().fitSize([aB,aC],{type:"FeatureCollection",features:c}),aF=n.l49(aE),aG=n.sPX().scaleExtent([1,1024]).extent([[0,0],[aB,aC],]).on("zoom",function(a){return aZ(a.transform)}),aA.call(aG),aY(b)},aY=function(a){var b,c=a.data,d=a.extent,e=a.lvl4,f=a.lvl6,g=a.lvl8,h=a.selectedRegion,i=a.selectedProvince,j=a.selectedMunicipality,k=a.setSelectedRegion,l=a.setSelectedProvince,m=a.setSelectedMunicipality;aW.domain([0,n.Fp7(d.map(function(a){return a.value[1]}))]),aK=aJ.selectAll(".region").data(e,function(a){return a.properties.code}).join("path").attr("class","region").attr("fill",ac.terrain).attr("stroke",ac.white).attr("stroke-width","var(--stroke-width)").attr("stroke-linecap","round").attr("stroke-linejoin","round").attr("d",function(a){return aF(a)}).on("click",function(a,b){a.stopPropagation();var c=b.properties,d=c.code,e=c.label;k({code:d,label:e})}),aM=aL.selectAll(".province").data(f,function(a){return a.properties.code}).join("path").attr("class","province").attr("fill",ac.terrain).attr("stroke",ac.white).attr("stroke-width","var(--stroke-width)").attr("stroke-linecap","round").attr("stroke-linejoin","round").attr("d",function(a){return aF(a)}).on("click",function(a,b){a.stopPropagation();var c=b.properties,d=c.code,e=c.label;l({code:d,label:e})}),aO=aN.selectAll(".municipality").data(g,function(a){return a.properties.code}).join("path").attr("class","municipality").attr("fill",ac.terrain).attr("stroke",ac.white).attr("stroke-width","var(--stroke-width)").attr("stroke-linecap","round").attr("stroke-linejoin","round").attr("d",function(a){return aF(a)}).on("click",function(a,b){a.stopPropagation();var c=b.properties,d=c.code,e=c.label;m({code:d,label:e})}),b=j?g:i?g:h?f:e,c=a0(c,b),aQ=aP.selectAll(".ventaglio").data(c,function(a){return a.code}).join(function(a){return a.append("g").attr("class","ventaglio").each(function(a){ae(a,n.Ys(this))})},function(a){return a.each(function(a){ae(a,n.Ys(this))})},function(a){return a.transition().duration(aU).style("opacity",0).remove()}),j?(aK.attr("opacity",.5),aM.attr("opacity",.5),aO.attr("opacity",.5).filter(function(a){return a.properties.code===j.code}).attr("opacity",1).each(a$)):i?(aK.attr("opacity",.5),aM.attr("opacity",.5).filter(function(a){return a.properties.code===i.code}).attr("opacity",1).each(a$)):h&&aK.attr("opacity",.5).filter(function(a){return a.properties.code===h.code}).attr("opacity",1).each(a$),aR.nodes(c),aR.alpha(1),aR.restart()};function aZ(a){aH.attr("transform",a);var b=a.x,c=a.y,d=a.k;aS=b,aT=c,aV=d,aQ.attr("transform",function(a){return"translate(".concat(a.x,", ").concat(a.y,") scale(").concat(1/d,")")}),document.documentElement.style.setProperty("--stroke-width",1/d),aR.alpha(1),aR.restart()}function a$(a){var b=(0,i.Z)(aF.bounds(a),2),c=(0,i.Z)(b[0],2),d=c[0],e=c[1],f=(0,i.Z)(b[1],2),g=f[0],h=f[1],j=.9/Math.max((g-d)/aB,(h-e)/aC);aA.transition().duration(3*aU).call(aG.transform,n.CRH.translate(aB/2,aC/2).scale(j).translate(-(d+g)/2,-(e+h)/2))}var a_=function(){aQ.attr("transform",function(a){return"translate(".concat(a.x,", ").concat(a.y,") scale(").concat(1/aV,")")})};function a0(a,b){return a.forEach(function(a){var c=b.find(function(b){return b.properties.code===a.code});if(c){var d=aE(c.properties.centroid.coordinates);a.x=d[0],a.y=d[1]}a.history.forEach(function(a){a.groups.forEach(function(b,c){b.innerRadius=0===c?0:a.groups[c-1].outerRadius,b.outerRadius=aW(b.value)})})}),a}function a1(a){var b=a.ventagli,c=a.lvl4,e=a.lvl6,f=a.lvl8,g=a.selectedRegion,h=a.selectedProvince,i=a.selectedMunicipality,j=a.setSelectedRegion,k=a.setSelectedProvince,m=a.setSelectedMunicipality,n=a.typology,o=a.dateFrom,q=a.dateTo,r=(0,l.useRef)(),s=b.data,t=b.extent;return(0,l.useEffect)(function(){aX(r.current,{data:s,extent:t,lvl4:c,lvl6:e,lvl8:f,selectedRegion:g,selectedProvince:h,selectedMunicipality:i,setSelectedRegion:j,setSelectedProvince:k,setSelectedMunicipality:m,typology:n,dateFrom:o,dateTo:q})},[]),(0,l.useEffect)(function(){aY({data:s,extent:t,lvl4:c,lvl6:e,lvl8:f,selectedRegion:g,selectedProvince:h,selectedMunicipality:i,setSelectedRegion:j,setSelectedProvince:k,setSelectedMunicipality:m,typology:n,dateFrom:o,dateTo:q})},[b,g,h,i]),(0,d.jsx)("div",{className:p()(ar().map),children:(0,d.jsx)("svg",{ref:r,children:(0,d.jsxs)("linearGradient",{id:"tick-background",x1:"50%",y1:"0%",x2:"50%",y2:"100%",children:[(0,d.jsx)("stop",{offset:"0%",stopColor:"rgb(255,255,255)",stopOpacity:"0.5"}),(0,d.jsx)("stop",{offset:"100%",stopColor:"rgb(255,255,255)",stopOpacity:"0"})]})})})}aR=n.A4v().force("x",n.RUJ(function(a){return a.x})).force("y",n.Mrm(function(a){return a.y})).on("tick",a_).stop();var a2=c(8565),a3=a2.DateTime,a4=a2.Interval,a5="https://wlm.inmagik.com",a6=function(a,b,c){var d=a.selectedRegion,e=a.selectedProvince,f=a.selectedMunicipality,g=a.typology,h=a.dateFrom,j=a.dateTo,k=a5,l=a5;if(f?(k+="/api/municipality/".concat(f.code,"/wlm/"),l+="/api/municipality/".concat(f.code,"/wlm/")):e?(k+="/api/province/".concat(e.code,"/wlm-areas/"),l+="/api/province/".concat(e.code,"/wlm/")):d?(k+="/api/region/".concat(d.code,"/wlm-areas/"),l+="/api/region/".concat(d.code,"/wlm/")):(console.log("all Italian regions"),console.info("No endopoint for retrieving all italian regions at once"),k=void 0),k){var m,o,p=a3.fromISO(h),q=a3.fromISO(j),r=a4.fromDateTimes(p,q),s=15;31>=Math.ceil(r.length("days")/1)?(o="days",m=1):Math.ceil(r.length("days")/5)<=s?(o="days",m=5):Math.ceil(r.length("days")/10)<=s?(o="days",m=10):Math.ceil(r.length("months")/1)<=s?(o="months",m=1):Math.ceil(r.length("months")/3)<=s?(o="months",m=3):Math.ceil(r.length("months")/4)<=s?(o="months",m=4):Math.ceil(r.length("months")/6)<=s?(o="months",m=6):(o="years",m=1);var t={step_size:m,step_unit:o};t.date_from=h,t.date_to=j,g&&(t.typology=g.label),t.format="json";var u=new URLSearchParams(t).toString();k+="?"+u,l+="?"+u,Promise.all([(0,n.AVB)(k),(0,n.AVB)(l)]).then(function(a){var d=(0,i.Z)(a,2),e=d[0],f=d[1];e.data.forEach(function(a){a.history.forEach(function(a){a.groups.reverse()})}),b(e),c(f)})}},a7=[{label:"All monuments"},{label:"Fortificazioni"},{label:"Quasi tutti"},{label:"Una piccola parte"}],a8=function(){var a=(0,m.useRouter)().asPath,b=(0,l.useState)(!0),c=b[0],e=b[1],f=(0,l.useState)(),g=f[0],h=f[1],j=(0,l.useState)(),o=j[0],q=j[1],r=(0,l.useState)(),s=r[0],t=r[1],u=(0,l.useState)([]),v=u[0],w=u[1],x=(0,l.useState)([]),y=x[0],z=x[1],A=(0,l.useState)([]),B=A[0],C=A[1],D=(0,l.useState)([]),E=D[0],I=D[1],J=(0,l.useState)([]),K=J[0],L=J[1],M=(0,l.useState)([]),N=M[0],O=M[1],P=(0,l.useState)([]),Q=P[0],R=P[1],S=(0,l.useState)(),T=S[0],U=S[1],V=(0,l.useState)(),W=V[0],X=V[1],Y=(0,l.useState)(),Z=Y[0],$=Y[1],_=(0,l.useState)(),aa=_[0],ab=_[1],ac=(0,l.useState)("2012-09-01"),ad=ac[0],ae=ac[1],af=(0,l.useState)("2022-09-01"),ag=af[0],ah=af[1];(0,l.useEffect)(function(){Promise.all([n.AVB("https://wlm.inmagik.com/api/region/geo/?format=json")]).then(function(b){var c=(0,i.Z)(b,1)[0],d=a7;R(d),w(c.features);var f=c.features.map(function(a){return{label:a.properties.name,code:a.properties.code}});I(f);var g=a.split("#")[1],h={};g&&(h=Object.fromEntries(g.split("&").map(function(a){return a.split("=").map(function(a){return decodeURIComponent(a)})})));var j=h.typology,k=h.dateFrom,l=h.dateTo,m=h.selectedRegion,o=h.selectedProvince,p=h.selectedMunicipality;if(j&&ab(d.find(function(a){return a.label===j})),k&&ae(k),l&&ah(l),m){var q=f.find(function(a){return a.label===m});U(q),n.AVB("https://wlm.inmagik.com/api/region/".concat(q.code,"/areas/?format=json")).then(function(a){z(a.features);var b=a.features.map(function(a){return{label:a.properties.name,code:a.properties.code}});if(L(b),o){var c=b.find(function(a){return a.label===o});X(c),n.AVB("https://wlm.inmagik.com/api/province/".concat(c.code,"/areas/?format=json")).then(function(a){C(a.features);var b=a.features.map(function(a){return{label:a.properties.name,code:a.properties.code}});O(b),p&&$(b.find(function(a){return a.label===p})),e(!1)})}else e(!1)})}else e(!1)})},[]),(0,l.useEffect)(function(){T&&!c?n.AVB("https://wlm.inmagik.com/api/region/".concat(T.code,"/areas/?format=json")).then(function(a){z(a.features),L(a.features.map(function(a){return{label:a.properties.name,code:a.properties.code}}))}):(z([]),L([]))},[T]),(0,l.useEffect)(function(){W&&!c?n.AVB("https://wlm.inmagik.com/api/province/".concat(W.code,"/areas/?format=json")).then(function(a){C(a.features),O(a.features.map(function(a){return{label:a.properties.name,code:a.properties.code}}))}):(C([]),O([]))},[W]),(0,l.useEffect)(function(){if(o){var a=o.extent.map(function(a){var b=!0;return s&&(b=s.find(function(b){return b.label===a.label}).active),{label:a.label,active:b}});t(a)}},[o]),(0,l.useEffect)(function(){var a={},b={};T&&(a.selectedRegion=encodeURIComponent(T.label),b.selectedRegion=T),W&&(a.selectedProvince=encodeURIComponent(W.label),b.selectedProvince=W),Z&&(a.selectedMunicipality=encodeURIComponent(Z.label),b.selectedMunicipality=Z),aa&&(a.typology=encodeURIComponent(aa.label),b.typology=aa),ad&&(a.dateFrom=encodeURIComponent(ad),b.dateFrom=ad),ag&&(a.dateTo=encodeURIComponent(ag),b.dateTo=ag);var d=[];for(var e in a)d.push(e+"="+a[e]);var f="#"+d.join("&");location.replace(f),c||a6(b,h,q)},[T,W,Z,aa,ad,ag,c]);var ai=(0,l.useMemo)(function(){if(s&&g){var a=JSON.parse(JSON.stringify(g));return s.filter(function(a){return!a.active}).forEach(function(b){a.data.forEach(function(a){a.history.forEach(function(a){var c=a.groups,d=c.find(function(a){return a.label===b.label}),e=c.indexOf(d);e> -1&&c.splice(e,1)})});var c=a.extent.find(function(a){return a.label===b.label}),d=a.extent.indexOf(c);d> -1&&a.extent.splice(d,1)}),a}},[s,g]);return(0,d.jsx)(F.Z,{className:p()(k().vizController),fluid:!0,children:(0,d.jsxs)(G.Z,{className:p()("h-100"),children:[(0,d.jsx)(H.Z,{className:p()("h-100","pe-0"),md:3,xl:3,children:(0,d.jsx)(ap,{regions:{items:E,disabled:!E.length},selectedRegion:T,setSelectedRegion:U,provinces:{items:K,disabled:!K.length},selectedProvince:W,setSelectedProvince:X,municipalities:{items:N,disabled:!N.length},selectedMunicipality:Z,setSelectedMunicipality:$,typologiesList:Q,typology:aa,setTypology:ab,dateFrom:ad,setDateFrom:ae,dateTo:ag,setDateTo:ah,parentData:o,filterData:s,setFilterData:t})}),(0,d.jsx)(H.Z,{className:p()("h-100"),children:(0,d.jsxs)(d.Fragment,{children:[!c&&ai&&(0,d.jsx)(a1,{ventagli:ai,lvl4:v,lvl6:y,lvl8:B,selectedRegion:T,setSelectedRegion:U,selectedProvince:W,setSelectedProvince:X,selectedMunicipality:Z,setSelectedMunicipality:$,typology:aa,dateFrom:ad,dateTo:ag}),c&&(0,d.jsx)("p",{children:"Loading data"})]})})]})})};function a9(){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(f(),{children:(0,d.jsx)("title",{children:"Home"})}),(0,d.jsx)(a8,{})]})}},7211:function(a){a.exports={areaChart:"AreaChart_areaChart__qAbnb"}},8576:function(a){a.exports={map:"MapVentagli_map__NmyTz"}},453:function(a){a.exports={btnWlm:"NavMenu_btnWlm___ociY"}},2371:function(a){a.exports={navbar:"Navigation_navbar__clCa1",logo:"Navigation_logo__AbP0d",item:"Navigation_item__j_Te9",specificPage:"Navigation_specificPage__k2gFH"}},1174:function(a){a.exports={toolBar:"UI-Components_toolBar__KROSq",btnWlm:"UI-Components_btnWlm__51KGY"}},8804:function(a){a.exports={vizController:"VisualizationController_vizController__KxPt2"}},2846:function(a){a.exports={group:"WhatsNew_group__mJ_bs",bar:"WhatsNew_bar__Y8vj9",amount:"WhatsNew_amount__QWQbL",explained:"WhatsNew_explained__LsAxI"}}},function(a){a.O(0,[556,13,225,458,843,774,888,179],function(){var b;return a(a.s=5557)}),_N_E=a.O()}])