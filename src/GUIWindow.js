var CASTORGUI = CASTORGUI || {};

(function() {
   
    CASTORGUI.GUIWindow = function (id, options, guimanager) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		this.id = id;		
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.windowsPosition = {x:options.x, y:options.y};
		this.windowSize = {width:options.w, height:options.h};		
		this.colorWindow = options.borderWindow || "rgba(0,0,0,0.5)";
		this.imageWindow = options.imageWindow || "";
		this.borderWindow = options.borderWindow || "2px solid black";		
		this.colorTitle = options.colorTitle || "rgba(0,0,0,0.4)";		
		this.imageTitle = options.imageTitle || "";
		this.colorTextTitle = options.color || "white";		
		this.heightTitle = options.heightTitle || "30px";
		this.borderTitle = options.borderTitle || "1px solid black";
		this.textAlign = options.textAlign || "center";		
		this.title = options.title || "Title window";
		this.colorContent = options.colorContent || "rgba(0,0,0,0.1)";
		this.imageContent = options.imageContent;		
		this.borderContent = options.borderContent || "0px";
		this.zIndex = options.zIndex || 1;
		this.windowVisible = true;
		
		this.addElement();
	};

	Extends(CASTORGUI.GUIWindow, CASTORGUI.GUIManager);
	
	CASTORGUI.GUIWindow.prototype.addElement = function(append, element)  {
		var windows = document.createElement("div");		
		windows.style.width = this.windowSize.width+"px";
		windows.style.height = this.windowSize.height+"px";		
		windows.style.top = (this.windowsPosition.y + this.getCanvasOrigine().top)+"px";
		windows.style.left = (this.windowsPosition.x + this.getCanvasOrigine().left)+"px";
		windows.style.position = "absolute";
		windows.id = this.id;	
		windows.name = this.id;
		windows.style.zIndex = this.zIndex;
		windows.style.background = this.colorWindow;
		windows.style.borderRadius = "8px";
		windows.style.backgroundImage = this.imageWindow;
		windows.style.border = this.borderWindow;
		windows.draggable = "true";
		windows.ondragstart = CASTORGUI.draggable(windows);
		
		var titreWindow = document.createElement("div");	
		titreWindow.style.width = this.windowSize.width;		
		titreWindow.style.height = this.heightTitle;	
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
		close.onclick = function () { windows.style.display = "none";};		
		
		var contentWindow = document.createElement("div");
		contentWindow.style.width = this.windowSize.width;
		contentWindow.style.height = (this.windowSize.height - 40)+"px";
		contentWindow.style.marginTop = "5px";
		contentWindow.style.borderRadius = "8px";
		contentWindow.id = this.id+"_content";
		contentWindow.style.background = this.colorContent;
		contentWindow.style.backgroundImage = this.imageContent;
		contentWindow.style.border = this.borderContent;
		
		this.html.appendChild(windows);		
		this.getElementById(this.id).appendChild(titreWindow);
		this.getElementById(this.id+"_titre").appendChild(close);
		this.getElementById(this.id).appendChild(contentWindow);
		
		this.guiElements.push(windows);
    };

	CASTORGUI.GUIWindow.prototype.add = function(element)
	{
		var contentForm = this.getElementById(this.id+"_content");		
		element.addElement(false, contentForm);
	};	

	CASTORGUI.GUIWindow.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUIWindow.prototype.setVisible = function(bool) {
		var display;
		if(bool == true) {
			display = "block";
			this.windowVisible = true;
		} else {
			display = "none";
			this.windowVisible = false;
		}
		this.getElementById(this.id).css.display = display;
    };

    CASTORGUI.GUIWindow.prototype.isVisible = function() {
		return this.windowVisible;
    };

})();
