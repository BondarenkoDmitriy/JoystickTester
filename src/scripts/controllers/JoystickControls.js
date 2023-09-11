import {
    OrbitControls
} from "https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js"

// vars
let fwdValue = 0;
let bkdValue = 0;
let rgtValue = 0;
let lftValue = 0;
let tempVector = new THREE.Vector3();
let upVector = new THREE.Vector3(0, 1, 0);
let joyManager;

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

    let currentRotationAngle = 0;
    const rotationSpeed = 0.1;
  
  export function updatePlayer(){
    if(!Stickman.StickmanIsLoaded) return;
  
    // move the player
    let forwardVector = new THREE.Vector3();
    let strafeVector = new THREE.Vector3();
  
    if (fwdValue > 0) {
      forwardVector.set(0, 0, -fwdValue);
    } else {
      forwardVector.set(0, 0, bkdValue);
    }
  
    if (lftValue > 0) {
      strafeVector.set(-lftValue, 0, 0);
    } else {
      strafeVector.set(rgtValue, 0, 0);
    }
  
    tempVector.copy(forwardVector).add(strafeVector).normalize();
  
    const angle = controls.getAzimuthalAngle();
    const rotationAngle = calculateRotationAngle(
      Stickman.stickmanModel.position.clone().normalize(),
      tempVector
    );
  
    currentRotationAngle = THREE.MathUtils.lerp(currentRotationAngle, rotationAngle, rotationSpeed);
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

  export { controls };
  
 export function addJoystick() {
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

        Stickman.isRunning = true;
        Stickman.run();

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

        Stickman.isRunning = false;
        Stickman.stop();
    })
  }