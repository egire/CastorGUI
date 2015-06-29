var CASTORGUI = CASTORGUI || {};

(function() {
   
	CASTORGUI.GUIProgress = function (id, options, guimanager, callback, append) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.progress = null;
		this.id = id;	
		this.className = options.className || "";
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.progressPosition = {x:options.x, y:options.y};
		this.progressSize = {width:options.w, height:options.h};	
		this.min = options.min || 0;
		this.max = options.max || 100;
		this.value = options.value || 0;
		this.border =  options.border || 0;
		this.background = options.background || "rgba(0, 0, 0, 0.2)";
		this.backgroundValue = options.backgroundValue || "#0f4fff";
		this.borderRadius = options.borderRadius || (options.h / 2)+"px";
		this.zIndex = options.zIndex || 1;
		this.orient = options.orient || "horizontal"; // or "vertical"
		this.progressVisible = true;
		this.onChangeProgress = callback || false;
		
		if(append == true) {
			this.addElement(append);
		}	
	};

	Extends(CASTORGUI.GUIProgress, CASTORGUI.GUIManager);
	
	CASTORGUI.GUIProgress.prototype.addElement = function(append, element)  {
		this.progress = document.createElement("progress");
		this.progress.min = this.min;
		this.progress.max = this.max;
		this.progress.value = this.value;		
		this.progress.style.width = this.progressSize.width+"px";
		this.progress.style.height = this.progressSize.height+"px";		
		this.progress.style.top = (this.progressPosition.y + this.getCanvasOrigine().top)+"px";
		this.progress.style.left = (this.progressPosition.x + this.getCanvasOrigine().left)+"px";
		this.progress.style.position = "absolute";
		this.progress.id = this.id;
		this.progress.className = this.className;	
		this.progress.name = this.id;	
		this.progress.style.zIndex = this.zIndex;
		if(this.orient == "vertical" || this.orient == "Vertical") {
			this.progress.style.writingMode = "bt-lr";
			this.progress.style.WebkitAppearance = "progress-vertical";
		}	
		
		var cssProgress = "#"+this.id+" {"+
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
		this.addStyle(cssProgress);
		
		this.progress.onchange = this.onChangeProgress;
		
		if(append == true) {
			this.html.appendChild(this.progress);
		} else {
			element.appendChild(this.progress);
		}
		this.guiElements.push(this.progress);
    };

	CASTORGUI.GUIProgress.prototype.updateValue = function(value) {
		this.progress.value = value;
	};
	
	CASTORGUI.GUIProgress.prototype.getValue = function() {
		return this.progress.value;
	};

	CASTORGUI.GUIProgress.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUIProgress.prototype.setVisible = function(bool, fade) {
		var display;
		if(fade == undefined) fade = true;
		var element = this.getElementById(this.id);
		if(bool == true) {
			display = "block";
			this.progressVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.progressVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    };

    CASTORGUI.GUIProgress.prototype.isVisible = function() {
		return this.progressVisible;
    };

})();
