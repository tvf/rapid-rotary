parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ZCfc":[function(require,module,exports) {
function t(t,a,e,n){var r=Math.sqrt(a.x*a.x+a.y*a.y),i=Math.atan2(a.y,a.x);t.beginPath();var c=i+n*e,o=i-n*e;t.arc(0,0,r+e,o,c,!1),t.arc(r*Math.cos(c),r*Math.sin(c),e,c,c+Math.PI,!1),r-e>0&&t.arc(0,0,r-e,c,o,!0),t.arc(r*Math.cos(o),r*Math.sin(o),e,o-Math.PI,o,!1)}function a(a,e){a.resetTransform(),a.clearRect(0,0,480,480),a.translate(240,240),a.scale(200,-200);for(var n=1,r=!0;n>0;)a.fillStyle="rgb("+(r?255:0)+", 0, 0)",t(a,{x:.3,y:.3},n,Math.PI),a.fill(),n-=.05,r=!r;a.beginPath(),a.arc(0,0,1,0,2*Math.PI,!0),a.strokeStyle="rgb(255, 255, 255)",a.lineWidth=.01,a.stroke()}function e(){var t=document.getElementById("simulation");a(t.getContext("2d"),{theta:0,x:20,y:10}),t.addEventListener("mousemove",function(a){t.getBoundingClientRect()})}e();
},{}]},{},["ZCfc"], null)
//# sourceMappingURL=https://tvf.github.io/rapid-rotary/main.04fc11cd.js.map