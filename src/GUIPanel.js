var CASTORGUI = CASTORGUI || {};

(function() {
   
    CASTORGUI.GUIPanel = function (id, options, guimanager, callback, append) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;		
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.divPosition = {x:options.x, y:options.y};
		this.divSize = {width:options.w, height:options.h};
		this.divVisible = false;
		this.borderRadiusDiv = options.borderRadiusPanel || "10px";
		this.imageDiv = options.backgroundImage || null;
		this.colorDiv = options.backgroundColor || "black";
		this.className = options.className || "";
		this.borderDiv = options.borderPanel || "2px solid black";
		this.zIndex = options.zIndex || 1;
		
		if(append == true) {
			this.addElement(append);
		}
	};

	Extends(CASTORGUI.GUIPanel, CASTORGUI.GUIManager);
	
	CASTORGUI.GUIPanel.prototype.addElement = function(append, element)  {
		var div = document.createElement("div");		
		if(this.divSize) {
			div.style.width = this.divSize.width+"px";
			div.style.height = this.divSize.height+"px";
		}
		if(this.divPosition) {
			div.style.top = (this.divPosition.y + this.getCanvasOrigine().top)+"px";
			div.style.left = (this.divPosition.x + this.getCanvasOrigine().left)+"px";
		}		
		div.id = this.id;	
		div.name = this.id;
		div.className = this.className;		
		div.style.position = "absolute";		
		div.style.zIndex = this.zIndex;		
		if(this.className == "") {
			div.style.backgroundImage = this.imageDiv;	
			div.style.backgroundColor = this.colorDiv;
			div.style.borderRadius = this.borderRadiusDiv;
			div.style.border = this.borderDiv;
		}
		div.style.display = "none";
		
		if(append == true) {
			this.html.appendChild(div);
		} else {
			element.appendChild(div);
		}
		this.guiElements.push(div);
    };	

	CASTORGUI.GUIPanel.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUIPanel.prototype.setVisible = function(bool, fade) {
		var display;
		if(fade == undefined) fade = true;
		var element = this.getElementById(this.id);
		if(bool == true) {
			display = "block";
			this.divVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.divVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display;}
    };

    CASTORGUI.GUIPanel.prototype.isVisible = function() {
		return this.divVisible;
    };

})();
