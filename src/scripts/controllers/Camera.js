let width = window.innerWidth,
    height = window.innerHeight;

// Create a renderer and add it to the DOM.
let renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Create a camera
let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.z = -50;
camera.position.y = 50;

scene.add(camera);