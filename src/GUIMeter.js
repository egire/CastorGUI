var CASTORGUI = CASTORGUI || {};

(function() {
   
	CASTORGUI.GUIMeter = function (id, options, guimanager, callback, append) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;		
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.meterPosition = {x:options.x, y:options.y};
		this.meterSize = {width:options.w, height:options.h};	
		this.min = options.min || 0;
		this.max = options.max || 100;
		this.value = options.value || 0;
		this.zIndex = options.zIndex || 1;
		this.orient = options.orient || "horizontal"; // or "vertical"
		this.meterVisible = true;
		this.onChangeMeter = callback || false;
		
		if(append == true) {
			this.addElement(append);
		}	
	};

	Extends(CASTORGUI.GUIMeter, CASTORGUI.GUIManager);
	
	CASTORGUI.GUIMeter.prototype.addElement = function(append, element)  {
		var meter = document.createElement("meter");
		meter.min= this.min;
		meter.max= this.max;
		meter.value= this.value;
		meter.style.width = this.meterSize.width+"px";
		meter.style.height = this.meterSize.height+"px";		
		meter.style.top = (this.meterPosition.y + this.getCanvasOrigine().top)+"px";
		meter.style.left = (this.meterPosition.x + this.getCanvasOrigine().left)+"px";
		meter.style.position = "absolute";
		meter.id = this.id;	
		meter.name = this.id;	
		meter.style.zIndex = this.zIndex;
		if(this.orient == "vertical" || this.orient == "Vertical") {
			meter.style.writingMode = "bt-lr";
			meter.style.WebkitAppearance = "meter-vertical";
		}	
		meter.onchange = this.onChangeMeter;
		
		if(append == true) {
			this.html.appendChild(meter);
		} else {
			element.appendChild(meter);
		}
		this.guiElements.push(meter);
    };	

	CASTORGUI.GUIMeter.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUIMeter.prototype.setVisible = function(bool, fade) {
		var display;
		if(fade == undefined) fade = true;
		var element = this.getElementById(this.id);
		if(bool == true) {
			display = "block";
			this.meterVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.meterVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    };

    CASTORGUI.GUIMeter.prototype.isVisible = function() {
		return this.meterVisible;
    };

})();
