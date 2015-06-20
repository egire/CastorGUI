var CASTORGUI = CASTORGUI || {};

(function() {
   
	CASTORGUI.GUIProgress = function (id, options, guimanager, callback, append) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;		
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.progressPosition = {x:options.x, y:options.y};
		this.progressSize = {width:options.w, height:options.h};	
		this.min = options.min || 0;
		this.max = options.max || 100;
		this.value = options.value || 0;
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
		var progress = document.createElement("progress");
		progress.min= this.min;
		progress.max= this.max;
		progress.value= this.value;
		progress.style.width = this.progressSize.width+"px";
		progress.style.height = this.progressSize.height+"px";		
		progress.style.top = (this.progressPosition.y + this.getCanvasOrigine().top)+"px";
		progress.style.left = (this.progressPosition.x + this.getCanvasOrigine().left)+"px";
		progress.style.position = "absolute";
		progress.id = this.id;	
		progress.name = this.id;	
		progress.style.zIndex = this.zIndex;
		if(this.orient == "vertical" || this.orient == "Vertical") {
			progress.style.writingMode = "bt-lr";
			progress.style.WebkitAppearance = "progress-vertical";
		}	
		progress.onchange = this.onChangeProgress;
		
		if(append == true) {
			this.html.appendChild(progress);
		} else {
			element.appendChild(progress);
		}
		this.guiElements.push(progress);
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
