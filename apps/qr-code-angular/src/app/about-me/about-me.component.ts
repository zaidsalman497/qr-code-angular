import { Component, OnInit } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  loading = false
  animation: any

  constructor( public auth: AuthService ) { } 

  ngOnInit(): void {
    this.render3d( window.innerHeight);
  }

  render3d(height: number): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / height, 0.1, 1000 )
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg') as any,
    });
  
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, height );
    camera.position.setZ(30);
    
    renderer.render( scene, camera );
    
     const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
     const material = new THREE.MeshStandardMaterial( { color: 0xFF634 } );
     const torus = new THREE.Mesh( geometry, material )
  
     scene.add(torus)
     
     const pointLight = new THREE.PointLight(0xffffff)
     const ambientLight = new THREE.AmbientLight(0xffffff)
     const lighthelper = new THREE.PointLightHelper(pointLight)
     const gridhelper = new THREE.GridHelper(200, 50)

     pointLight.position.set(20,20,20)

     scene.add(pointLight, ambientLight)

     scene.add(lighthelper, gridhelper)

     const control = new OrbitControls(camera, renderer.domElement);

     function addStar() {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);
    
      const [x, y, z] = Array(3).fill(camera).map(() => THREE.MathUtils.randFloatSpread(100));
    
      star.position.set(x, y, z);
      scene.add(star);
    }

    const spaceTexture = new THREE.TextureLoader().load('../../assets/img/space.jpg');
    scene.background = spaceTexture;

    const zaidTexture = new THREE.TextureLoader().load('../../assets/img/zaid.jpg');

     const zaid = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: zaidTexture }));

    scene.add(zaid);

    const sunTexture = new THREE.TextureLoader().load('../../assets/img/download.jpg');
const normalTexture = new THREE.TextureLoader().load('../../assets/img/normal.jpg');

const moonTexture = new THREE.TextureLoader().load('../../assets/img/moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture,
  })
);
scene.add(sun);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

zaid.position.z = -5;
zaid.position.x = 2;


    
    Array(200).fill(camera).forEach(addStar);    

     function animate() {
      requestAnimationFrame(animate);
    
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;
    
      moon.rotation.x += 0.005;
    
      // controls.update();
    
      renderer.render(scene, camera);
    }
    
    animate();
  }
}
