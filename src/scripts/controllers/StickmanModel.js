let stickmanModel;

Resourses.load(() => {
    const scaleConst = 5;
    stickmanModel = Resourses.stickmanObj.scene;
    stickmanModel.scale.set(scaleConst, scaleConst, scaleConst);

    stickmanModel.rotateY(Math.PI);

    const stickmanOffsetX = 0;
    const stickmanOffsetY = 0;
    const stickmanOffsetZ = 0;

    stickmanModel.position.set(stickmanOffsetX, stickmanOffsetY, stickmanOffsetZ);

    // -----------------
    text_plane = stickmanModel.children[0].children.find(obj => obj.name == "Plane");

    text_plane.visible = false;
    // -----------------

    scene.add(stickmanModel);
});