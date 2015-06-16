var CASTORGUI = CASTORGUI || {};

(function() {
   
    CASTORGUI.GUILabel = function (id, options, guimanager, append) {
     
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.labelPosition = {x:options.x, y:options.y};
		this.labelSize = {width:options.w, height:options.h};
		this.textLabel = options.text;
		this.zIndex = options.zIndex || 1;
		this.labelVisible = true;
		
		if(append == true) {
			this.addElement(append);
		}
	};

	Extends(CASTORGUI.GUILabel, CASTORGUI.GUIManager);
	
	CASTORGUI.GUILabel.prototype.addElement = function(append, element)  {
		var label = document.createElement("label");				
		label.style.top = (this.labelPosition.y + this.getCanvasOrigine().top)+"px";
		label.style.left = (this.labelPosition.x + this.getCanvasOrigine().left)+"px";
		label.style.position = "absolute";
		label.id = this.id;	
		label.name = this.id;
		label.innerHTML = this.textLabel;
		label.style.zIndex = this.zIndex;
		
		if(append == true) {
			this.html.appendChild(label);
		} else {
			element.appendChild(label);
		}
		this.guiElements.push(label);
    };	

	CASTORGUI.GUILabel.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUILabel.prototype.setVisible = function(bool) {
		var display;
		if(bool == true) {
			display = "block";
			this.labelVisible = true;
		} else {
			display = "none";
			this.labelVisible = false;
		}
		this.getElementById(this.id).style.display = display;
    };

    CASTORGUI.GUILabel.prototype.isVisible = function() {
		return this.labelVisible;
    };
	
})();
