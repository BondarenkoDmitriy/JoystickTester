import {
    OrbitControls
} from "https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js"

// vars
let verticalValue = 0;
let fwdValue = 0;
let bkdValue = 0;
let rgtValue = 0;
let lftValue = 0;
let tempVector = new THREE.Vector3();
let upVector = new THREE.Vector3(0, 1, 0);
let joyManager;

// Create a light, set its position, and add it to the scene.
let light = new THREE.PointLight(0xffffff);
light.position.set(-100,200,100);
scene.add(light);

// Add OrbitControls so that we can pan around with the mouse.
let controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 100;
controls.minDistance = 100;
      //controls.maxPolarAngle = (Math.PI / 4) * 3;
      controls.maxPolarAngle = Math.PI / 2 ;
      controls.minPolarAngle = 0;
      controls.autoRotate = false;
      controls.autoRotateSpeed = 0;
      controls.rotateSpeed = 0.4;
      controls.enableDamping = false;
      controls.dampingFactor = 0.1;
      controls.enableZoom = false;
      controls.enablePan = false;
      // controls.minAzimuthAngle = - Math.PI/2; // radians
      // controls.maxAzimuthAngle = Math.PI/4 // radians
      controls.minAzimuthAngle = -Infinity;
      controls.maxAzimuthAngle = Infinity;

// Add grid
const size = 1000;
const divisions = 80;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

// let geometry = new THREE.BoxGeometry(5,5,5);
// let cubeMaterial = new THREE.MeshNormalMaterial(); 

// let mesh = new THREE.Mesh( geometry, cubeMaterial );
// scene.add( mesh );

Resourses.load(() => {
  Stickman.init();
  // Stickman.playAnimation(PLAYER_ANIM_LIST.STOP);
});

//var ground = new Object3D()
let size_floor = 1000;
let geometry_floor = new THREE.BoxGeometry(size_floor, 1, size_floor)
let material_floor = new THREE.MeshNormalMaterial();

let floor = new THREE.Mesh(geometry_floor, material_floor);
floor.position.y = -5;
//ground.add(floor)
scene.add(floor)
//floor.rotation.x = -Math.PI / 2

/**
 * Animate
 */
resize();
animate();
window.addEventListener('resize',resize);

// added joystick + movement
addJoystick();

function resize(){
  let w = window.innerWidth;
  let h = window.innerHeight;
  
  renderer.setSize(w,h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

// Renders the scene
function animate() {
  const clock = new THREE.Clock();
  let previousTime = 0;
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;
  
  updatePlayer();

  Stickman.update(deltaTime);

  renderer.render( scene, camera );
  controls.update();

  requestAnimationFrame( animate );
}

function calculateRotationAngle(fromVector, toVector) {
  const from = fromVector.clone().normalize();
  const to = toVector.clone().normalize();
  const dot = from.dot(to);
  const angle = Math.acos(Math.min(1, Math.max(-1, dot)));
  const cross = new THREE.Vector3().crossVectors(from, to);
  return cross.y > 0 ? -angle : angle;
}

function updateStickmanOrientation(rotationAngle) {
  Stickman.stickmanModel.rotation.y = rotationAngle;
}

function updatePlayer(){
  if(!Stickman.StickmanIsLoaded) return;

  // move the player
  let forwardVector = new THREE.Vector3();
  let strafeVector = new THREE.Vector3();

  if (fwdValue > 0) {
    forwardVector.set(0, 0, -fwdValue);
  } else if (bkdValue > 0) {
    forwardVector.set(0, 0, bkdValue);
  }

  if (lftValue > 0) {
    strafeVector.set(-lftValue, 0, 0);
  } else if (rgtValue > 0) {
    strafeVector.set(rgtValue, 0, 0);
  }

  tempVector.copy(forwardVector).add(strafeVector).normalize();

  const angle = controls.getAzimuthalAngle();
  const rotationAngle = calculateRotationAngle(
    Stickman.stickmanModel.position.clone().normalize(),
    tempVector
  );

  updateStickmanOrientation(rotationAngle);

  Stickman.stickmanModel.lookAt(
    Stickman.stickmanModel.position.x + tempVector.x,
    Stickman.stickmanModel.position.y,
    Stickman.stickmanModel.position.z + tempVector.z
  );

  Stickman.stickmanModel.position.addScaledVector(tempVector, 1);
  
  //controls.target.set( mesh.position.x, mesh.position.y, mesh.position.z );
  // reposition camera
  camera.position.sub(controls.target)
  controls.target.copy(Stickman.stickmanModel.position)
  camera.position.add(Stickman.stickmanModel.position)
};

function addJoystick(){
   const options = {
        zone: document.getElementById('joystickWrapper1'),
        size: 120,
        multitouch: true,
        maxNumberOfNipples: 2,
        mode: 'static',
        restJoystick: true,
        shape: 'circle',
        // position: { top: 20, left: 20 },
        position: { top: '60px', left: '60px' },
        dynamicPage: true,
      }
   
   
  joyManager = nipplejs.create(options);
  
joyManager['0'].on('move', function (evt, data) {
        const forward = data.vector.y
        const turn = data.vector.x
        Stickman.run(true);

        if (forward < 0) {
          fwdValue = Math.abs(forward)
          bkdValue = 0
        } else {
          fwdValue = 0
          bkdValue = Math.abs(forward)
        }

        if (turn < 0) {
          lftValue = 0
          rgtValue = Math.abs(turn)
        } else {
          lftValue = Math.abs(turn)
          rgtValue = 0
        }
      })

     joyManager['0'].on('end', function (evt) {
        bkdValue = 0
        fwdValue = 0
        lftValue = 0
        rgtValue = 0
        Stickman.run(false);
      })
}