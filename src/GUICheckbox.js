var CASTORGUI = CASTORGUI || {};

(function() {
   
    CASTORGUI.GUICheckbox = function (id, options, guimanager, callback, append) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;		
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.ckeckboxPosition = {x:options.x, y:options.y};
		this.ckeckboxSize = options.size || 1.0;
		this.zIndex = options.zIndex || 1;
		this.checkboxVisible = true;
		this.onClickCheckbox = callback || false;
		
		if(append == true) {
			this.addElement(append);
		}
	};

	Extends(CASTORGUI.GUICheckbox, CASTORGUI.GUIManager);
	
	CASTORGUI.GUICheckbox.prototype.addElement = function(append, element)  {
		var ckeckbox = document.createElement("input");
		ckeckbox.type = "checkbox";
		ckeckbox.style.transform = "scale("+this.ckeckboxSize+")";
		ckeckbox.style.WebkitTransform = "scale("+this.ckeckboxSize+")";
		ckeckbox.style.zoom = ""+this.ckeckboxSize+"";
		ckeckbox.style.top = (this.ckeckboxPosition.y + this.getCanvasOrigine().top)+"px";
		ckeckbox.style.left = (this.ckeckboxPosition.x + this.getCanvasOrigine().left)+"px";
		ckeckbox.style.position = "absolute";
		ckeckbox.id = this.id;	
		ckeckbox.name = this.id;
		ckeckbox.style.zIndex = this.zIndex;
		ckeckbox.onclick = this.onClickCheckbox;
		
		if(append == true) {
			this.html.appendChild(ckeckbox);
		} else {
			element.appendChild(ckeckbox);
		}
		this.guiElements.push(ckeckbox);
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
