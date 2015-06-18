var CASTORGUI = CASTORGUI || {};

(function() {
   
    CASTORGUI.GUIFieldset = function (id, options, guimanager, append) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;		
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.fieldsetPosition = {x:options.x, y:options.y};
		this.fieldsetSize = {width:options.w, height:options.h};
		this.legend = options.legend;
		this.zIndex = options.zIndex || 1;
		this.fieldsetVisible = true;		
		
		if(append == true) {
			this.addElement(append);
		}
	};

	Extends(CASTORGUI.GUIFieldset, CASTORGUI.GUIManager);
	
	CASTORGUI.GUIFieldset.prototype.addElement = function(append, element)  {
		var fieldset = document.createElement("fieldset");
		fieldset.style.width = this.fieldsetSize.width+"px";
		fieldset.style.height = this.fieldsetSize.height+"px";		
		fieldset.style.top = (this.fieldsetPosition.y + this.getCanvasOrigine().top)+"px";
		fieldset.style.left = (this.fieldsetPosition.x + this.getCanvasOrigine().left)+"px";
		fieldset.style.position = "absolute";
		fieldset.id = this.id;	
		fieldset.name = this.id;	
		fieldset.style.zIndex = this.zIndex;
		this.html.appendChild(fieldset);		
		var legend = document.createElement("legend");
		legend.innerHTML = this.legend;
		
		if(append == true) {
			this.getElementById(this.id).appendChild(legend);
		} else {
			element.appendChild(legend);
		}
		this.guiElements.push(fieldset);
    };
	
	CASTORGUI.GUIFieldset.prototype.add = function(element)
	{
		var contentFieldSet = this.getElementById(this.id);		
		element.addElement(false, contentFieldSet);
	};

	CASTORGUI.GUIFieldset.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUIFieldset.prototype.setVisible = function(bool, fade) {
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

    CASTORGUI.GUIFieldset.prototype.isVisible = function() {
		return this.fieldsetVisible;
    };

})();
