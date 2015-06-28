var CASTORGUI = CASTORGUI || {};

(function() {
   
    CASTORGUI.GUICheckbox = function (id, options, guimanager, callback, append) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;	
		this.className = options.className || null;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.checkboxPosition = {x:options.x, y:options.y};
		this.checkboxSize = options.size || 1.0;
		this.zIndex = options.zIndex || 1;
		this.checkboxVisible = true;
		this.onClickCheckbox = callback || false;
		
		if(append == true) {
			this.addElement(append);
		}
	};

	Extends(CASTORGUI.GUICheckbox, CASTORGUI.GUIManager);
	
	CASTORGUI.GUICheckbox.prototype.addElement = function(append, element)  {
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.style.transform = "scale("+this.checkboxSize+")";
		checkbox.style.WebkitTransform = "scale("+this.checkboxSize+")";
		checkbox.style.zoom = ""+this.checkboxSize+"";
		checkbox.style.top = (this.checkboxPosition.y + this.getCanvasOrigine().top)+"px";
		checkbox.style.left = (this.checkboxPosition.x + this.getCanvasOrigine().left)+"px";
		checkbox.style.position = "absolute";
		checkbox.id = this.id;	
		checkbox.name = this.id;
		checkbox.className = this.className;
		checkbox.style.zIndex = this.zIndex;
		checkbox.onclick = this.onClickCheckbox;
		
		if(append == true) {
			this.html.appendChild(checkbox);
		} else {
			element.appendChild(checkbox);
		}
		this.guiElements.push(checkbox);
    };	

	CASTORGUI.GUICheckbox.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUICheckbox.prototype.setVisible = function(bool, fade) {
		var display;
		if(fade == undefined) fade = true;
		var element = this.getElementById(this.id);
		if(bool == true) {
			display = "block";
			this.checkboxVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.checkboxVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    };

    CASTORGUI.GUICheckbox.prototype.isVisible = function() {
		return this.checkboxVisible;
    };
	
})();
