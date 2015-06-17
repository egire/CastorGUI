##new [GUIDialog](#)(id, options, guimanager, append)
Creates a new GUIDialog

####Parameters
Name | Type | Description
---|---|---
**id** | string | The id and name element
**options** | json | Options of element
**guimanager** | GUIManager | The gui manager
**append** | bool | is added to the &lt;body&gt;. =&gt; True by default (optional)
---

##Options

* **w**: width of dialog (in pixel)
* **h**: height of dialog (in pixel)
* **x**: position left of dialog (in pixel)
* **y**: position top of dialog (in pixel)
* **backgroundColor**: color background of dialog (string) =&gt; "rgba(0, 0, 0, 0)" by default
* **backgroundImage**: image background of dialog (string) =&gt; "null" by default
* **radius**: radius border of dialog (int)  =&gt; 8 by default
* **border**: border of button (string)  =&gt; "2px solid black" by default
* **zIndex**: depth of the element (int) =&gt; 1 by default

##Methods

###add(element) → void
add element in the GUIDialog

###setVisible(bool) → void
Set this GUI element to visible or invisible

###isVisible() → void
Returns element if is visible or no

###dispose() → void
Dispose the GUIDialog, and delete element.
