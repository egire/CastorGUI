var CASTORGUI = CASTORGUI || {};

(function() {
   
    CASTORGUI.GUIWindow = function (id, options, guimanager) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		this.id = id;	
		this.className = options.className || null;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.windowPosition = {x:options.x, y:options.y};
		this.windowSize = {width:options.w, height:options.h};	
		
		this.colorWindow = options.bakgroundColor || "rgba(0,0,0,0.5)";
		this.imageWindow = options.bakgroundImage || "";
		this.colorContent = options.colorContent || "rgba(0,0,0,0.1)";
		this.imageContent = options.imageContent;		
		
		this.borderWindow = options.borderWindow || "2px solid black";	
		this.borderContent = options.borderContent || "0";
		this.borderTitle = options.borderTitle || "1px solid black";
		this.radiusWindow = options.radiusWindow || 8;
		
		this.colorTitle = options.colorTitle || "rgba(0,0,0,0.4)";		
		this.imageTitle = options.imageTitle || "";
		
		this.heightTitle = options.heightTitle || 30;
		
		this.textAlign = options.titleTextAlign || "center";	
		this.colorTextTitle = options.titleColor || "white";
		
		this.title = options.textTitle || "Title window";
		
		this.draggable = options.draggable || true;
		
		this.zIndex = options.zIndex || 1;
		this.windowVisible = true;
		
		this.addElement();
	};

	Extends(CASTORGUI.GUIWindow, CASTORGUI.GUIManager);
	
	CASTORGUI.GUIWindow.prototype.addElement = function(append, element)  {
		var window = document.createElement("div");		
		window.style.width = this.windowSize.width+"px";
		window.style.height = this.windowSize.height+"px";		
		window.style.top = (this.windowPosition.y + this.getCanvasOrigine().top)+"px";
		window.style.left = (this.windowPosition.x + this.getCanvasOrigine().left)+"px";
		window.style.position = "absolute";
		window.id = this.id;	
		window.name = this.id;
		window.className = this.className;
		window.style.zIndex = this.zIndex;
		window.style.background = this.colorWindow;
		window.style.borderRadius = this.radiusWindow+"px";
		window.style.backgroundImage = this.imageWindow;
		window.style.border = this.borderWindow;
		if(this.draggable == true) {
			window.draggable = "true";
			window.ondragstart = CASTORGUI.draggable(window);
		}
		
		var titreWindow = document.createElement("div");	
		titreWindow.style.width = this.windowSize.width;		
		titreWindow.style.height = this.heightTitle+"px";	
		titreWindow.style.textAlign = this.textAlign;
		titreWindow.style.borderRadius = "8px";
		titreWindow.id = this.id+"_titre";		
		titreWindow.style.background = this.colorTitle;
		titreWindow.style.backgroundImage = this.imageTitle;
		titreWindow.style.border = this.borderTitle;
		titreWindow.style.cursor = "move";
		titreWindow.innerHTML = this.title;
		titreWindow.style.color = this.colorTextTitle;
		
		var close = document.createElement("button");
		close.innerHTML = "X";
		close.id = this.id+"_button";
		close.style.position = "absolute";
		close.style.borderRadius = "12px";
		close.style.border = "2px solid black";
		close.style.left = this.windowSize.width - 12+"px";		
		close.style.marginTop = "-12px";
		close.style.width = "25px";
		close.style.height = "25px";
		close.style.zIndex = 10000;
		close.onclick = function () { window.style.display = "none";};		
		
		var contentWindow = document.createElement("div");
		contentWindow.style.width = this.windowSize.width;
		contentWindow.style.height = (this.windowSize.height - 40)+"px";
		contentWindow.style.marginTop = "5px";
		contentWindow.style.borderRadius = "8px";
		contentWindow.id = this.id+"_content";
		contentWindow.style.background = this.colorContent;
		contentWindow.style.backgroundImage = this.imageContent;
		contentWindow.style.border = this.borderContent;
		
		this.html.appendChild(window);		
		this.getElementById(this.id).appendChild(titreWindow);
		this.getElementById(this.id+"_titre").appendChild(close);
		this.getElementById(this.id).appendChild(contentWindow);
		
		this.guiElements.push(window);
    };

	CASTORGUI.GUIWindow.prototype.add = function(element)
	{
		var contentForm = this.getElementById(this.id+"_content");		
		element.addElement(false, contentForm);
	};	

	CASTORGUI.GUIWindow.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUIWindow.prototype.setVisible = function(bool, fade) {
		var display;
		if(fade == undefined) fade = true;
		var element = this.getElementById(this.id);
		if(bool == true) {
			display = "block";
			this.windowVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.windowVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    };

    CASTORGUI.GUIWindow.prototype.isVisible = function() {
		return this.windowVisible;
    };

})();
