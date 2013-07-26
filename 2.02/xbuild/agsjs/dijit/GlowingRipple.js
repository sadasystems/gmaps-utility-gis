/*built on 2012-07-23 15:57:48.57*/ 
define('agsjs/dijit/GlowingRipple',['dojo','dijit','dojox' ], function(dojo,dijit,dojox){ 
dojo.provide("agsjs.dijit.GlowingRipple");
dojo.declare("agsjs.dijit.GlowingRipple",null,{_graphic:null,_intervalId:null,map:null,maxSize:48,minSize:16,color:[0,100,0,0.25],interval:100,outlineWidth:4,stepSize:4,constructor:function(a){a=a||{};if(!a.map)throw new Error("no map defined in params");dojo.mixin(this,a);this.alphaStep=this.maxSize==this.minSize?0:(1-this.color[3])/((this.maxSize-this.minSize)/this.stepSize)},show:function(a){a||this.hide();this._intervalId&&clearInterval(this._intervalId);var b=this.minSize,c=1;this._intervalId=
setInterval(dojo.hitch(this,function(){if(b>=this.maxSize)c=-1;else if(b<=this.minSize)c=1;b+=c*this.stepSize;this.color[3]+=c*this.alphaStep;if(this._graphic){this._graphic.symbol.size=b;this._graphic.symbol.outline.color.setColor(this.color);this._graphic.setGeometry(a);this._graphic.getLayer()==null&&this.map.graphics.add(this._graphic)}else{var d=new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,b,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
new dojo.Color(this.color),this.outlineWidth),new dojo.Color([0,0,0,0]));this._graphic=new esri.Graphic(a,d,null,null);this.map.graphics.add(this._graphic)}}),this.interval)},hide:function(){if(this._intervalId){clearInterval(this._intervalId);this._intervalId=null}this._graphic&&this._graphic.getLayer()&&this.map.graphics.remove(this._graphic)},destroy:function(){this.hide();this._graphic=null}});
}); 