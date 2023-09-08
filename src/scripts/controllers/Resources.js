const Resourses = {
    modelLoader: new THREE.GLTFLoader(),
    stickmanObj: null,

    load: function(cb) {
        this.modelLoader.load(
            './models/Stickman_with_anims.glb',
            (glb_player) => {
                // ResourcesC.setShadowsStateForChildren(glb_player.scene, true, false);

                Resourses.stickmanObj = {
                    scene: glb_player.scene,
                    animations: glb_player.animations
                };

                cb();
            }
        );
    },
};