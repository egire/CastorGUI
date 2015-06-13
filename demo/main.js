var canvas = document.getElementById("game");
var engine = new BABYLON.Engine(canvas, true);	
var scene, box;

var createGUI = function()
{
	var click = [];
	
	// GUI manager
	var css = "button{cursor:pointer;}";
	var guisystem = new CASTORGUI.GUIManager(canvas, css);
	
	// GUI life
	var guiTextureLife_0 = new CASTORGUI.GUITexture("life0", "data/coeur.png", {w:50,h:50,x:10,y:0}, guisystem, null);
	var guiTextureLife_25 = new CASTORGUI.GUITexture("life25", "data/coeur.png", {w:50,h:50,x:60,y:0}, guisystem, null);
	var guiTextureLife_50 = new CASTORGUI.GUITexture("life50", "data/coeur.png", {w:50,h:50,x:110,y:0}, guisystem, null);
	var guiTextureLife_75 = new CASTORGUI.GUITexture("life75", "data/coeur.png", {w:50,h:50,x:160,y:0}, guisystem, null);
	var guiTextureLife_100 = new CASTORGUI.GUITexture("life100", "data/coeur.png", {w:50,h:50,x:210,y:0}, guisystem, null);	
	
	// GUI group
	var groupLife = new CASTORGUI.GUIGroup("groupLife", null, guisystem);
	groupLife.add(guiTextureLife_0);
	groupLife.add(guiTextureLife_25);
	groupLife.add(guiTextureLife_50);
	groupLife.add(guiTextureLife_75);
	groupLife.add(guiTextureLife_100);
	
	// GUI text
	var optionsGUIText = {
		x: 10,
		y: guisystem.getCanvasWidth().height - 40,
		text: "CastorGUI created by Dad72",
		color: "#fff809"
	};
	var createdBy = new CASTORGUI.GUIText("createdBy", optionsGUIText, guisystem);
	
	//GUI button
	var myFunction = function()
	{
		switch(click.length)
		{
			case 0:
				guiTextureLife_100.dispose();
				click.push(click.length);
			break;
			case 1:
				guiTextureLife_75.dispose();
				click.push(click.length);
			break;
			case 2:
				guiTextureLife_50.dispose();
				click.push(click.length);
			break;
			case 3:
				guiTextureLife_25.dispose();
				click.push(click.length);
			break;
			case 4:
				guiTextureLife_0.dispose();
				click.push(click.length);
				// GUI window
				var form = new CASTORGUI.GUIWindow("form", {x:(guisystem.getCanvasWidth().width / 2 - 100), y:200 , w:200, h:200}, guisystem);				
				var optionsGUIText = { x: 10,y: 35, text: "- This window is draggable.<br /><br />- Click the cube behind the window for refresh the scene.<br />", color: "white", size: 12 };
				var textForWindow = new CASTORGUI.GUIText("textInfo", optionsGUIText, guisystem, false);				
				form.add(textForWindow);	
				box.visibility = true;
			break;
		}
	};
	var button = new CASTORGUI.GUIButton("button", {x:(guisystem.getCanvasWidth().width / 2 - 100), y: 10, w:200, h:35, value:"Click me five times"}, guisystem, myFunction);	
};

var createScene = function () {	

	scene = new BABYLON.Scene(engine);
	
	// Camera
	var camera = new BABYLON.ArcRotateCamera("Camera", 3.14, 3.14/2, 10, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);	
	
	// Light
	var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
	light0.diffuse = new BABYLON.Color3(1, 1, 1);
	light0.specular = new BABYLON.Color3(1, 1, 1);
	light0.groundColor = new BABYLON.Color3(0, 0, 0);
			
	// Skybox
	var skybox = BABYLON.Mesh.CreateBox("skyBox", 500.0, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("data/TropicalSunnyDay", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;
			
	//Sphere
	var sphere = BABYLON.Mesh.CreateSphere("sphere0", 16, 1, scene);
	
	box = BABYLON.Mesh.CreateBox("box", 2.0, scene);
	var material = new BABYLON.StandardMaterial("Mat", scene);
	material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
	material.specularColor = new BABYLON.Color3(1.0, 1.0, 1.0);
	material.specularPower = 32;
	material.checkReadyOnEveryCall = false;
	box.material = material;
	box.visibility = false;

	// Sphere material
	var material = new BABYLON.StandardMaterial("Mat", scene);
	material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
	material.specularColor = new BABYLON.Color3(1.0, 1.0, 1.0);
	material.specularPower = 32;
	material.checkReadyOnEveryCall = false;
	sphere.material = material;

	// Fog
	scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
	scene.fogDensity = 0.05;

	// Clone spheres
	var playgroundSize = 20;
	for (var index = 0; index < 1000; index++) {
		var clone = sphere.clone("sphere" + (index + 1), null, true);
		var scale = Math.random() * 0.8 + 0.6;
		clone.scaling = new BABYLON.Vector3(scale, scale, scale);
		clone.position = new BABYLON.Vector3(Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize);
	}
	sphere.setEnabled(false);
	scene.createOrUpdateSelectionOctree();

	scene.onPointerDown = function (evt, pickResult) {
        if (pickResult.hit && pickResult.pickedMesh.name == "box" && pickResult.pickedMesh.visibility == true) {
			alert("The scene going to be refreshed");
			location.reload();
        }
    };
	
	// Loop of game
	engine.runRenderLoop(function () {
        scene.render();
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
};

createScene();
createGUI();