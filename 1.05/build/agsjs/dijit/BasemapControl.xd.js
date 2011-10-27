/** built on 2011-10-27 */ 
dojo._xdResourceLoaded(function(){ return {  
depends: [["provide", "agsjs.dijit.BasemapControl"] 
,['require','dijit.layout.TabContainer'],['require','dijit.layout.ContentPane'] 
],defineResource: function(dojo) { 
dojo.provide("agsjs.dijit.BasemapControl");dojo.require("dijit._Widget");dojo.require("dijit.layout.TabContainer");dojo.require("dijit.layout.ContentPane");dojo.require("dijit.form.Slider");
dojo.declare("agsjs.dijit.BasemapControl",[dijit._Widget],{maps:null,basemaps:null,_selectedBase:null,constructor:function(b){b=b||{};if(!b.map)throw new Error("no map defined in params for TOC");dojo.mixin(this,b);this._init()},_init:function(){dojo.forEach(this.basemaps,function(b,a){if(b.selected)this._selectedBase=b;b._refs=[];b._bases=[];var c=false;dojo.forEach(b.layers,function(e,h){if(!e.id)e.id="basemap_"+a+"_"+h;e.visible=e.visible||false;if(e.isReference)b._refs.push(e);else{b._bases.push(e);
if(e.visible)c=true}},this);if(!c)b._bases[0].visible=true},this);if(!this._selectedBase){this._selectedBase=this.basemaps[0];this._selectedBase.selected=true}this.map.layerIds.length==0&&this._selectedBase&&this._selectBase(this._selectedBase,true);this.loaded=true;this.onLoad()},postCreate:function(){this._createUI()},_selectBase:function(b,a){if(!(!a&&b==this._selectedBase)){this._selectedBase=b;this._removeBaseLayers();this._addBaseLayers(b._refs);this._addBaseLayers(b._bases)}},_addBaseLayers:function(b){var a;
dojo.forEach(b,function(c){a=c._layer;if(!a){a=this._createLayer(c);c._layer=a}if(a)if(c.isReference){a._isReference=true;this.map.addLayer(a)}else{a._isBaseMap=true;if(a==this._googleLayer||a==this._bingLayer){if(!a._addedToMap){this.map.addLayer(a,0);a._addedToMap=true}if(c.visible&&a==this._googleLayer){a.setMapTypeId(c._subtype);c.styles?a.setMapStyles(c.styles):a.setMapStyles(null)}}else this.map.addLayer(a,0)}},this)},_removeBaseLayers:function(){var b=[];dojo.forEach(this.map.layerIds,function(a){a=
this.map.getLayer(a);if(a._isBaseMap||a._isReference)b.push(a)},this);b.length>0&&dojo.forEach(b,function(a){try{if(a==this._googleLayer||a==this._bingLayer)a._addedToMap=false;this.map.removeLayer(a)}catch(c){console&&console.error(c)}},this)},_createLayer:function(b){var a=null,c=b.type||"ArcGISTiled";if(c.indexOf("GoogleMaps")==0)a=this._createGoogleLayer(b);else if(c.indexOf("BingMaps")==0)a=this._createBingLayer(b);else switch(c){case "OpenStreetMap":a=new esri.layers.OpenStreetMapLayer(b);break;
case "ArcGISTiled":a=new esri.layers.ArcGISTiledMapServiceLayer(b.url,b);break}return a},_createGoogleLayer:function(b){if(!(agsjs&&agsjs.layers&&agsjs.layers.GoogleMapsLayer))throw"use dojo.require('agsjs.layers.GoogleMapsLayer') before using this widget";var a={GoogleMapsRoadMap:agsjs.layers.GoogleMapsLayer.MAP_TYPE_ROADMAP,GoogleMapsSatellite:agsjs.layers.GoogleMapsLayer.MAP_TYPE_SATELLITE,GoogleMapsHybrid:agsjs.layers.GoogleMapsLayer.MAP_TYPE_HYBRID,GoogleMapsTerrain:agsjs.layers.GoogleMapsLayer.MAP_TYPE_TERRAIN}[b.type];
b._subtype=a;if(this._googleLayer){if(b.visible){this._googleLayer.setMapTypeId(a);this._googleLayer.show()}}else{this._googleLayer=new agsjs.layers.GoogleMapsLayer(dojo.mixin({mapOptions:{mapTypeId:a}},b));dojo.connect(this._googleLayer,"onStreetViewVisibilityChange",this,function(c){c?esri.hide(this.domNode):esri.show(this.domNode)});this.onGoogleMapsLayerCreate(this._googleLayer)}return this._googleLayer},onGoogleMapsLayerCreate:function(){},_createBingLayer:function(b){var a={BingMapsRoad:esri.virtualearth.VETiledLayer.MAP_STYLE_ROAD,
BingMapsAerial:esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL,BingMapsHybrid:esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS}[b.type];b._subtype=a;if(this._bingLayer){if(b.visible){this._bingLayer.setMapStyle(a);this._bingLayer.show()}}else{this._bingLayer=new esri.virtualearth.VETiledLayer(dojo.mixin({mapStyle:a},b));this.onBingMapsLayerCreate(this._bingLayer)}return this._bingLayer},onBingMapsLayerCreate:function(){},_switchLayer:function(b,a,c){var e=this._selectedBase,h=false;dojo.forEach(e._refs,
function(d){if(d.name==b){d.visible=!d.visible;d._layer&&d._layer.setVisibility(d.visible);h=true}},this);if(!h){dojo.forEach(e._bases,function(d){if(d.name!=b&&d.name!=a){d.visible=false;d._layer&&d._layer.hide()}});dojo.forEach(e._bases,function(d){if(d.name==b||d.name==a){var f=d._layer;if(f==this._googleLayer){f.setMapTypeId(d._subtype);d.styles?f.setMapStyles(d.styles):f.setMapStyles(null)}else f==this._bingLayer&&f.setMapStyle(d._subtype);if(!f.visible){f.show();d.visible=true}d.name==b?f.setOpacity(c):
f.setOpacity(1-c)}},this)}},onLoad:function(){},_createBasemapUI:function(b){var a=new dijit.layout.ContentPane({title:b.title,selected:b.selected});dojo.forEach(b._refs,function(g){var i;if(dijit.form&&dijit.form.CheckBox){i=new dijit.form.CheckBox({value:g.name,checked:g.visible});i.placeAt(a.domNode)}else i=dojo.create("input",{type:"checkbox",value:g.name},a.domNode);i.checked=g.visible;a.domNode.appendChild(dojo.doc.createTextNode(g.name))});b._refs.length>0&&dojo.create("br",null,a.domNode);
if(b.slider!=undefined){for(var c=b._bases.length,e=c-1,h=e;h>=0;h--)if(b._bases[h].visible){e=h;break}e=dojo.mixin({showButtons:false,style:"width:95%; margin-top:6px",maximum:c-1,value:e},b.slider);var d=[];dojo.forEach(b._bases,function(g){d.push(g.name)});var f={labels:d,container:"bottomDecoration",count:c,style:"height:0.5em;font-size:75%"};h=dojo.create("div",{},a.domNode);c=new dijit.form.HorizontalRule(f,dojo.create("div",{style:{height:"2px"}},h));f=new dijit.form.HorizontalRuleLabels(f,
dojo.create("div",{style:{height:"2px"}},h));e=new dijit.form.HorizontalSlider(e,h);e.startup();c.startup();f.startup();dojo.connect(e,"onChange",this,this._onSliderChanged)}else{var j={};dojo.forEach(b._bases,function(g){if(!j[g.name]){var i=null;if(dijit.form&&dijit.form.RadioButton){i=new dijit.form.RadioButton({name:b.title,value:g.name,checked:g.visible});i.placeAt(a.domNode)}else{i=dojo.create("input",{type:"radio",name:b.title,value:g.name},a.domNode);i.checked=g.visible}a.domNode.appendChild(dojo.doc.createTextNode(g.name));
j[g.name]=i}})}dojo.connect(a,"onClick",this,this._onTabClicked);return a},_createUI:function(){if(this.basemaps.length==1&&this.noTabs){var b=this._createBasemapUI(this.basemaps[0]);dojo.addClass(b.domNode,"dijitTabPaneWrapper");b.domNode.style.borderWidth="1px";b.domNode.style.borderStyle="solid";b.placeAt(this.domNode);b.startup()}else{var a=new dijit.layout.TabContainer({doLayout:false});this._onTabChangeHandle=dojo.connect(a,"selectChild",this,this._onTabChangeHandler);dojo.forEach(this.basemaps,
function(c){c=this._createBasemapUI(c);a.addChild(c)},this);a.placeAt(this.domNode);a.startup()}dojo.addClass(this.domNode,"agsBasemapControl")},_onTabChangeHandler:function(b){dojo.every(this.basemaps,function(a){if(a.title==b.title){this._selectBase(a);return false}return true},this)},_onTabClicked:function(b){b=b.target;if(b.tagName=="INPUT"){var a=dijit.getEnclosingWidget(b);a&&(a.declaredClass=="dijit.form.CheckBox"||a.declaredClass=="dijit.form.RadioButton")?this._switchLayer(a.value):this._switchLayer(b.value)}},
_onSliderChanged:function(b){var a=this._selectedBase._bases,c=Math.floor(b);this._switchLayer(a[c].name,a[Math.min(a.length-1,c+1)].name,1-(b-c))},destroy:function(){dojo.disconnect(this._onTabChangeHandle)}});
}};}); 
