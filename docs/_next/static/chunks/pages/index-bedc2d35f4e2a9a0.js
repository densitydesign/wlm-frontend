(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return c(5938)}])},7709:function(a,b,c){"use strict";c.d(b,{Z:function(){return r}});var d=c(5893),e=c(7294),f=c(1664),g=c.n(f),h=c(1163),i=c(5005),j=c(9459),k=c(453),l=c.n(k),m=c(3854),n=c(6653),o=c(4184),p=c.n(o),q=(0,e.forwardRef)(function(a,b){var c=a.children,e=a.onClick;return(0,d.jsxs)(i.Z,{href:"",ref:b,onClick:function(a){a.preventDefault(),e(a)},size:"sm",variant:"lightBlue",className:p()(l().btnWlm,"w-100","d-flex","justify-content-between","align-items-center"),children:[(0,d.jsx)("span",{children:c}),(0,d.jsx)(m.r0I,{className:p()("ms-1")})]})});q.displayName="HairyMenu";var r=function(){(0,h.useRouter)().basePath;var a=(0,h.useRouter)(),b=function(b,c){b.preventDefault(),a.push(c),a.reload()};return(0,d.jsxs)(j.Z,{className:p()("mb-2"),autoClose:!0,children:[(0,d.jsxs)(j.Z.Toggle,{as:q,id:"dropdown-autoclose-false",children:["Wiki",(0,d.jsx)(n.OBE,{}),"Monuments"]}),(0,d.jsxs)(j.Z.Menu,{className:p()("w-100"),children:[(0,d.jsx)(j.Z.Item,{href:"/",onClick:function(a){return b(a,"/")},children:"Map"}),(0,d.jsx)(g(),{href:"/list",passHref:!0,children:(0,d.jsx)(j.Z.Item,{children:"List"})}),(0,d.jsx)(g(),{href:"/about",passHref:!0,children:(0,d.jsx)(j.Z.Item,{children:"About"})}),(0,d.jsx)(j.Z.Item,{href:"https://www.wikimedia.it/wiki-loves-monuments/",children:"WikiLovesMonuments"}),(0,d.jsx)(j.Z.Header,{children:"Contests"}),(0,d.jsx)(j.Z.Item,{href:"/#selectedRegion=Umbria&dateFrom=2022-09-01&dateTo=2022-09-30",onClick:function(a){return b(a,"/#selectedRegion=Umbria&dateFrom=2022-09-01&dateTo=2022-09-30")},children:"2022: Castelli e fortificazioni"}),(0,d.jsx)(j.Z.Item,{href:"/#selectedRegion=Umbria&dateFrom=2021-09-01&dateTo=2021-09-30",onClick:function(a){return b(a,"/#selectedRegion=Umbria&dateFrom=2021-09-01&dateTo=2021-09-30")},children:"Concorso 2021"}),(0,d.jsx)(j.Z.Item,{href:"/#selectedRegion=Umbria&dateFrom=2020-09-01&dateTo=2020-09-30",onClick:function(a){return b(a,"/#selectedRegion=Umbria&dateFrom=2020-09-01&dateTo=2020-09-30")},children:"Concorso 2020"})]})]})}},947:function(a,b,c){"use strict";c.d(b,{Z:function(){return p}});var d=c(4924),e=c(5893),f=c(1664),g=c.n(f),h=c(1163),i=c(2711),j=c(5498),k=c(4184),l=c.n(k),m=c(2371),n=c.n(m),o=JSON.parse('[{"label":"Home","url":"/","menues":["main","footer"]},{"label":"Page","url":"/page","menues":["main","footer"]}]');function p(){var a=(0,h.useRouter)();return(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)(i.Z,{className:l()(n().navbar,"px-3"),sticky:"top",expand:"lg",children:[(0,e.jsx)(g(),{href:"/",children:(0,e.jsx)("a",{className:l()(n().logo,"no-hover"),children:"Project Title"})}),(0,e.jsx)(i.Z.Toggle,{"aria-controls":"abilitiamo-main-navbar"}),(0,e.jsx)(i.Z.Collapse,{children:(0,e.jsx)(j.Z,{className:l()("ms-auto","align-items-left"),children:o.filter(function(a){return a.menues.indexOf("main")> -1}).map(function(b){return(0,e.jsx)(g(),{href:b.url,children:(0,e.jsx)("a",{className:l()("nav-link","no-hover",n().item,(0,d.Z)({},"".concat(n().active),a.pathname==b.url),(0,d.Z)({},"".concat(n().specificPage),"/dona-ora"===b.url)),children:b.label})},b.label)})})})]})})}},5938:function(a,b,c){"use strict";c.r(b),c.d(b,{default:function(){return bf}});var d=c(5893),e=c(9008),f=c.n(e);c(947);var g,h,i=c(828),j=c(8804),k=c.n(j),l=c(7294),m=c(1163),n=c(952),o=c(4184),p=c.n(o),q={},r={},s=n.PUr().range([1,87.5]),t=n.PKp(["mapped","authorized","photographed"],["#C3C5C3","#F8FF0E","#22B8B4"]);function u(a){return a.forEach(function(a){a[1].forEach(function(a){var b=a[1].find(function(a){return"photographed"===a.group});b.innerRadius=0,b.outerRadius=s(b.valueIncremental);var c=a[1].find(function(a){return"authorized"===a.group});c.innerRadius=b.outerRadius,c.outerRadius=s(c.valueIncremental);var d=a[1].find(function(a){return"mapped"===a.group});d&&(d.innerRadius=c.outerRadius,d.outerRadius=s(d.valueIncremental))})}),a}function v(a,b,c,d){var e=(d-90)*Math.PI/180;return{x:a+c*Math.cos(e),y:b+c*Math.sin(e)}}function w(a,b,c,d,e){var f=v(a,b,c,e),g=v(a,b,c,d);return["M",f.x,f.y,"A",c,c,0,e-d<=180?"0":"1",0,g.x,g.y].join(" ")}function x(a){var b;if(0===a.innerRadius){var c=a.outerRadius,d=0,e=ai,f=v(0,0,a.outerRadius,e),g=v(0,0,a.outerRadius,d),h=e-d<=180?"0":"1";b=["M",0,0,"L",f.x,f.y,"A",c,c,0,h,0,g.x,g.y,"Z",].join(" ")}else{var i=a.outerRadius,j=0,k=ai,l=v(0,0,i,k),m=v(0,0,i,j),n=k-j<=180?"0":"1",o=a.innerRadius,p=0,q=ai,r=v(0,0,o,q),s=v(0,0,o,p),t=q-p<=180?"0":"1";b=["M",r.x,r.y,"L",l.x,l.y,"A",i,i,0,n,0,m.x,m.y,"L",s.x,s.y,"A",o,o,0,t,1,r.x,r.y,"Z",].join(" ")}return b}function y(a,b){var c=arguments.length>2&& void 0!==arguments[2]&&arguments[2];if(c){var d=.1*g+Math.random()*g*.8,e=.1*h+Math.random()*h*.8;return"translate(".concat(d,", ").concat(e,")")}var f=b%r.columns*175+87.5+q.left,i=175*Math.floor(b/r.columns)+87.5+q.top;return"translate(".concat(f,",").concat(i,") rotate(",0,")")}function z(a){var b=a[1][a[1].length-1][1][0].valueIncremental,c=null.filter(function(a){return a<=b}).length+ -1,d=null.slice(Math.max(0,c-3),c);return d.push(b),d}function A(a){return 1===a?"":a>=1e3?(a=(a/1e3).toFixed(1))+"K":a}var B=c(682),C=c(1608),D=c(1555),E=c(9459),F=c(5005),G=c(3750),H=c(1174),I=c.n(H);function J(a){var b=a.label,c=a.items,e=a.value,f=a.setValue,g=a.defaultLabel,h=a.disabled;return(0,d.jsxs)("div",{className:p()("d-flex","justify-content-start","align-items-center","mb-2"),children:[b&&(0,d.jsx)("span",{children:b}),(0,d.jsxs)(E.Z,{className:p()({"ms-1":b}),children:[(0,d.jsxs)(E.Z.Toggle,{className:p()(I().btnWlm),id:"dropdown-basic",size:"sm",variant:"lightBlue",disabled:h,children:[e&&e.label,!e&&g]}),(0,d.jsx)(E.Z.Menu,{style:{maxHeight:"50vh",overflowY:"auto"},children:c.map(function(a,b){return(0,d.jsx)(E.Z.Item,{eventKey:b,onClick:function(){f(a)},children:a.label},b)})})]}),e&&(0,d.jsx)(F.Z,{className:p()("ms-1",I().btnWlm),size:"sm",variant:"lightBlue",onClick:function(){f(void 0)},disabled:h,children:(0,d.jsx)(G.C7Q,{})})]})}J.defaultProps={transferSelection:function(a){return console.warn("No function specified for rtansferring the selection to parent. Value:",a)},defaultLabel:"Select an item",items:[{label:"action 1"},{label:"action 2"},{label:"action 3"},{label:"action 4"}]};var K=c(2914);function L(a){var b=a.label,c=a.value,e=a.transferSelection;return(0,d.jsxs)(K.Z.Group,{controlId:"date",className:p()("d-flex","justify-content-start","align-items-center","mb-2"),children:[b&&(0,d.jsx)(K.Z.Label,{children:b}),(0,d.jsx)(K.Z.Control,{className:p()({"ms-1":b}),type:"date",name:"date",placeholder:"Pick a date",value:c,size:"sm",variant:"lightBlue",onChange:function(a){return e(a.target.value)}})]})}function M(a){var b=a.label,c=a.onClickAction,e=a.content,f=a.disabled;return(0,d.jsxs)("div",{className:p()("d-flex","justify-content-start","align-items-center","mb-2"),children:[b&&(0,d.jsx)("span",{children:b}),(0,d.jsx)(F.Z,{className:p()(I().btnWlm,{"ms-1":b}),size:"sm",variant:"lightBlue",onClick:function(a){return c(a)},disabled:f,children:e})]})}L.defaultProps={value:"2012-01-01",transferSelection:function(a){return console.warn("No function specified for rtansferring the selection to parent. Value:",a)}},M.defaultProps={initialDate:"2012-01-01",onClickAction:function(a){return console.warn("No function specified for onClickAction. Value:",a)}};var N=c(2086);function O(a){var b=a.label,c=a.items,e=a.disabled;return(0,d.jsxs)("div",{className:p()("d-flex","justify-content-start","align-items-center","mb-2"),children:[b&&(0,d.jsx)("span",{children:b}),(0,d.jsx)(N.Z,{className:p()({"ms-1":b}),"aria-label":"Basic example",children:c.map(function(a,b){return(0,d.jsx)(F.Z,{size:"sm",variant:"lightBlue",onClick:function(b){return a.onClickAction(b)},disabled:e,children:a.content},b)})})]})}O.defaultProps={items:[{content:"btn",onClickAction:function(a){return console.warn("No function specified for onClickAction. Value:",a)}},{content:"btn",onClickAction:function(a){return console.warn("No function specified for onClickAction. Value:",a)}},{content:"btn",onClickAction:function(a){return console.warn("No function specified for onClickAction. Value:",a)}},]};var P=c(7709),Q=c(9815),R=c(2846),S=c.n(R),T=c(6042),U=c(9396),V={blueJeans:"#0978AB",lightBlue:"#DDF7FF",terrain:"#ECE5E0",white:"#ffffff",onWIki:"#C3C5C3",inContest:"#F8FF0E",photographed:"#22B8B4",interactive:"#FF004D"},W=150,X=function(a,b){aj=W/a.history.length,b.selectAll(".collisionArea").data(function(a){return[a]},function(a){return a.code}).join("circle").attr("class","collisionArea").attr("r",function(a){return a.maxRaius||a.history.slice(-1)[0].groups.slice(-1)[0].outerRadius}).lower(),b.selectAll(".tickBg").data(function(a){return _(a).slice(0,1)},function(a){return a.code}).join("path").attr("d",function(a){var b;return Z(0,0,a.outerRadius,-W/2,W/2)}).attr("stroke","none").attr("fill","url(#tick-background)").classed("tickBg",!0).lower(),b.selectAll(".bubble").data(function(a){return[a]},function(a){return a.code}).join("circle").attr("class","bubble").attr("fill",function(a){return V[a.history.slice(-1)[0].groups.reduce(function(a,b){return a.valueDelta>b.valueDelta?a:b}).label]}).attr("stroke","#fff").attr("r",4).attr("display","none"),b.selectAll(".snapshot").data(function(a){return a.history},function(a){return a.date}).join("g").attr("class","snapshot").attr("transform",function(a,b){return"rotate(".concat(-W/2+aj*b,")")}).selectAll(".status").data(function(a){return a.groups},function(a){return a.label}).join(function(a){return a.append("path").attr("class","status").attr("fill",function(a){return V[a.label]}).attr("d",function(a){return $(a)})},function(a){return a.attr("fill",function(a){return V[a.label]}).attr("d",function(a){return $(a)})},function(a){return a.remove()}),b.selectAll(".label").data(function(a){return[a]},function(a){return a.code}).join("text").attr("text-anchor","middle").attr("font-size",10).attr("class","label").attr("y",12).text(function(a){return a.label.slice(0,7)}).raise();var c=b.select(".ticks");c.empty()&&(c=b.append("g").classed("ticks",!0)),c.raise();var d=c.selectAll(".tick").data(function(a){return _(a)},function(a){return a.label+a.value}).join("g").attr("data-tick",function(a,b){return a.label+a.value}).classed("tick",!0);d.selectAll(".axis").data(function(a){return[a]},function(a){return a}).join("path").classed("axis",!0).attr("d",function(a){var b;return Z(0,0,a.outerRadius,-W/2,W/2)}).attr("stroke","rgba(255,255,255,0.75)").attr("stroke-width",.5).attr("fill","none"),d.selectAll(".axisLabel").data(function(a){return[a]},function(a){return a}).join("text").classed("axisLabel",!0).attr("fill","#aaa").attr("font-size",7).attr("font-weight","bold").attr("x",function(a){var b=a.outerRadius,c=W/2;return c=a.index%2==0?c:-c,Y(0,0,b,c).x}).attr("y",function(a){var b;return Y(0,0,a.outerRadius,W/2).y+7}).attr("text-anchor",function(a){return a.index%2==0?"start":"end"}).text(function(a){return a.value})};function Y(a,b,c,d){var e=(d-90)*Math.PI/180;return{x:a+c*Math.cos(e),y:b+c*Math.sin(e)}}function Z(a,b,c,d,e){var f=Y(a,b,c,e),g=Y(a,b,c,d);return["M",f.x,f.y,"A",c,c,0,e-d<=180?"0":"1",0,g.x,g.y].join(" ")}function $(a){var b;if(0===a.innerRadius){var c=a.outerRadius,d=0,e=aj-1,f=Y(0,0,a.outerRadius,e),g=Y(0,0,a.outerRadius,d),h=e-d<=180?"0":"1";b=["M",0,0,"L",f.x,f.y,"A",c,c,0,h,0,g.x,g.y,"Z"].join(" ")}else{var i=a.outerRadius,j=0,k=aj-1,l=Y(0,0,i,k),m=Y(0,0,i,j),n=k-j<=180?"0":"1",o=a.innerRadius,p=0,q=aj-1,r=Y(0,0,o,q),s=Y(0,0,o,p),t=q-p<=180?"0":"1";b=["M",r.x,r.y,"L",l.x,l.y,"A",i,i,0,n,0,m.x,m.y,"L",s.x,s.y,"A",o,o,0,t,1,r.x,r.y,"Z",].join(" ")}return b}function _(a){for(var b=function(a){var b=e[a];if(0===b.value)return"continue";var f=b.outerRadius,g=(0,U.Z)((0,T.Z)({},b),{index:a}),h=7;d.find(function(a){return a>=f-h&&a<=f+h})||(d.push(f),c.push(g))},c=[],d=[],e=a.history.slice(-1)[0].groups,f=e.length-1;f>=0;f--)b(f);return c}var aa={onWIki:{explained:"Monuments on Wikidata"},inContest:{explained:"Monuments in contest"},photographed:{explained:"Photographed for the first time"}};function ab(a){var b=a.group,c=a.max,e=a.filterData,f=a.setFilterData,g=e.find(function(a){return b.label===a.label}).active,h=(0,l.useState)(g),i=h[0],j=h[1],k=(0,l.useMemo)(function(){return b.value[1]-b.value[0]},[b]),m=(0,l.useMemo)(function(){return k/c*100},[k,c]);return(0,l.useEffect)(function(){var a=(0,Q.Z)(e);a.find(function(a){return b.label===a.label}).active=i,f(a)},[i]),(0,l.useEffect)(function(){j(e.find(function(a){return b.label===a.label}).active)},[e]),(0,d.jsxs)("div",{className:p()(S().group),children:[(0,d.jsx)("input",{name:b.label,type:"checkbox",checked:i,onChange:function(){return j(!i)}}),(0,d.jsxs)("span",{className:p()(S().bar),children:[(0,d.jsx)("div",{style:{backgroundColor:V[b.label],width:"".concat(m,"%")}}),(0,d.jsxs)("span",{className:p()(S().amount),children:[k>=0?"+":"",k]})]}),(0,d.jsx)("span",{className:p()(S().explained),children:aa[b.label].explained})]})}var ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq=function(a){var b=a.data,c=a.filterData,e=a.setFilterData,f=(0,l.useState)(),g=f[0],h=f[1];return(0,l.useEffect)(function(){h((0,n.Fp7)(b.extent.map(function(a){return a.value[1]-a.value[0]})))},[b]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("h6",{children:"What's new"}),(0,d.jsx)("div",{className:"mb-3",children:b.extent.map(function(a,b){return(0,d.jsx)(ab,{group:a,max:g,filterData:c,setFilterData:e},b)})})]})},ar=c(7211),as=c.n(ar),at={left:20,right:1,top:30,bottom:20},au=n.Xf(),av=n.BYU(),aw=function(a){(ap=(ak=n.Ys(a)).select(".quantityAxisGroup")).empty()&&(ap=ak.append("g").classed("quantityAxisGroup",!0)),(an=ak.selectAll(".areaChart")).empty()&&(an=ak.append("g").classed("areaChart",!0)),(ao=ak.select(".timeAxisGroup")).empty()&&(ao=ak.append("g").classed("timeAxisGroup",!0))},ax=function(a,b){var c=ak.node().getBoundingClientRect();al=c.width,am=c.height;var d=[],e=new Set,f=[],g=[],h=b.filter(function(a){return a.active}).map(function(a){return a.label});a.data.forEach(function(a){a.history.forEach(function(a){var b=(0,i.Z)(a.date.split("-"),3),c=b[0],j=b[1],k=b[2],l=new Date(c,j-1,k);f.push(l);var m={date:l},n=a.groups.filter(function(a){return -1!==h.indexOf(a.label)});n.forEach(function(a,b){var c=a.value;b>0&&(c-=n[b-1].value),g.push(a.value),e.add(a.label),m[a.label]=c}),d.push(m)})});var j,k=n.knu().keys(Array.from(e)).order(n.Qxt).offset(n.HLf)(d),l=n.Wem(f);au.domain(l).range([at.left,al-at.right]);var m=n.LLu(au);ao.attr("transform","translate(0, ".concat(am-at.bottom,")")).call(m).call(function(a){a.select(".domain").remove()});var o=n.Wem(g);av.domain([0,o[1]]).range([am-at.bottom,at.top]),av.ticks(5);var p=av.tickFormat(5,"~s"),q=n.Khx(av.copy()).tickFormat(p),r=[];ap.attr("transform","translate(".concat(0,",0)")).call(q).call(function(a){a.select(".domain").attr("display","none"),a.selectAll(".tick > text").attr("x",0).each(function(a){r.push(this.getComputedTextLength())}),a.selectAll(".tick > line").attr("stroke-dasharray","1, 4").attr("x1",Math.ceil(n.Fp7(r))+4).attr("x2",al),a.selectAll(".tick").filter(function(a){return 0===a}).attr("display","none")});var s=n.SOn().x(function(a){return au(a.data.date)}).y0(function(a){return av(a[0])}).y1(function(a){return av(a[1])}).curve(n.jsv);an.selectAll(".area").data(k).join("path").attr("class","area").attr("fill",function(a){return V[a.key]}).attr("d",s)},ay=function(a){var b=a.data,c=a.filterData,e=(0,l.useRef)();return(0,l.useEffect)(function(){aw(e.current)},[]),(0,l.useEffect)(function(){ax(b,c)},[b,c]),(0,d.jsx)("div",{className:p()(as().areaChart,"d-flex","justify-content-center","align-items-center"),children:(0,d.jsx)("svg",{ref:e})})};function az(a){var b=a.regions,c=a.selectedRegion,e=a.setSelectedRegion,f=a.provinces,g=a.selectedProvince,h=a.setSelectedProvince,i=a.municipalities,j=a.selectedMunicipality,k=a.setSelectedMunicipality,l=a.typologiesList,m=a.typology,n=a.setTypology,o=a.dateFrom,q=a.setDateFrom,r=a.dateTo,s=a.setDateTo,t=a.parentData,u=a.filterData,v=a.setFilterData;return(0,d.jsxs)("div",{className:p()(I().toolBar,"d-flex","flex-column"),children:[(0,d.jsx)(P.Z,{}),(0,d.jsx)("h6",{children:"Monuments"}),(0,d.jsx)(J,{label:"Region",items:b.items,value:c,setValue:e,defaultLabel:"Select a region",disabled:b.disabled||g}),(0,d.jsx)(J,{label:"Province",items:f.items,value:g,setValue:h,defaultLabel:"Select a province",disabled:f.disabled||j}),(0,d.jsx)(J,{label:"Municipality",items:i.items,value:j,setValue:k,defaultLabel:"Select a municipality",disabled:i.disabled}),(0,d.jsx)(J,{label:"Type",items:l,value:m,setValue:n,disabled:!0}),(0,d.jsx)(L,{label:"From",value:o,transferSelection:q}),(0,d.jsx)(L,{label:"To",value:r,transferSelection:s}),t&&u&&(0,d.jsx)(aq,{data:t,filterData:u,setFilterData:v}),(0,d.jsx)("h6",{children:"Timeline"}),(0,d.jsxs)("div",{className:p()("d-flex","justify-content-between"),children:[(0,d.jsx)(O,{label:"Play",items:[{content:(0,d.jsx)(G.mz0,{}),onClickAction:function(a){return console.log(a)}},{content:"0.5X",onClickAction:function(a){return console.log(a)}},{content:"1X",onClickAction:function(a){return console.log(a)}},{content:"2X",onClickAction:function(a){return console.log(a)}},{content:(0,d.jsx)(G.cAs,{}),onClickAction:function(a){return console.log(a)}},],disabled:!0}),(0,d.jsx)(M,{label:"Save",content:(0,d.jsx)(G.QNI,{}),disabled:!0})]}),t&&u&&(0,d.jsx)(ay,{data:t,filterData:u})]})}var aA=c(8576),aB=c.n(aA);c(3163),n.A4v().force("x",n.RUJ(function(a){return a.x})).force("y",n.Mrm(function(a){return a.y})).on("tick",a_).stop();var aC,aD,aE,aF,aG,aH,aI,aJ,aK,aL,aM,aN,aO,aP,aQ,aR,aS,aT,aU,aV=1,aW=void 0,aX=n.vY$(),aY=function(a,b){var c=b.lvl4,d=(aC=n.Ys(a)).node().getBoundingClientRect();aD=d.width,aE=d.height,aF=aC.select(".bgRect"),aF.empty()&&(aF=aC.append("rect").classed("bgRect",!0)),aF.attr("fill",V.lightBlue).attr("width","100%").attr("height","100%").attr("pointer-events","none"),aJ=aC.select(".main-g"),aJ.empty()&&(aJ=aC.append("g").classed("main-g",!0)),aK=aJ.select(".g_geographies"),aK.empty()&&(aK=aJ.append("g").classed("g_geographies",!0)),aL=aK.select(".regions"),aL.empty()&&(aL=aK.append("g").classed("regions",!0)),aN=aK.select(".provinces"),aN.empty()&&(aN=aK.append("g").classed("provinces",!0)),aP=aK.select(".municipalities"),aP.empty()&&(aP=aK.append("g").classed("municipalities",!0)),aR=aJ.select(".g_ventagli"),aR.empty()&&(aR=aJ.append("g").classed("g_ventagli",!0)),aS=aR.selectAll(".ventaglio"),aG=n.mw4().fitSize([aD,aE],{type:"FeatureCollection",features:c}),aH=n.l49(aG),aI=n.sPX().scaleExtent([1,1024]).extent([[0,0],[aD,aE],]).on("zoom",function(a){return a$(a.transform)}).on("end",function(){console.log("fcadciuchuacidpb")}).on("end",function(){aS.call(a1)}),aC.call(aI),aZ(b)},aZ=function(a){var b,c=function(a){var b=(0,i.Z)(aH.bounds(a),2),c=(0,i.Z)(b[0],2),d=c[0],e=c[1],f=(0,i.Z)(b[1],2),g=f[0],h=f[1],j=("municipality"===aW?.25:1)/Math.max((g-d)/aD,(h-e)/aE);aC.transition().duration(0).call(aI.transform,n.CRH.translate(aD/2,aE/2).scale(j).translate(-(d+g)/2,-(e+h)/2))},d=a.data,e=a.extent,f=a.lvl4,g=a.lvl6,h=a.lvl8,j=a.selectedRegion,k=a.selectedProvince,l=a.selectedMunicipality,m=a.setSelectedRegion,o=a.setSelectedProvince,p=a.setSelectedMunicipality;aX.exponent(.5).domain([0,n.Fp7(e.map(function(a){return a.value[1]}))]).range([0,70]),aM=aL.selectAll(".region").data(f,function(a){return a.properties.code}).join("path").attr("class","region").attr("fill",V.terrain).attr("stroke",V.white).attr("stroke-width","var(--stroke-width)").attr("stroke-linecap","round").attr("stroke-linejoin","round").attr("d",function(a){return aH(a)}).on("click",function(a,b){a.stopPropagation();var c=b.properties,d=c.code,e=c.label;p(void 0),o(void 0),m({code:d,label:e})}),aO=aN.selectAll(".province").data(g,function(a){return a.properties.code}).join("path").attr("class","province").attr("fill",V.terrain).attr("stroke",V.white).attr("stroke-width","var(--stroke-width)").attr("stroke-linecap","round").attr("stroke-linejoin","round").attr("d",function(a){return aH(a)}).on("click",function(a,b){a.stopPropagation();var c=b.properties,d=c.code,e=c.label;p(void 0),o({code:d,label:e})}),aQ=aP.selectAll(".municipality").data(h,function(a){return a.properties.code}).join("path").attr("class","municipality").attr("fill",V.terrain).attr("stroke",V.white).attr("stroke-width","var(--stroke-width)").attr("stroke-linecap","round").attr("stroke-linejoin","round").attr("d",function(a){return aH(a)}).on("click",function(a,b){if(a.stopPropagation(),l)p(void 0);else{var c=b.properties,d=c.code,e=c.label,f={code:d,label:e};p(f)}}),l?(b=h,aW="municipality",aM.attr("opacity",.5),aO.attr("opacity",.5),aQ.attr("display","none").filter(function(a){return a.properties.code===l.code}).attr("display","block").each(c)):k?(b=h,aW="province",aM.attr("opacity",.5),aO.attr("opacity",.5).filter(function(a){return a.properties.code===k.code}).attr("opacity",1).each(c),aQ.attr("display","block")):j?(b=g,aW="region",aM.attr("opacity",.5).filter(function(a){return a.properties.code===j.code}).attr("opacity",1).each(c),aQ.attr("display","block")):(b=f,aW=void 0),d=a0(d,b),aS=aR.selectAll(".ventaglio").data(d,function(a){return a.code}).join("g").attr("class","ventaglio").classed("overlapping",!1).on("click",function(a,b){if("municipality"===aW)console.log("Clicked.",b),p(void 0);else if("province"===aW){var c=b.code,d=b.label,e={code:c,label:d};p(e)}else if("region"===aW){var f=b.code,g=b.label,h={code:f,label:g};o(h)}else{var i=b.code,j=b.label,k={code:i,label:j};m(k)}}).each(function(a){X(a,n.Ys(this))}),a_()};function a$(a){aJ.attr("transform",a);var b=a.x,c=a.y,d=a.k;aT=b,aU=c,aV=d,document.documentElement.style.setProperty("--stroke-width",1/d),aS.attr("transform",function(a){return"translate(".concat(a.x,", ").concat(a.y,") scale(").concat(1/(d>=35?35:d),")")})}function a_(){aS.attr("transform",function(a){return"translate(".concat(a.x,", ").concat(a.y,") scale(").concat(1/(aV>=35?35:aV),")")})}function a0(a,b){return a.forEach(function(a){var c=b.find(function(b){return b.properties.code===a.code});if(c){var d=aG(c.properties.centroid.coordinates);a.x=d[0],a.y=d[1]}a.maxRadius=aX(a.maxValue),a.history.forEach(function(a){var b=a.groups;a.groups.forEach(function(c,d){c.innerRadius=0===d?0:a.groups[d-1].outerRadius,c.outerRadius=aX(c.value),c.valueDelta=0==d?c.value:c.value-b[d-1].value})})}),a}function a1(a){aW&&"region"!==aW&&(a.classed("overlapping",!1),a.selectAll(".bubble").attr("display","none"),a.selectAll("*:not(.bubble)").attr("display","block"),a.each(function(b){var c=this;a.each(function(a){if(a!==b){var d=a2([b.x,b.y],[a.x,a.y]),e=b.history.slice(-1)[0].groups.slice(-1)[0].outerRadius,f=a.history.slice(-1)[0].groups.slice(-1)[0].outerRadius,g=(e+f)/aV*.7;if(d<g){var h,i=n.Ys(c),j=n.Ys(this);if(i.classed("overlapping")||j.classed("overlapping"))return;(h=b.maxValue<a.maxValue?n.Ys(c):n.Ys(this)).classed("overlapping",!0),h.selectAll(".bubble").attr("display","block"),h.selectAll("*:not(.bubble)").attr("display","none")}}})}))}function a2(a,b){var c=(0,i.Z)(a,2),d=c[0],e=c[1],f=(0,i.Z)(b,2),g=f[0],h=f[1],j=g-d,k=h-e;return Math.sqrt(j*j+k*k)}var a3=c(7820),a4=c.n(a3),a5=c(6968);function a6(){return(0,d.jsxs)("div",{className:p()(a4().fetching,"position-absolute","top-50","start-50","translate-middle","d-flex","flex-column","justify-content-center","align-items-center","w-100","h-100"),children:[(0,d.jsx)(a5.Z,{variant:"blue-jeans",animation:"border",role:"status",size:"sm",children:(0,d.jsx)("span",{className:"visually-hidden",children:"Loading..."})}),(0,d.jsx)("p",{className:p()("position-relative"),style:{color:"var(--bs-blue-jeans)"},children:"Fetching Data"})]})}function a7(a){var b=a.ventagli,c=a.lvl4,e=a.lvl6,f=a.lvl8,g=a.selectedRegion,h=a.selectedProvince,i=a.selectedMunicipality,j=a.setSelectedRegion,k=a.setSelectedProvince,m=a.setSelectedMunicipality,n=a.typology,o=a.dateFrom,q=a.dateTo,r=a.isFetching,s=(0,l.useRef)(),t=b.data,u=b.extent;return(0,l.useEffect)(function(){aY(s.current,{data:t,extent:u,lvl4:c,lvl6:e,lvl8:f,selectedRegion:g,selectedProvince:h,selectedMunicipality:i,setSelectedRegion:j,setSelectedProvince:k,setSelectedMunicipality:m,typology:n,dateFrom:o,dateTo:q})},[]),(0,l.useEffect)(function(){aZ({data:t,extent:u,lvl4:c,lvl6:e,lvl8:f,selectedRegion:g,selectedProvince:h,selectedMunicipality:i,setSelectedRegion:j,setSelectedProvince:k,setSelectedMunicipality:m,typology:n,dateFrom:o,dateTo:q})},[b,g,h,i]),(0,d.jsxs)("div",{className:p()(aB().map,"position-relative"),children:[(0,d.jsx)("svg",{ref:s,children:(0,d.jsxs)("linearGradient",{id:"tick-background",x1:"50%",y1:"0%",x2:"50%",y2:"100%",children:[(0,d.jsx)("stop",{offset:"0%",stopColor:"rgb(255,255,255)",stopOpacity:"0.75"}),(0,d.jsx)("stop",{offset:"100%",stopColor:"rgb(255,255,255)",stopOpacity:"0"})]})}),r&&(0,d.jsx)(a6,{})]})}var a8=c(8565),a9=a8.DateTime,ba=a8.Interval,bb="https://wlm.inmagik.com",bc=function(a,b,c,d){var e=a.selectedRegion,f=a.selectedProvince,g=a.selectedMunicipality,h=a.typology,j=a.dateFrom,k=a.dateTo;d(!0);var l=bb,m=bb;if(g?(l+="/api/municipality/".concat(g.code,"/wlm/"),m+="/api/municipality/".concat(g.code,"/wlm/")):f?(l+="/api/province/".concat(f.code,"/wlm-areas/"),m+="/api/province/".concat(f.code,"/wlm/")):e?(l+="/api/region/".concat(e.code,"/wlm-areas/"),m+="/api/region/".concat(e.code,"/wlm/")):(console.log("all Italian regions"),console.info("No endopoint for retrieving all italian regions at once"),l=void 0,d(!1)),l){var o,p,q=a9.fromISO(j),r=a9.fromISO(k),s=ba.fromDateTimes(q,r),t=15;31>=Math.ceil(s.length("days")/1)?(p="days",o=1):Math.ceil(s.length("days")/5)<=t?(p="days",o=5):Math.ceil(s.length("days")/10)<=t?(p="days",o=10):Math.ceil(s.length("months")/1)<=t?(p="months",o=1):Math.ceil(s.length("months")/3)<=t?(p="months",o=3):Math.ceil(s.length("months")/4)<=t?(p="months",o=4):Math.ceil(s.length("months")/6)<=t?(p="months",o=6):(p="years",o=1);var u={step_size:o,step_unit:p};u.date_from=j,u.date_to=k,h&&(u.typology=h.label),u.format="json";var v=new URLSearchParams(u).toString();l+="?"+v,m+="?"+v,Promise.all([(0,n.AVB)(l),(0,n.AVB)(m)]).then(function(a){var e=(0,i.Z)(a,2),f=e[0],g=e[1];f.data.forEach(function(a){a.history.forEach(function(a){a.groups.reverse()})}),f.data.sort(function(a,b){var c=a.history.slice(-1)[0].groups.slice(-1)[0].value;a.maxValue=c;var d=b.history.slice(-1)[0].groups.slice(-1)[0].value;return b.maxValue=d,d-c}),b(f),g.data.forEach(function(a){a.history.forEach(function(a){a.groups.reverse()})}),c(g),d(!1)})}},bd=[{label:"All monuments"},{label:"Fortificazioni"},{label:"Quasi tutti"},{label:"Una piccola parte"}],be=function(){var a=(0,m.useRouter)().asPath,b=(0,l.useState)(!0),c=b[0],e=b[1],f=(0,l.useState)(!1),g=f[0],h=f[1],j=(0,l.useState)(),o=j[0],q=j[1],r=(0,l.useState)(),s=r[0],t=r[1],u=(0,l.useState)(),v=u[0],w=u[1],x=(0,l.useState)([]),y=x[0],z=x[1],A=(0,l.useState)([]),E=A[0],F=A[1],G=(0,l.useState)([]),H=G[0],I=G[1],J=(0,l.useState)([]),K=J[0],L=J[1],M=(0,l.useState)([]),N=M[0],O=M[1],P=(0,l.useState)([]),Q=P[0],R=P[1],S=(0,l.useState)([]),T=S[0],U=S[1],V=(0,l.useState)(),W=V[0],X=V[1],Y=(0,l.useState)(),Z=Y[0],$=Y[1],_=(0,l.useState)(),aa=_[0],ab=_[1],ac=(0,l.useState)(),ad=ac[0],ae=ac[1],af=(0,l.useState)("2012-09-01"),ag=af[0],ah=af[1],ai=(0,l.useState)("2022-09-01"),aj=ai[0],ak=ai[1];(0,l.useEffect)(function(){Promise.all([n.AVB("https://wlm.inmagik.com/api/region/geo/?format=json")]).then(function(b){var c=(0,i.Z)(b,1)[0],d=bd;U(d),z(c.features);var f=c.features.map(function(a){return{label:a.properties.name,code:a.properties.code}});L(f);var g=a.split("#")[1],h={};g&&(h=Object.fromEntries(g.split("&").map(function(a){return a.split("=").map(function(a){return decodeURIComponent(a)})})));var j=h.typology,k=h.dateFrom,l=h.dateTo,m=h.selectedRegion,o=h.selectedProvince,p=h.selectedMunicipality;if(j&&ae(d.find(function(a){return a.label===j})),k&&ah(k),l&&ak(l),m){var q=f.find(function(a){return a.label===m});X(q),n.AVB("https://wlm.inmagik.com/api/region/".concat(q.code,"/areas/?format=json")).then(function(a){F(a.features);var b=a.features.map(function(a){return{label:a.properties.name,code:a.properties.code}});if(O(b),o){var c=b.find(function(a){return a.label===o});$(c),n.AVB("https://wlm.inmagik.com/api/province/".concat(c.code,"/areas/?format=json")).then(function(a){I(a.features);var b=a.features.map(function(a){return{label:a.properties.name,code:a.properties.code}});R(b),p&&ab(b.find(function(a){return a.label===p})),e(!1)})}else e(!1)})}else e(!1)})},[]),(0,l.useEffect)(function(){W&&!c?n.AVB("https://wlm.inmagik.com/api/region/".concat(W.code,"/areas/?format=json")).then(function(a){F(a.features),O(a.features.map(function(a){return{label:a.properties.name,code:a.properties.code}}))}):(F([]),O([]))},[W]),(0,l.useEffect)(function(){Z&&!c?n.AVB("https://wlm.inmagik.com/api/province/".concat(Z.code,"/areas/?format=json")).then(function(a){I(a.features),R(a.features.map(function(a){return{label:a.properties.name,code:a.properties.code}}))}):(I([]),R([]))},[Z]),(0,l.useEffect)(function(){if(s){var a=s.extent.map(function(a){var b=!0;return v&&(b=v.find(function(b){return b.label===a.label}).active),{label:a.label,active:b}});w(a)}},[s]),(0,l.useEffect)(function(){var a={},b={};W&&(a.selectedRegion=encodeURIComponent(W.label),b.selectedRegion=W),Z&&(a.selectedProvince=encodeURIComponent(Z.label),b.selectedProvince=Z),aa&&(a.selectedMunicipality=encodeURIComponent(aa.label),b.selectedMunicipality=aa),ad&&(a.typology=encodeURIComponent(ad.label),b.typology=ad),ag&&(a.dateFrom=encodeURIComponent(ag),b.dateFrom=ag),aj&&(a.dateTo=encodeURIComponent(aj),b.dateTo=aj);var d=[];for(var e in a)d.push(e+"="+a[e]);var f="#"+d.join("&");location.replace(f),c||bc(b,q,t,h)},[W,Z,aa,ad,ag,aj,c]);var al=(0,l.useMemo)(function(){if(v&&o){var a=JSON.parse(JSON.stringify(o));return v.filter(function(a){return!a.active}).forEach(function(b){a.data.forEach(function(a){a.history.forEach(function(a){var c=a.groups,d=c.find(function(a){return a.label===b.label}),e=c.indexOf(d);e> -1&&c.splice(e,1)})});var c=a.extent.find(function(a){return a.label===b.label}),d=a.extent.indexOf(c);d> -1&&a.extent.splice(d,1)}),a}},[v,o]);return(0,d.jsx)(B.Z,{className:p()(k().vizController),fluid:!0,children:(0,d.jsxs)(C.Z,{className:p()("h-100"),children:[(0,d.jsx)(D.Z,{className:p()("h-100","pe-0"),md:3,xl:3,children:(0,d.jsx)(az,{regions:{items:K,disabled:!K.length},selectedRegion:W,setSelectedRegion:X,provinces:{items:N,disabled:!N.length},selectedProvince:Z,setSelectedProvince:$,municipalities:{items:Q,disabled:!Q.length},selectedMunicipality:aa,setSelectedMunicipality:ab,typologiesList:T,typology:ad,setTypology:ae,dateFrom:ag,setDateFrom:ah,dateTo:aj,setDateTo:ak,parentData:s,filterData:v,setFilterData:w})}),(0,d.jsx)(D.Z,{className:p()("h-100","position-relative"),children:(0,d.jsxs)(d.Fragment,{children:[!c&&al&&(0,d.jsx)(a7,{ventagli:al,lvl4:y,lvl6:E,lvl8:H,selectedRegion:W,setSelectedRegion:X,selectedProvince:Z,setSelectedProvince:$,selectedMunicipality:aa,setSelectedMunicipality:ab,typology:ad,dateFrom:ag,dateTo:aj,isFetching:g}),c&&(0,d.jsx)(a6,{})]})})]})})};function bf(){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(f(),{children:(0,d.jsx)("title",{children:"Home"})}),(0,d.jsx)(be,{})]})}},7211:function(a){a.exports={areaChart:"AreaChart_areaChart__qAbnb"}},7820:function(a){a.exports={fetching:"Fetching_fetching__EY3MZ",bgAnimation:"Fetching_bgAnimation__x3WK0"}},8576:function(a){a.exports={map:"MapVentagli_map__NmyTz"}},453:function(a){a.exports={btnWlm:"NavMenu_btnWlm___ociY"}},2371:function(a){a.exports={navbar:"Navigation_navbar__clCa1",logo:"Navigation_logo__AbP0d",item:"Navigation_item__j_Te9",specificPage:"Navigation_specificPage__k2gFH"}},1174:function(a){a.exports={toolBar:"UI-Components_toolBar__KROSq",btnWlm:"UI-Components_btnWlm__51KGY"}},8804:function(a){a.exports={vizController:"VisualizationController_vizController__KxPt2"}},2846:function(a){a.exports={group:"WhatsNew_group__mJ_bs",bar:"WhatsNew_bar__Y8vj9",amount:"WhatsNew_amount__QWQbL",explained:"WhatsNew_explained__LsAxI"}}},function(a){a.O(0,[556,13,225,549,381,333,742,774,888,179],function(){var b;return a(a.s=5557)}),_N_E=a.O()}])