//Variables for setup
let container;
let camera;
let renderer;
let scene;
let controls;
init();

function init() 
{
  // conatiner is a HTML div 
  container = document.querySelector(".scene");

  //Creating a scene
  scene = new THREE.Scene();

  // Camera Setup Here
  const fov = 10;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-30,80,200);
  
  const ambient = new THREE.AmbientLight(0x8D8282,0.1);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(50, 50, 100);
   scene.add(light);
  
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);


  //Loading Model
  let loader = new THREE.STLLoader();
  loader.load("./models/Shoulder_Bone.stl", function(stl_model) {

    var material = new THREE.MeshPhongMaterial({
      color: 0xDBD9D9,
      specular: 10,
      shininess: 10,
    });
    var mesh = new THREE.Mesh(stl_model, material);
    scene.add(mesh);
    //console.log(stl_model);
    animate();
  });
}

//Here we are animating the scene and starting a loop that will render scene and camera 
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// It is making our webpage responsive it will adjust height and width according to clients window size
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}
window.addEventListener("resize", onWindowResize);
