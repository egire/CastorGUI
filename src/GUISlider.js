var CASTORGUI = CASTORGUI || {};

(function() {
   
	CASTORGUI.GUISlider = function (id, options, guimanager, callback, append) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;	
		this.className = options.className || null;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.sliderPosition = {x:options.x, y:options.y};
		this.sliderSize = {width:options.w, height:options.h};	
		this.min = options.min || 0;
		this.max = options.max || 100;
		this.stip = options.stip || 1;
		this.value = options.value || (this.max/2);
		this.zIndex = options.zIndex || 1;
		this.orient = options.orient || "horizontal"; // or "vertical"
		this.sliderVisible = true;
		this.onChangeSlider = callback || false;
		
		if(append == true) {
			this.addElement(append);
		}	
	};

	Extends(CASTORGUI.GUISlider, CASTORGUI.GUIManager);
	
	CASTORGUI.GUISlider.prototype.addElement = function(append, element)  {
		var slider = document.createElement("input");
		slider.type= "range";
		slider.min= this.min;
		slider.max= this.max;
		slider.value= this.value;
		slider.stip = this.stip;
		slider.className = this.className;
		slider.style.width = this.sliderSize.width+"px";
		slider.style.height = this.sliderSize.height+"px";		
		slider.style.top = (this.sliderPosition.y + this.getCanvasOrigine().top)+"px";
		slider.style.left = (this.sliderPosition.x + this.getCanvasOrigine().left)+"px";
		slider.style.position = "absolute";
		slider.id = this.id;	
		slider.name = this.id;	
		slider.style.zIndex = this.zIndex;
		if(this.orient == "vertical" || this.orient == "Vertical") {
			slider.style.writingMode = "bt-lr";
			slider.style.WebkitAppearance = "slider-vertical";
		}	
		slider.onchange = this.onChangeSlider;
		
		if(append == true) {
			this.html.appendChild(slider);
		} else {
			element.appendChild(slider);
		}
		this.guiElements.push(slider);
    };	

	CASTORGUI.GUISlider.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUISlider.prototype.setVisible = function(bool, fade) {
		var display;
		if(fade == undefined) fade = true;
		var element = this.getElementById(this.id);
		if(bool == true) {
			display = "block";
			this.textVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.textVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    };

    CASTORGUI.GUISlider.prototype.isVisible = function() {
		return this.sliderVisible;
    };

})();
