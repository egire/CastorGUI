var CASTORGUI = CASTORGUI || {};

(function() {
   
    CASTORGUI.GUIText = function(id, options, guimanager, append) {
		
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		this.append = append;
		if(append == null || append == undefined) { this.append = true; }
		
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
		this.textElement = null;
		this.font = null;
		
		if(this.append == true) {
			this.addElement(this.append);
		}
	};

	Extends(CASTORGUI.GUIText, CASTORGUI.GUIManager);
	
	CASTORGUI.GUIText.prototype.addElement = function(append, element) {		
		this.font = this.textSize+"px "+this.police;
		this.textElement = document.createElement("div");	
		this.textElement.style.position = "absolute";			
		if(append == true) {
			this.textElement.style.width = this.getTextWidth(this.texte, this.font).w+"px";
			this.textElement.style.height = this.getTextWidth(this.texte, this.font).h+"px";
			this.textElement.style.top = (this.textPosition.y + this.getCanvasOrigine().top)+"px";
			this.textElement.style.left = (this.textPosition.x + this.getCanvasOrigine().left)+"px";
			this.textElement.style.display = "block";
			this.textElement.style.whiteSpace = "nowrap";
		} else {
			this.textElement.style.top = this.textPosition.y+"px";
			this.textElement.style.left = this.textPosition.x+"px";
		}		
		this.textElement.style.font = this.font;
		this.textElement.style.color = this.color;
		this.textElement.style.fontStyle = this.italic;
		this.textElement.style.fontWeight = this.bold;
		this.textElement.innerHTML = this.texte;
		this.textElement.id = this.id;	
		this.textElement.name = this.id;
		this.textElement.style.zIndex = this.zIndex;
		
		if(append == true) {
			this.html.appendChild(this.textElement);
		} else {
			element.appendChild(this.textElement);
		}
		this.guiElements.push(this.textElement);
    };
	
	CASTORGUI.GUIText.prototype.updateText = function(texte){
		if(this.append == true) {
			this.textElement.style.width = this.getTextWidth(texte, this.font).w+"px";
			this.textElement.style.height = this.getTextWidth(texte, this.font).h+"px";
			this.textElement.style.top = (this.textPosition.y + this.getCanvasOrigine().top)+"px";
			this.textElement.style.left = (this.textPosition.x + this.getCanvasOrigine().left)+"px";
		} else {
			this.textElement.style.top = this.textPosition.y+"px";
			this.textElement.style.left = this.textPosition.x+"px";
		}
		this.textElement.innerHTML = texte;
	};

	CASTORGUI.GUIText.prototype.getTextWidth = function(texte, font){
		var tag = document.createElement("div");
		tag.style.position = "absolute";
		tag.style.left = "-999em";
		tag.style.display = "block";
		tag.style.whiteSpace = "nowrap";
		tag.style.font = font;
		tag.innerHTML = texte;
		document.body.this.appendChild(tag);		
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
