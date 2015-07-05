var CASTORGUI = CASTORGUI || {};

(function() {
   
	CASTORGUI.GUISpinner = function (id, options, guimanager, callback, append) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;	
		this.className = options.className || "";
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.numberPosition = {x:options.x, y:options.y};
		this.numberSize = {width:options.w, height:options.h};	
		this.min = options.min || 0;
		this.max = options.max || 100;
		this.stip = options.stip || 1;
		this.value = options.value || (this.max/2);
		this.zIndex = options.zIndex || 1;
		this.orient = options.orient || "horizontal"; // or "vertical"
		this.numberVisible = true;
		this.onChangeNumber = callback || false;
		
		if(append == true) {
			this.addElement(append);
		}	
	};

	Extends(CASTORGUI.GUISpinner, CASTORGUI.GUIManager);
	
	CASTORGUI.GUISpinner.prototype.addElement = function(append, element)  {
		var number = document.createElement("input");
		number.type= "number";
		number.min= this.min;
		number.max= this.max;
		number.value= this.value;
		number.stip = this.stip;
		number.style.width = this.numberSize.width+"px";
		number.style.height = this.numberSize.height+"px";		
		number.style.top = (this.numberPosition.y + this.getCanvasOrigine().top)+"px";
		number.style.left = (this.numberPosition.x + this.getCanvasOrigine().left)+"px";
		number.style.position = "absolute";
		number.id = this.id;	
		number.name = this.id;
		number.className = this.className;
		number.style.zIndex = this.zIndex;		
		number.onchange = this.onChangeNumber;
		
		if(append == true) {
			this.html.appendChild(number);
		} else {
			element.appendChild(number);
		}
		this.guiElements.push(number);
    };	

	CASTORGUI.GUISpinner.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUISpinner.prototype.setVisible = function(bool, fade) {
		var display;
		if(fade == undefined) fade = true;
		var element = this.getElementById(this.id);
		if(bool == true) {
			display = "block";
			this.numberVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.numberVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    };

    CASTORGUI.GUISpinner.prototype.isVisible = function() {
		return this.numberVisible;
    };

})();
