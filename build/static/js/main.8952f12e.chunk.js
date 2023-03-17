(this["webpackJsonpweather-app"]=this["webpackJsonpweather-app"]||[]).push([[0],{32:function(e,t,a){},34:function(e,t,a){},35:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){"use strict";a.r(t);var s=a(0),r=a.n(s),i=a(5),n=a.n(i),c=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,45)).then((function(t){var a=t.getCLS,s=t.getFID,r=t.getFCP,i=t.getLCP,n=t.getTTFB;a(e),s(e),r(e),i(e),n(e)}))},o=a(17),l=a(25),d=a(9),h=a(10),m=a(3),u=a(11),p=a(12),g=a(23),b=a.n(g),j=(a(32),a(1)),f="";var v=function(e){var t=Object(s.useState)(""),a=Object(o.a)(t,2),r=a[0],i=a[1],n=Object(s.useCallback)(b()((function(){""!==f?fetch("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json").then((function(e){if(e.ok)return e.json();throw new Error("Something went wrong ...")})).then((function(e){var t=e,a=f.replace(/[^a-zA-Z0-9\u0410-\u042f\u0430-\u044f\s]/g,""),s=t.filter((function(e){var t=new RegExp("^".concat(a),"gi");return e.name.match(t)}));i(s)})):i("")}),250));return Object(j.jsxs)("header",{className:"header",children:[Object(j.jsx)("h1",{className:"page-name",children:"MyWeather"}),Object(j.jsxs)("div",{className:"header-main",children:[Object(j.jsxs)("div",{className:"search-block",children:[Object(j.jsx)("input",{onBlur:function(e){var t=document.getElementById("search-list");e.relatedTarget&&(e.relatedTarget&&"search-list"===e.relatedTarget.id||"search-item"===e.relatedTarget.className)?e.preventDefault():(t.classList.remove("cities-list-after"),t.classList.add("cities-list-before"))},onKeyUp:function(e){f=e.target.value;var t=document.getElementById("search-list");""!==e.target.value?(t.classList.remove("cities-list-before"),t.classList.add("cities-list-after")):(t.classList.remove("cities-list-after"),t.classList.add("cities-list-before")),n()},onKeyDown:e.enterClick,placeholder:"Enter city",className:"search-input"}),Object(j.jsx)("div",{tabIndex:"1",id:"search-list",className:"cities-list-before",children:""!==r?r.map((function(t,a){return Object(j.jsxs)("li",{tabIndex:"1",onClick:function(){e.cityItemClick(t.name)},className:"search-item",children:[t.name," (",t.country,")"]},a)})):""})]}),Object(j.jsx)("button",{onClick:e.showWeather,className:"search-btn",children:"Show weather"})]}),Object(j.jsx)("div",{className:"page-settings",children:Object(j.jsxs)("div",{className:"cels-fahr-selector",children:[Object(j.jsx)("div",{onClick:e.globalChangeTempCels,className:!1===e.globalTempConvert?"cels-block":"cels-block-after",children:Object(j.jsxs)("span",{className:"temp-item",children:[Object(j.jsx)("sup",{children:"o"}),"C"]})}),Object(j.jsx)("div",{onClick:e.globalChangeTempFahr,className:!0===e.globalTempConvert?"fahr-block":"fahr-block-after",children:Object(j.jsxs)("span",{className:"temp-item",children:[Object(j.jsx)("sup",{children:"o"}),"F"]})})]})})]})},O=(a(34),function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(e){return Object(d.a)(this,a),t.call(this,e)}return Object(h.a)(a,[{key:"render",value:function(){return Object(j.jsxs)("div",{className:this.props.cards.length>0?"display":"display-none",children:[Object(j.jsx)("div",{className:!0===this.props.loaded?"display-before":"display-after",children:Object(j.jsx)("p",{className:"starting-message",children:this.props.error?"Please enter correct city name":"Please enter a city name"})}),Object(j.jsxs)("div",{className:"display-wrapper",children:[Object(j.jsx)("div",{className:"upd-btn-wrapper",children:Object(j.jsx)("button",{onClick:this.props.updateDisplayCard,className:"update-btn",children:Object(j.jsx)("i",{className:"fas fa-sync-alt"})})}),Object(j.jsxs)("div",{className:"display-main",children:[Object(j.jsxs)("div",{className:"main",children:[Object(j.jsx)("p",{className:"city-name",children:this.props.cityName}),Object(j.jsx)("p",{className:"current-date",children:this.props.currentDate}),Object(j.jsx)("p",{className:"current-time",children:this.props.currentTime}),Object(j.jsx)("p",{className:"weather-desc",children:this.props.weatherDesc}),Object(j.jsx)("img",{alt:"weather icon",className:"weather-icon",src:this.props.iconLink})]}),Object(j.jsxs)("div",{className:"main-temp",children:[Object(j.jsxs)("div",{className:"temp-block",children:[Object(j.jsxs)("div",{className:"temperature-switch",children:[Object(j.jsxs)("button",{onClick:this.props.convertToCels,className:!1===this.props.tempConvert?"celcius-switcher":"celcius-switcher-after",children:[Object(j.jsx)("sup",{children:"o"}),"C"]}),Object(j.jsxs)("button",{onClick:this.props.convertToFahr,className:!0===this.props.tempConvert?"fahrenheit-switcher":"fahrenheit-switcher-after",children:[Object(j.jsx)("sup",{children:"o"}),"F"]})]}),Object(j.jsxs)("span",{className:"temp",children:[this.props.temperature,Object(j.jsx)("sup",{children:"o"})]}),Object(j.jsxs)("p",{className:"feelslike-temp-wrapper",children:["Feels like:",Object(j.jsxs)("span",{className:"feelslike_temp",children:[" ",this.props.feelsLikeTemp,Object(j.jsx)("sup",{children:"o"})]})]})]}),Object(j.jsxs)("div",{className:"temp-block-more",children:[Object(j.jsxs)("p",{className:"humidity",children:["Humidity: ",this.props.humidity]}),Object(j.jsxs)("p",{className:"wind-speed",children:["Wind: ",this.props.windSpeed]})]})]})]})]})]})}}]),a}(r.a.Component)),C=a(7),w=a(19),x=a(44),y=a(43),k=(a(35),function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(e){var s;return Object(d.a)(this,a),(s=t.call(this,e)).myref=r.a.createRef(),s.state={settings:!1},s.showSettings=s.showSettings.bind(Object(m.a)(s)),s}return Object(h.a)(a,[{key:"showSettings",value:function(){!1===this.state.settings?this.setState({settings:!0}):this.setState({settings:!1})}},{key:"render",value:function(){var e=this;return Object(j.jsx)("div",{className:this.props.cards.length>0?"list":"list-none",children:Object(j.jsxs)("div",{className:"list-block",children:[Object(j.jsxs)("div",{className:"settings-wrapper",children:[Object(j.jsxs)("div",{className:"settings",children:[Object(j.jsx)("h4",{className:"label",children:"Last seen"}),Object(j.jsx)("button",{onClick:this.showSettings,className:"update-settigns",children:Object(j.jsx)("i",{className:"fas fa-cog"})})]}),Object(j.jsxs)("div",{className:!0===this.state.settings?"settings-block":"settings-block-none",children:[Object(j.jsx)("h4",{className:"settings-label",children:"Automatic weather update every: "}),Object(j.jsxs)("p",{className:"radio-text",children:[Object(j.jsx)("input",{onChange:this.props.getTimeUpdate,className:"radio",id:"10min",type:"radio",name:"updtime",value:"10"}),Object(j.jsx)("label",{htmlFor:"10min",children:"10 minutes"})]}),Object(j.jsxs)("p",{className:"radio-text",children:[Object(j.jsx)("input",{onChange:this.props.getTimeUpdate,className:"radio",id:"30min",type:"radio",name:"updtime",value:"30"}),Object(j.jsx)("label",{htmlFor:"30min",children:"30 minutes"})]}),Object(j.jsxs)("p",{className:"radio-text",children:[Object(j.jsx)("input",{onChange:this.props.getTimeUpdate,className:"radio",id:"60min",type:"radio",name:"updtime",value:"60"}),Object(j.jsx)("label",{htmlFor:"60min",children:"60 minutes"})]})]})]}),Object(j.jsx)(w.a,{onDragEnd:this.props.handleOnDragEnd,children:Object(j.jsx)(w.c,{droppableId:"cards",children:function(t){return Object(j.jsxs)("div",Object(C.a)(Object(C.a)({ref:t.innerRef},t.droppableProps),{},{className:"list-app",children:[Object(j.jsx)(x.a,{children:e.props.cards.map((function(t,a){return Object(j.jsx)(y.a,{timeout:450,classNames:"item",children:Object(j.jsx)(w.b,{draggableId:t[4],index:a,children:function(a){return Object(s.createElement)("div",Object(C.a)(Object(C.a)(Object(C.a)({ref:a.innerRef},a.draggableProps),a.dragHandleProps),{},{key:t[4],className:"list-item"}),Object(j.jsxs)("div",{className:"list-item-main",children:[Object(j.jsxs)("div",{className:"main-listitem-block",children:[Object(j.jsx)("h2",{className:"card-name",children:t[0]}),Object(j.jsx)("p",{className:"description-weather",children:t[3]})]}),Object(j.jsxs)("div",{className:"listitem-description",children:[Object(j.jsxs)("p",{className:"card-temp",children:[t[1],Object(j.jsx)("sup",{children:"o"})]}),Object(j.jsxs)("p",{className:"upd-info",children:["Last update: ",t[2]]})]}),Object(j.jsx)("div",{className:"del-btn-block",children:Object(j.jsx)("button",{onClick:function(){e.props.deleteCard(t)},className:"delete-card",children:Object(j.jsx)("i",{className:"fas fa-times"})})})]}),Object(j.jsx)("button",{onClick:function(){e.props.moreInfo(t)},className:"more-info",children:"Details"}),a.placeholder)}},t[4])},a)}))}),t.placeholder]}))}})})]})})}}]),a}(r.a.Component)),N=(a(39),function(){return Object(j.jsxs)("footer",{className:"footer",children:[Object(j.jsxs)("p",{className:"footer-link",children:["Created by ",Object(j.jsx)("a",{href:"https://github.com/MotyaBolt",rel:"noreferrer",target:"_blank",className:"profile-link",children:"Matvey Boltach"})]}),Object(j.jsxs)("div",{className:"icons",children:[Object(j.jsx)("a",{className:"link",rel:"noreferrer",target:"_blank",href:"https://vk.com/lupapupa0505",children:Object(j.jsx)("i",{className:"fab fa-vk"})}),Object(j.jsx)("a",{className:"link",rel:"noreferrer",target:"_blank",href:"https://t.me/matv_money",children:Object(j.jsx)("i",{className:"fab fa-telegram"})}),Object(j.jsx)("a",{className:"link",rel:"noreferrer",target:"_blank",href:"https://github.com/MotyaBolt",children:Object(j.jsx)("i",{className:"fab fa-github"})}),Object(j.jsx)("a",{className:"link",rel:"noreferrer",target:"_blank",href:"https://codepen.io/motyabolt",children:Object(j.jsx)("i",{className:"fab fa-codepen"})}),Object(j.jsx)("a",{className:"link",rel:"noreferrer",target:"_blank",href:"https://mail.google.com/mail/u/0/#inbox?compose=new",children:Object(j.jsx)("i",{className:"far fa-envelope"})})]})]})}),T=(a(40),"b0e658f81fbdeeaa452333e7e504314a"),S=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(e){var s;return Object(d.a)(this,a),(s=t.call(this,e)).state={city:"",date:"",time:"",icon:"",description:"",temperature:"",feelsLikeTemp:"",humidity:"",wind:"",isLoaded:!1,error:null,weatherCards:[],checkedBtnId:"",tempConvert:!1,globalTempConvert:!1},s.fetchData=s.fetchData.bind(Object(m.a)(s)),s.fetchDataEnter=s.fetchDataEnter.bind(Object(m.a)(s)),s.moreInfoRequest=s.moreInfoRequest.bind(Object(m.a)(s)),s.deleteCards=s.deleteCards.bind(Object(m.a)(s)),s.updateCards=s.updateCards.bind(Object(m.a)(s)),s.getUpdateTime=s.getUpdateTime.bind(Object(m.a)(s)),s.startInterval=s.startInterval.bind(Object(m.a)(s)),s.newInterval=s.newInterval.bind(Object(m.a)(s)),s.updateDisplay=s.updateDisplay.bind(Object(m.a)(s)),s.convertToCels=s.convertToCels.bind(Object(m.a)(s)),s.convertToFahr=s.convertToFahr.bind(Object(m.a)(s)),s.cityItemClick=s.cityItemClick.bind(Object(m.a)(s)),s.globalChangeToCels=s.globalChangeToCels.bind(Object(m.a)(s)),s.globalChangeToFahr=s.globalChangeToFahr.bind(Object(m.a)(s)),s.handleOnDragEnd=s.handleOnDragEnd.bind(Object(m.a)(s)),s}return Object(h.a)(a,[{key:"componentDidMount",value:function(){var e=this;if(null!==localStorage.getItem("card")){var t=JSON.parse(localStorage.getItem("card"));this.setState({isLoaded:t.isLoaded,city:t.city,date:t.date,time:t.time,temperature:t.temperature,feelsLikeTemp:t.feelsLikeTemp,description:t.description,humidity:t.humidity,wind:t.wind,icon:t.icon,weatherCards:t.weatherCards,tempConvert:t.tempConvert,globalTempConvert:t.globalTempConvert},(function(){e.startInterval()}))}else this.startInterval()}},{key:"startInterval",value:function(){if(null!==localStorage.getItem("updatetime")){var e=localStorage.getItem("updatetime");document.querySelectorAll(".radio").forEach((function(t){t.defaultChecked=!1,t.value===e&&(t.defaultChecked=!0)})),M=6e4*e,this.updateCards(),I=setInterval(this.updateCards,M)}else{document.querySelectorAll(".radio").forEach((function(e){"10"===e.value&&(e.defaultChecked=!0,M=6e4*e.value)})),this.updateCards(),I=setInterval(this.updateCards,M)}}},{key:"updateCards",value:function(){var e=this;this.state.weatherCards.length>0&&(this.state.weatherCards.map((function(t){fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(t[0],"&appid=").concat(T)).then((function(e){if(e.ok)return e.json();throw new Error("Something went wrong ...")})).then((function(a){var s=new Date,r=0;r=s.getHours()<10?"0"+s.getHours()+":"+s.getMinutes():s.getHours()+":"+s.getMinutes(),r=s.getMinutes()<10?s.getHours()+":0"+s.getMinutes():s.getHours()+":"+s.getMinutes(),!0===e.state.globalTempConvert?t[1]=Math.round(1.8*Math.round(a.main.temp-273.15)+32):t[1]=Math.round(a.main.temp-273.15),t[2]=r,t[3]=a.weather[0].description}))})),localStorage.setItem("card",JSON.stringify(this.state)),this.updateDisplay())}},{key:"fetchData",value:function(){var e=this,t=document.querySelector(".search-input");t.blur(),""!==t.value&&fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(t.value,"&appid=").concat(T)).then((function(e){if(e.ok)return e.json();throw new Error("Something went wrong ...")})).then((function(a){var s="";if(e.state.weatherCards.map((function(t){s=e.state.weatherCards.filter((function(e){return e[0]===a.name}))})),""!==t.value&&s.length<1){e.state.weatherCards.length>2&&e.state.weatherCards.pop();var r=a.weather[0].icon,i="http://openweathermap.org/img/wn/".concat(r,".png"),n=new Date,c=0;c=n.getHours()<10?"0"+n.getHours()+":"+n.getMinutes():n.getHours()+":"+n.getMinutes(),c=n.getMinutes()<10?n.getHours()+":0"+n.getMinutes():n.getHours()+":"+n.getMinutes();var o=n.getTime()+6e4*n.getTimezoneOffset()+1e3*a.timezone,d=new Date(o),h=0;h=d.getHours()<10?"0"+d.getHours()+":"+d.getMinutes():d.getHours()+":"+d.getMinutes(),h=d.getMinutes()<10?d.getHours()+":0"+d.getMinutes():d.getHours()+":"+d.getMinutes();var m=new Intl.DateTimeFormat("en-US",{month:"long",day:"numeric"}).format(d),u=null;u=!0===e.state.globalTempConvert?Math.round(1.8*Math.round(a.main.temp-273.15)+32):Math.round(a.main.temp-273.15);var p="";p=String(a.id),e.setState({isLoaded:!0,city:a.name,date:m,time:h,description:a.weather[0].description,humidity:a.main.humidity+"%",wind:a.wind.speed+" m/s",icon:i,weatherCards:[[a.name,u,c,a.weather[0].description,p]].concat(Object(l.a)(e.state.weatherCards))}),!0===e.state.globalTempConvert?e.setState({temperature:Math.round(1.8*Math.round(a.main.temp-273.15)+32),feelsLikeTemp:Math.round(1.8*Math.round(a.main.feels_like-273.15)+32)}):e.setState({temperature:Math.round(a.main.temp-273.15),feelsLikeTemp:Math.round(a.main.feels_like-273.15)}),t.value="";var g=document.getElementById("search-list");g.classList.remove("cities-list-after"),g.classList.add("cities-list-before"),localStorage.setItem("card",JSON.stringify(e.state))}else t.value=""})).catch((function(t){e.setState({isLoaded:!1,error:t})}))}},{key:"fetchDataEnter",value:function(e){13===e.keyCode&&this.fetchData()}},{key:"moreInfoRequest",value:function(e){var t=this;fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(e[0],"&appid=").concat(T)).then((function(e){if(e.ok)return e.json();throw new Error("Something went wrong ...")})).then((function(a){var s=a.weather[0].icon,r="http://openweathermap.org/img/wn/".concat(s,".png"),i=new Date,n=0;n=i.getHours()<10?"0"+i.getHours()+":"+i.getMinutes():i.getHours()+":"+i.getMinutes(),n=i.getMinutes()<10?i.getHours()+":0"+i.getMinutes():i.getHours()+":"+i.getMinutes(),t.state.weatherCards.map((function(s){s===e&&(s[3]=a.weather[0].description,s[2]=n,!0===t.state.globalTempConvert?s[1]=Math.round(1.8*Math.round(a.main.temp-273.15)+32):s[1]=Math.round(a.main.temp-273.15))}));var c=i.getTime()+6e4*i.getTimezoneOffset()+1e3*a.timezone,o=new Date(c),l=0;l=o.getHours()<10?"0"+o.getHours()+":"+o.getMinutes():o.getHours()+":"+o.getMinutes(),l=o.getMinutes()<10?o.getHours()+":0"+o.getMinutes():o.getHours()+":"+o.getMinutes();var d=new Intl.DateTimeFormat("en-US",{month:"long",day:"numeric"}).format(o);t.setState({isLoaded:!0,city:a.name,date:d,time:l,description:a.weather[0].description,humidity:a.main.humidity+"%",wind:a.wind.speed+" m/s",icon:r,weatherCards:t.state.weatherCards}),!0===t.state.globalTempConvert?(!1===t.state.tempConvert&&t.setState({tempConvert:!0}),t.setState({temperature:Math.round(1.8*Math.round(a.main.temp-273.15)+32),feelsLikeTemp:Math.round(1.8*Math.round(a.main.feels_like-273.15)+32)})):(!0===t.state.tempConvert&&t.setState({tempConvert:!1}),t.setState({temperature:Math.round(a.main.temp-273.15),feelsLikeTemp:Math.round(a.main.feels_like-273.15)})),localStorage.setItem("card",JSON.stringify(t.state))})).catch((function(e){t.setState({isLoaded:!1,error:e})}))}},{key:"deleteCards",value:function(e){var t=this,a=this.state.weatherCards.filter((function(t){return t!==e}));if(2===this.state.weatherCards.indexOf(e)||1===this.state.weatherCards.indexOf(e)){var s=this.state.weatherCards.indexOf(e)-1,r=this.state.weatherCards[s],i=null;this.state.weatherCards.map((function(e){t.state.city===e[0]&&(i=t.state.weatherCards.indexOf(e))})),0!==i&&this.setState({city:r[0]},(function(){t.updateDisplay()}))}else if(this.state.weatherCards.length>1){var n=this.state.weatherCards.indexOf(e)+1,c=this.state.weatherCards[n],o=null;this.state.weatherCards.map((function(e){t.state.city===e[0]&&(o=t.state.weatherCards.indexOf(e))})),2!==o&&this.setState({city:c[0]},(function(){t.updateDisplay()}))}else this.setState({isLoaded:!1,error:!1});this.setState({weatherCards:a},(function(){localStorage.setItem("card",JSON.stringify(t.state))}))}},{key:"getUpdateTime",value:function(e){var t=this;this.setState({checkedBtnId:e.target.value},(function(){localStorage.setItem("updatetime",t.state.checkedBtnId)})),this.state.weatherCards.length>0&&(this.updateCards(),clearInterval(I),I="",M=6e4*e.target.value,this.newInterval())}},{key:"newInterval",value:function(){I=setInterval(this.updateCards,M)}},{key:"updateDisplay",value:function(){var e=this;fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(this.state.city,"&appid=").concat(T)).then((function(e){if(e.ok)return e.json();throw new Error("Something went wrong ...")})).then((function(t){var a=t.weather[0].icon,s="http://openweathermap.org/img/wn/".concat(a,".png"),r=new Date,i=0;i=r.getHours()<10?"0"+r.getHours()+":"+r.getMinutes():r.getHours()+":"+r.getMinutes(),i=r.getMinutes()<10?r.getHours()+":0"+r.getMinutes():r.getHours()+":"+r.getMinutes(),e.state.weatherCards.map((function(a){a[0]===e.state.city&&(a[3]=t.weather[0].description,a[2]=i,!0===e.state.globalTempConvert?a[1]=Math.round(1.8*Math.round(t.main.temp-273.15)+32):a[1]=Math.round(t.main.temp-273.15))}));var n=r.getTime()+6e4*r.getTimezoneOffset()+1e3*t.timezone,c=new Date(n),o=0;o=c.getHours()<10?"0"+c.getHours()+":"+c.getMinutes():c.getHours()+":"+c.getMinutes(),o=c.getMinutes()<10?c.getHours()+":0"+c.getMinutes():c.getHours()+":"+c.getMinutes();var l=new Intl.DateTimeFormat("en-US",{month:"long",day:"numeric"}).format(c);e.setState({isLoaded:!0,city:t.name,date:l,time:o,description:t.weather[0].description,humidity:t.main.humidity+"%",wind:t.wind.speed+" m/s",icon:s,weatherCards:e.state.weatherCards}),!0===e.state.globalTempConvert?(!1===e.state.tempConvert&&e.setState({tempConvert:!0}),e.setState({temperature:Math.round(1.8*Math.round(t.main.temp-273.15)+32),feelsLikeTemp:Math.round(1.8*Math.round(t.main.feels_like-273.15)+32)})):(!0===e.state.tempConvert&&e.setState({tempConvert:!1}),e.setState({temperature:Math.round(t.main.temp-273.15),feelsLikeTemp:Math.round(t.main.feels_like-273.15)})),localStorage.setItem("card",JSON.stringify(e.state))})).catch((function(t){e.setState({isLoaded:!1,error:t})}))}},{key:"convertToCels",value:function(e){var t=this;if(!0===this.state.tempConvert){var a=Math.round((this.state.temperature-32)/1.8),s=Math.round((this.state.feelsLikeTemp-32)/1.8);this.setState({tempConvert:!1,temperature:a,feelsLikeTemp:s},(function(){localStorage.setItem("card",JSON.stringify(t.state))}))}}},{key:"convertToFahr",value:function(e){var t=this;if(!1===this.state.tempConvert){var a=Math.round(1.8*this.state.temperature+32),s=Math.round(1.8*this.state.feelsLikeTemp+32);this.setState({tempConvert:!0,temperature:a,feelsLikeTemp:s},(function(){localStorage.setItem("card",JSON.stringify(t.state))}))}}},{key:"cityItemClick",value:function(e){document.querySelector(".search-input").value=e,this.fetchData();var t=document.getElementById("search-list");t.classList.remove("cities-list-after"),t.classList.add("cities-list-before")}},{key:"globalChangeToCels",value:function(){var e=this;if(!0===this.state.globalTempConvert&&(this.state.weatherCards.map((function(e){e[1]=Math.round((e[1]-32)/1.8)})),this.setState({globalTempConvert:!1},(function(){localStorage.setItem("card",JSON.stringify(e.state))})),!0===this.state.tempConvert)){var t=Math.round((this.state.temperature-32)/1.8),a=Math.round((this.state.feelsLikeTemp-32)/1.8);this.setState({globalTempConvert:!1,tempConvert:!1,temperature:t,feelsLikeTemp:a},(function(){localStorage.setItem("card",JSON.stringify(e.state))}))}}},{key:"globalChangeToFahr",value:function(){var e=this;if(!1===this.state.globalTempConvert&&(this.setState({globalTempConvert:!0},(function(){localStorage.setItem("card",JSON.stringify(e.state))})),this.state.weatherCards.map((function(e){e[1]=Math.round(1.8*e[1]+32)})),!0!==this.state.tempConvert)){var t=Math.round(1.8*this.state.temperature+32),a=Math.round(1.8*this.state.feelsLikeTemp+32);this.setState({globalTempConvert:!0,temperature:t,tempConvert:!0,feelsLikeTemp:a},(function(){localStorage.setItem("card",JSON.stringify(e.state))}))}}},{key:"handleOnDragEnd",value:function(e){var t=this;if(e.destination){var a=Array.from(this.state.weatherCards),s=a.splice(e.source.index,1),r=Object(o.a)(s,1)[0];a.splice(e.destination.index,0,r),this.setState({weatherCards:a},(function(){localStorage.setItem("card",JSON.stringify(t.state))}))}}},{key:"render",value:function(){return Object(j.jsxs)("div",{className:"app",children:[Object(j.jsx)(v,{globalTempConvert:this.state.globalTempConvert,globalChangeTempCels:this.globalChangeToCels,globalChangeTempFahr:this.globalChangeToFahr,cityItemClick:this.cityItemClick,enterClick:this.fetchDataEnter,showWeather:this.fetchData}),Object(j.jsxs)("div",{className:"weather-info",children:[Object(j.jsx)(k,{handleOnDragEnd:this.handleOnDragEnd,deleteCard:this.deleteCards,moreInfo:this.moreInfoRequest,cards:this.state.weatherCards,updateCard:this.updateCards,getTimeUpdate:this.getUpdateTime}),Object(j.jsx)(O,{cards:this.state.weatherCards,tempConvert:this.state.tempConvert,convertToCels:this.convertToCels,convertToFahr:this.convertToFahr,updateDisplayCard:this.updateDisplay,loaded:this.state.isLoaded,error:this.state.error,cityName:this.state.city,currentTime:this.state.time,currentDate:this.state.date,weatherDesc:this.state.description,iconLink:this.state.icon,temperature:this.state.temperature,feelsLikeTemp:this.state.feelsLikeTemp,humidity:this.state.humidity,windSpeed:this.state.wind})]}),Object(j.jsx)(N,{})]})}}]),a}(r.a.Component),M="",I="";n.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(S,{})}),document.getElementById("root")),c()}},[[41,1,2]]]);
//# sourceMappingURL=main.8952f12e.chunk.js.map