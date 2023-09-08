// let stickmanModel;
// let StickmanIsLoaded = false;

let Stickman = {
    stickmanModel: null,
    StickmanIsLoaded: false,
    animMixer: null,

    init() {
        const scaleConst = 5;
        this.stickmanModel = Resourses.stickmanObj.scene;
        this.stickmanModel.scale.set(scaleConst, scaleConst, scaleConst);

        this.stickmanModel.rotateY(Math.PI);

        const stickmanOffsetX = 0;
        const stickmanOffsetY = 0;
        const stickmanOffsetZ = 0;

        this.stickmanModel.position.set(stickmanOffsetX, stickmanOffsetY, stickmanOffsetZ);

        // -----------------
        text_plane = this.stickmanModel.children[0].children.find(obj => obj.name == "Plane");

        text_plane.visible = false;
        // -----------------

        this.animMixer = new THREE.AnimationMixer(this.stickmanModel);

        this.StickmanIsLoaded = true;

        scene.add(this.stickmanModel);
    },

    // playAnimation(animationType, loop = true) {
    //     // this.animMixer.stopAllAction();

    //     const action = this.animMixer.clipAction(Resourses.stickmanObj.animations[animationType]);
    //     action.loop = (loop ? THREE.LoopRepeat : THREE.LoopOnce);
        
    //     action.clampWhenFinished = !loop;

    //     action.play();
    // },
};

let PLAYER_ANIM_LIST = {
    WIN: 0,
    HIT_HEAD: 1,
    DEATH: 2,
    STOP: 3,
    RUN: 4,
    T: 5,
};