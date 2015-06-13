var CASTORGUI = CASTORGUI || {};

(function() {
   
    CASTORGUI.GUIGroup = function(id, options, guimanager) {
        
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
				
		this.html = document.body || document.getElementsByTagName('body')[0];
		if(options) { this.groupPosition = {x:options.x, y:options.y}; }
		this.guiManager = guimanager;
        this.id = id;
        this.elementsGoup = [];
        this.guiManager.groups.push(this);
		this.groupVisible = true;
    };
	
	Extends(CASTORGUI.GUIGroup, CASTORGUI.GUIManager);
	
    CASTORGUI.GUIGroup.prototype.add = function(guiElement) {
        this.elementsGoup.push(guiElement);
    };

    CASTORGUI.GUIGroup.prototype.dispose = function() {
       var that = this;
		this.elementsGoup.forEach(function(e) {						
			var node = that.getElementById(e.id);
			that.html.removeChild(node);
		});
		return;
    };
	
	 CASTORGUI.GUIGroup.prototype.setVisible = function(bool) {
        var display;
		if(bool == true) {
			display = "block";
			this.groupVisible = true;
		} else {
			display = "none";
			this.groupVisible = false;
		}
		this.elementsGoup.forEach(function(e) {
            this.getElementById(e.id).css.display = display;
        });
    };
	
    CASTORGUI.GUIGroup.prototype.isVisible = function() {
		return this.groupVisible;
    };
})();
