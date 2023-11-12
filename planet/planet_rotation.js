
   
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);

const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector("#bg"),
});

renderer.setPixelRatio( window.devicePixelRatio);
/*
renderer.setSize ( window.innerWidth, window.innerHeight);
*/
renderer.setSize ( window.innerWidth, window.innerHeight);


camera.position.setZ(20);


camera.position.setY(10);
//camera.position.setX(-10);

camera.rotation.x = -0.3;

renderer.render (scene, camera);


const pointLight = new THREE.PointLight(0xffffff);

//const ambientLight = new THREE.AmbientLight(0xffffff);

pointLight.position.set(20,20,20);


scene.add(pointLight/*, ambientLight*/);


/*
const lightHelper = new THREE.PointLightHelper(pointLight);
*/
const gridHelper = new THREE.GridHelper(200, 50);



scene.add(/*lightHelper,*/ gridHelper);






const marsTexture = new THREE.TextureLoader().load('dw.jpg');

const mars = new THREE.Mesh(
	new THREE.SphereGeometry(7,16,16),
	new THREE.MeshStandardMaterial({ 
	
		map: marsTexture
	
	})
);

mars.position.set(0,5,0);



const cloudsTexture = new THREE.TextureLoader().load('Cloud_map.png');

const clouds = new THREE.Mesh(
	new THREE.SphereGeometry(7.1,32,32),
	new THREE.MeshPhongMaterial({ 

    	opacity: 0.5,
    	transparent: true,
		map: cloudsTexture
	
	})
);

clouds.position.set(0,5,0);

scene.add(mars, clouds);


const spaceTexture = new THREE.TextureLoader().load('spafce.jpg');
scene.background = spaceTexture;



function animate() {
  requestAnimationFrame (animate );


  
  //camera.rotation.z += 0.01;


  mars.rotation.y -= 0.007;
  mars.rotation.x -= 0.001;
  
  clouds.rotation.y -= 0.01;
  clouds.rotation.x -= 0.005;
  


  renderer.render (scene, camera);
};
animate(); 
