var CASTORGUI = CASTORGUI || {};

(function() {
   
    CASTORGUI.GUIDialog = function (id, options, guimanager, append) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;
		this.dialogSize = {width:options.w, height:options.h};				
		this.dialogPosition = {x:options.x, y:options.y};
		this.borderDialog = options.border || "2px solid black";
		this.colorDialog = options.backgroundColor || "rgba(0,0,0,0.5)";
		this.imageDialog = options.backgroundImage || "";
		this.radius = options.radius || 8;
		this.zIndex = options.zIndex || 1;
		this.dialogVisible = true;
		this.html = document.body || document.getElementsByTagName('body')[0];	
		
		if(append == true) {
			this.addElement(append);
		}
	};

	Extends(CASTORGUI.GUIDialog, CASTORGUI.GUIManager);
	
	CASTORGUI.GUIDialog.prototype.addElement = function(append, element)  {
		var dialog = document.createElement("div");		
		dialog.style.width = this.dialogSize.width+"px";
		dialog.style.height = this.dialogSize.height+"px";		
		dialog.style.top = (this.dialogPosition.y + this.getCanvasOrigine().top)+"px";
		dialog.style.left = (this.dialogPosition.x + this.getCanvasOrigine().left)+"px";
		dialog.style.position = "absolute";
		dialog.id = this.id;	
		dialog.name = this.id;
		dialog.style.zIndex = this.zIndex;
		dialog.style.background = this.colorDialog;
		dialog.style.borderRadius = this.radius+"px";
		dialog.style.backgroundImage = this.imageDialog;
		dialog.style.border = this.borderDialog;
		
		var close = document.createElement("button");
		close.innerHTML = "X";
		close.id = this.id+"_button";
		close.style.position = "absolute";
		close.style.borderRadius = "12px";
		close.style.border = "2px solid black";
		close.style.left = this.dialogSize.width - 12+"px";		
		close.style.marginTop = "-12px";
		close.style.width = "25px";
		close.style.height = "25px";
		close.onclick = function () { dialog.style.display = "none";};	
		
		if(append == true) {
			this.html.appendChild(dialog);			
		} else {
			element.appendChild(dialog);			
		}
		this.getElementById(this.id).appendChild(close);
		this.guiElements.push(dialog);
    };

	CASTORGUI.GUIDialog.prototype.add = function(element)
	{
		var contentDialog = this.getElementById(this.id);		
		element.addElement(false, contentDialog);
	};	

	CASTORGUI.GUIDialog.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUIDialog.prototype.setVisible = function(bool) {
		var display;
		if(bool == true) {
			display = "block";
			this.dialogVisible = true;
		} else {
			display = "none";
			this.dialogVisible = false;
		}
		this.getElementById(this.id).style.display = display;
    };

    CASTORGUI.GUIDialog.prototype.isVisible = function() {
		return this.dialogVisible;
    };

})();
