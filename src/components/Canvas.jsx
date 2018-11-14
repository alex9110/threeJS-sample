import React, { Component } from 'react';
//import { WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, PlaneGeometry, SphereGeometry, MeshBasicMaterial, Mesh, FaceColors } from 'three';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import * as textures from './textures';



const gui = new dat.GUI();

function start(canvas) {
  console.log(textures);

  const width = window.innerWidth;
  const height = window.innerHeight;


  const guiBall = {
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    rotationX: 0,
    rotationY: -0.01,
    rotationZ: 0
  }
  const guiCamera = {
    cameraX: 0,
    cameraY: 0,
    cameraZ: 0
  }
  //для управления мешом через интерфейс dat.GUI() в браузере, передаем обект и имя свойства которое нужно менять
 
  gui.add(guiBall, 'positionX').min(-1).max(1).step(0.001);
  gui.add(guiBall, 'positionY').min(-1).max(1).step(0.001);
  gui.add(guiBall, 'positionZ').min(-2).max(2).step(0.001);
  gui.add(guiBall, 'rotationX').min(-0.1).max(0.1).step(0.0001);
  gui.add(guiBall, 'rotationY').min(-0.1).max(0.1).step(0.0001);
  gui.add(guiBall, 'rotationZ').min(-0.1).max(0.1).step(0.0001);

  gui.add(guiCamera, 'cameraX').min(-500).max(1000).step(10);
  gui.add(guiCamera, 'cameraY').min(-300).max(300).step(10);
  gui.add(guiCamera, 'cameraZ').min(-1500).max(4000).step(10);
  /////////////////////////////////////////////

  


  // canvas.setAttribute('width', width);
  // canvas.setAttribute('height', height);

  canvas.width = width;
  canvas.height = height;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setClearColor(0x000000);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  camera.position.set(0, 0, 0);

  const light = new THREE.AmbientLight(0xffffff);

  scene.add(light);

  const earthGeometry = new THREE.SphereGeometry(200, 100, 100);
  const earthMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    wireframe: true,
    vertexColors:
    THREE.FaceColors,
    map: new THREE.TextureLoader().load(textures.earth)

  });
  // for (let i = 0; i < earthGeometry.faces.length; i++) {
    //   earthGeometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
    // }
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(0, 0, -1000);
  
    scene.add(earth);


  const lavaGeometry = new THREE.SphereGeometry(80, 50, 50);
  const lavaMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    wireframe: true,
    vertexColors:
    THREE.FaceColors,
    map: new THREE.TextureLoader().load(textures.lava)

  });
  const lava = new THREE.Mesh(lavaGeometry, lavaMaterial);
  scene.add(lava);
  lava.position.set(0, 0, -1000);

 
    


  function loop() {
    earth.position.x += guiBall.positionX;
    earth.position.y += guiBall.positionY;
    earth.position.z += guiBall.positionZ;
    earth.rotation.x += guiBall.rotationX;
    earth.rotation.y += guiBall.rotationY;
    earth.rotation.z += guiBall.rotationZ;


    lava.position.x += guiBall.positionX;
    lava.position.y += guiBall.positionY;
    lava.position.z += guiBall.positionZ;
    lava.rotation.x += guiBall.rotationX;
    lava.rotation.y += guiBall.rotationY;
    lava.rotation.z += guiBall.rotationZ;


    camera.position.x = guiCamera.cameraX;
    camera.position.y = guiCamera.cameraY;
    camera.position.z = guiCamera.cameraZ;

    

    renderer.render(scene, camera);
    requestAnimationFrame(() => { loop(); });
  }
  loop();

  // console.log(renderer);
}





class Canvas extends Component {

  constructor(props) {
    super(props);
    // console.log("constructor");
  }

  componentDidMount() {
    const canvas = document.getElementById('canvas');
    start(canvas);
  }

  render() {
    console.log("render()");
    return <canvas id="canvas"></canvas>;
  }
}


export default Canvas;