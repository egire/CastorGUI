var CASTORGUI = CASTORGUI || {};

(function() {
   
	CASTORGUI.GUISlider = function (id, options, guimanager, callback, append) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;		
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.sliderPosition = {x:options.x, y:options.y};
		this.sliderSize = {width:options.w, height:options.h};	
		this.min = options.min || 0;
		this.max = options.max || 100;
		this.stip = options.stip || 1;
		this.value = options.value || (this.max/2);
		this.zIndex = options.zIndex || 1;
		this.orient = options.orient || "";// "vertical"
		this.sliderVisible = true;
		this.onChangeSlider = callback || false;
		
		if(append == true) {
			this.addElement(append);
		}	
	};

	Extends(CASTORGUI.GUITextarea, CASTORGUI.GUIManager);
	
	CASTORGUI.GUITextarea.prototype.addElement = function(append, element)  {
		var slider = document.createElement("x");
		slider.type= "range";
		slider.min= this.min;
		slider.max= this.max;
		slider.stip = this.stip;
		slider.style.width = this.sliderSize.width+"px";
		slider.style.height = this.sliderSize.height+"px";		
		slider.style.top = (this.sliderPosition.y + this.getCanvasOrigine().top)+"px";
		slider.style.left = (this.sliderPosition.x + this.getCanvasOrigine().left)+"px";
		slider.style.position = "absolute";
		slider.id = this.id;	
		slider.name = this.id;	
		slider.style.zIndex = this.zIndex;
		if(this.orient == "vertical") {
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

	CASTORGUI.GUITextarea.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUITextarea.prototype.setVisible = function(bool) {
		var display;
		if(bool == true) {
			display = "block";
			this.sliderVisible = true;
		} else {
			display = "none";
			this.sliderVisible = false;
		}
		this.getElementById(this.id).css.display = display;
    };

    CASTORGUI.GUITextarea.prototype.isVisible = function() {
		return this.sliderVisible;
    };

})();
