var CASTORGUI = CASTORGUI || {};

(function() {
   
    CASTORGUI.GUITextarea = function (id, options, guimanager, callback, append) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;		
		this.html = document.body || document.getElementsByTagName('body')[0];	
		this.textareaPosition = {x:options.x, y:options.y};
		this.textareaSize = {width:options.w, height:options.h};
		this.value = options.value || "";
		this.background = options.background || "white";
		this.border	= options.border || "1px solid black";
		this.color = options.color || "black";
		this.zIndex = options.zIndex || 1;
		this.textareaVisible = true;
		this.onChangeTextarea = callback || false;
		
		if(append == true) {
			this.addElement(append);
		}
	};

	Extends(CASTORGUI.GUITextarea, CASTORGUI.GUIManager);
	
	CASTORGUI.GUITextarea.prototype.addElement = function(append, element)  {
		var textarea = document.createElement("textarea");		
		textarea.cols = this.textareaSize.width;
		textarea.rows = this.textareaSize.height;		
		textarea.style.top = (this.textareaPosition.y + this.getCanvasOrigine().top)+"px";
		textarea.style.left = (this.textareaPosition.x + this.getCanvasOrigine().left)+"px";
		textarea.style.position = "absolute";
		textarea.id = this.id;	
		textarea.name = this.id;
		textarea.innerHTML = this.value;
		textarea.style.zIndex = this.zIndex;
		textarea.style.background = this.background;
		textarea.style.border = this.border;
		textarea.style.color = this.color;
		textarea.onchange = this.onChangeTextarea;
		
		if(append == true) {
			this.html.appendChild(textarea);
		} else {
			element.appendChild(textarea);
		}
		this.guiElements.push(textarea);
    };	

	CASTORGUI.GUITextarea.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUITextarea.prototype.setVisible = function(bool) {
		var display;
		if(bool == true) {
			display = "block";
			this.textareaVisible = true;
		} else {
			display = "none";
			this.textareaVisible = false;
		}
		this.getElementById(this.id).css.display = display;
    };

    CASTORGUI.GUITextarea.prototype.isVisible = function() {
		return this.textareaVisible;
    };

})();