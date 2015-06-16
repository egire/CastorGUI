var CASTORGUI = CASTORGUI || {};

(function() {
   
    CASTORGUI.GUIText = function(id, options, guimanager, append) {
		
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;		
		this.html = document.body || document.getElementsByTagName('body')[0];						
		this.textPosition = {x:options.x, y:options.y};
		this.textSize = options.size || 30;	
		this.color = options.color || "white";
		this.police = options.police || "Segoe UI";
		this.texte = options.text || "CastorGUI";
		this.zIndex = options.zIndex || 1;
		this.bold = options.bold || ""; // bold
		this.italic = options.italic || ""; //italic
		this.textVisible = true;
		
		if(append == true) {
			this.addElement(append);
		}
	};

	Extends(CASTORGUI.GUIText, CASTORGUI.GUIManager);
	
	CASTORGUI.GUIText.prototype.addElement = function(append, element) {		
		var font = this.textSize+"px "+this.police;
		var text = document.createElement("div");	
		text.style.position = "absolute";			
		if(append == true) {
			text.style.width = this.getTextWidth(this.texte, font).w+"px";
			text.style.height = this.getTextWidth(this.texte, font).h+"px";
			text.style.top = (this.textPosition.y + this.getCanvasOrigine().top)+"px";
			text.style.left = (this.textPosition.x + this.getCanvasOrigine().left)+"px";
			text.style.display = "block";
			text.style.whiteSpace = "nowrap";
		} else {
			text.style.top = this.textPosition.y+"px";
			text.style.left = this.textPosition.x+"px";
		}		
		text.style.font = font;
		text.style.color = this.color;
		text.style.fontStyle = this.italic;
		text.style.fontWeight = this.bold;
		text.innerHTML = this.texte;
		text.id = this.id;	
		text.name = this.id;
		text.style.zIndex = this.zIndex;
		
		if(append == true) {
			this.html.appendChild(text);
		} else {
			element.appendChild(text);
		}
		this.guiElements.push(text);
    };

	CASTORGUI.GUIText.prototype.getTextWidth = function(texte, font){
		var tag = document.createElement("div");
		tag.style.position = "absolute";
		tag.style.left = "-999em";
		tag.style.display = "block";
		tag.style.whiteSpace = "nowrap";
		tag.style.font = font;
		tag.innerHTML = texte;
		document.body.appendChild(tag);		
		var result = {w:tag.clientWidth,h:tag.clientHeight};
		document.body.removeChild(tag);
		return result;
	};

	CASTORGUI.GUIText.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUIText.prototype.setVisible = function(bool) {
		var display;
		if(bool == true) {
			display = "block";
			this.textVisible = true;
		} else {
			display = "none";
			this.textVisible = false;
		}
		this.getElementById(this.id).style.display = display;
    };

    CASTORGUI.GUIText.prototype.isVisible = function() {
		return this.textVisible;
    };

})();
