##new [GUIText](#)(id, options, guimanager, append)
Creates a new GUIText

####Parameters
Name | Type | Description
---|---|---
id | string | The id and name element
options | json | Options of element
guimanager | GUIManager | The gui manager
append | bool | is added to the &lt;body&gt;. =&gt; True by default (optional)
---

##Options

* x: position left of text (in pixel)
* y: position top of text (in pixel)
* size: size the text (int) =&gt; 30 by default (optional)
* color: color the text (string) =&gt; "white" by default (optional)
* police: police font of text (string) =&gt; "Segoe UI" by default (optional) 
* text: value text label (string) =&gt; "CastorGUI" by default
* bold: text bold or no =&gt; "none" by default else "bold"
* italic: text italic or no =&gt; "none" by default else "italic"
* zIndex: depth of the element (int) =&gt; 1 by default

##Methods

###setVisible(bool) → void
Set this GUI element to visible or invisible

###isVisible() → void
Returns element if is visible or no

###dispose() → void
Dispose the GUIText Manager, and delete element.
