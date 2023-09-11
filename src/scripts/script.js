import { updatePlayer, addJoystick } from './controllers/JoystickControls';
import { controls } from './controllers/JoystickControls.js';
// import { handleOrientation } from './controllers/GyroAndAcce.js';

// Create a light, set its position, and add it to the scene.
let light = new THREE.PointLight(0xffffff);
light.position.set(-100,200,100);
scene.add(light);

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
const clock = new THREE.Clock();
let previousTime = 0;

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
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // handleOrientation();

  Stickman.update(deltaTime);
  
  updatePlayer();

  renderer.render( scene, camera );
  controls.update();

  requestAnimationFrame( animate );
}
