var CASTORGUI = CASTORGUI || {};

(function() {
   
    CASTORGUI.GUIButton = function (id, options, guimanager, callback, append) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;
		this.className = options.className || "";
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.buttonPosition = {x:options.x, y:options.y};
		this.buttonSize = {width:options.w, height:options.h};
		this.value = options.value || "Ok";
		this.buttonVisible = true;
		this.onClickButton = callback || false;		
		this.imageButton = options.backgroundImage || null;
		this.colorButton = options.backgroundColor || "rgba(0.5, 0.5, 0.5, 0.6)";		
		this.borderRadiusButton = options.borderRadiusButton || "10px";
		this.borderButton = options.borderButton || "2px solid black";
		this.colorText = options.colorText || "black";
		this.zIndex = options.zIndex || 1;
		
		if(append == true) {
			this.addElement(append);
		}
	};

	Extends(CASTORGUI.GUIButton, CASTORGUI.GUIManager);
	
	CASTORGUI.GUIButton.prototype.addElement = function(append, element)  {
		var button = document.createElement("button");		
		button.style.width = this.buttonSize.width+"px";
		button.style.height = this.buttonSize.height+"px";		
		button.style.top = (this.buttonPosition.y + this.getCanvasOrigine().top)+"px";
		button.style.left = (this.buttonPosition.x + this.getCanvasOrigine().left)+"px";
		button.innerHTML = this.value;
		button.style.position = "absolute";
		button.id = this.id;	
		button.name = this.id;
		button.style.zIndex = this.zIndex;
		button.className = this.className;
		button.style.background = this.colorButton;
		button.style.borderRadius = this.borderRadiusButton;
		button.style.backgroundImage = this.imageButton;		
		button.style.border = this.borderButton;
		button.style.color = this.colorText;
		button.onclick = this.onClickButton;
		
		if(append == true) {
			this.html.appendChild(button);
		} else {
			element.appendChild(button);
		}
		this.guiElements.push(button);
    };	

	CASTORGUI.GUIButton.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUIButton.prototype.setVisible = function(bool, fade) {
		var display;
		if(fade == undefined) fade = true;
		var element = this.getElementById(this.id);
		if(bool == true) {
			display = "block";
			this.buttonVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.buttonVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    };

    CASTORGUI.GUIButton.prototype.isVisible = function() {
		return this.buttonVisible;
    };

})();
