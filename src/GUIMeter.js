var CASTORGUI = CASTORGUI || {};

(function() {
   
	CASTORGUI.GUIMeter = function (id, options, guimanager, callback, append) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.meter = null
		this.id = id;	
		this.className = options.className || null;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.meterPosition = {x:options.x, y:options.y};
		this.meterSize = {width:options.w, height:options.h};	 
		this.border =  options.border || 0;
		this.background = options.background || "rgba(0, 0, 0, 0.2)";
		this.backgroundValue = options.backgroundValue || "#1e9100";
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
		this.meter = document.createElement("meter");
		this.meter.min= this.min;
		this.meter.max= this.max;
		this.meter.value= this.value;
		this.meter.style.width = this.meterSize.width+"px";
		this.meter.style.height = this.meterSize.height+"px";		
		this.meter.style.top = (this.meterPosition.y + this.getCanvasOrigine().top)+"px";
		this.meter.style.left = (this.meterPosition.x + this.getCanvasOrigine().left)+"px";
		this.meter.style.position = "absolute";
		this.meter.id = this.id;	
		this.meter.name = this.id;	
		this.meter.className = this.className;
		this.meter.style.zIndex = this.zIndex;
		if(this.orient == "vertical" || this.orient == "Vertical") {
			this.meter.style.writingMode = "bt-lr";
			this.meter.style.WebkitAppearance = "meter-vertical";
		}	
		this.meter.onchange = this.onChangeMeter;
		
		var cssMeter = "#"+this.id+" {"+
			"border:"+this.border+";"+
			"border-radius:"+this.borderRadius+";"+
			"background-color:"+this.background+";"+
		"} #"+this.id+"::after {"+ 		
			"border:"+this.border+";"+
			"border-radius:"+this.borderRadius+";"+
			"background-color:"+this.backgroundValue+";"+
		"} #"+this.id+"::-webkit-progress-bar {"+ 
			"border:"+this.border+";"+
			"border-radius:"+this.borderRadius+";"+
			"background-color:"+this.background+";"+
		"} #"+this.id+"::-webkit-progress-value {"+  
			"border:"+this.border+";"+
			"border-radius:"+this.borderRadius+";"+
			"background-color:"+this.backgroundValue+";"+
		"} #"+this.id+"::-moz-progress-bar {"+
			"border:"+this.border+";"+
			"border-radius:"+this.borderRadius+";"+
			"background-color:"+this.background+";"+
		"}";
		this.addStyle(cssMeter);
		
		if(append == true) {
			this.html.appendChild(this.meter);
		} else {
			element.appendChild(this.meter);
		}
		this.guiElements.push(this.meter);
    };

	CASTORGUI.GUIMeter.prototype.updateValue = function(value) {
		this.meter.value = value;
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
