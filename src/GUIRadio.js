var CASTORGUI = CASTORGUI || {};

(function() {
   
    CASTORGUI.GUIRadio = function (id, options, guimanager, callback, append) {
     
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;		
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.radioPosition = {x:options.x, y:options.y};
		this.radioSize = options.size || 1.0;
		this.zIndex = options.zIndex || 1;
		this.radioVisible = true;
		this.onClickRadio = callback || false;
		
		if(append == true) {
			this.addElement(append);
		}
	};

	Extends(CASTORGUI.GUIRadio, CASTORGUI.GUIManager);
	
	CASTORGUI.GUIRadio.prototype.addElement = function(append, element)  {
		var radio = document.createElement("input");
		radio.type = "radio";
		radio.style.transform = "scale("+this.radioSize+")";
		radio.style.zoom = ""+this.radioSize+"";			
		radio.style.top = (this.radioPosition.y + this.getCanvasOrigine().top)+"px";
		radio.style.left = (this.radioPosition.x + this.getCanvasOrigine().left)+"px";
		radio.style.position = "absolute";
		radio.id = this.id;	
		radio.name = this.id;
		radio.style.zIndex = this.zIndex;
		radio.onclick = this.onClickRadio;
		
		if(append == true) {
			this.html.appendChild(radio);
		} else {
			element.appendChild(radio);
		}
		this.guiElements.push(radio);
    };	

	CASTORGUI.GUIRadio.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUIRadio.prototype.setVisible = function(bool) {
		var display;
		if(bool == true) {
			display = "block";
			this.radioVisible = true;
		} else {
			display = "none";
			this.radioVisible = false;
		}
		this.getElementById(this.id).css.display = display;
    };

    CASTORGUI.GUIRadio.prototype.isVisible = function() {
		return this.radioVisible;
    };
})();
