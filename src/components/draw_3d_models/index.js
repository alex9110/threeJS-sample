import React, { Component } from 'react';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';

import modelLoader from './modelLoader.js';
let modelsUrl = ['http://localhost:5000/glt'];

function start(canvas) {

  const width = window.innerWidth;
  const height = window.innerHeight;

  const guiModel = {
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    rotationX: 0,
    rotationY: -0.001,
    rotationZ: 0
  }


  canvas.width = width;
  canvas.height = height;
  let camera, scene, renderer, controls, light;

  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setClearColor(0x000000);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  camera.position.set(0, 10, 37);
  controls = new TrackballControls( camera, renderer.domElement );
  light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  
  let gltfModel = {};
  modelLoader(modelsUrl, (data) => {
    console.log(data);
    for (let item of data) {
      // gltfModel = scene;
      if (!item.error) {
        scene.add(item.model.scene);
        animate();
      }
    }
  }, false);


  function animate() {

    
    // gltfModel.position.x += guiModel.positionX;
    // gltfModel.position.y += guiModel.positionY;
    // gltfModel.position.z += guiModel.positionZ;
    // gltfModel.rotation.x += guiModel.rotationX;
    // gltfModel.rotation.y += guiModel.rotationY;
    // gltfModel.rotation.z += guiModel.rotationZ;

    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(() => { animate(); });
  }

}


class Canvas extends Component {
  componentDidMount() {
    const canvas = document.getElementById('canvas');
    start(canvas);
  }
  render() { return <canvas id="canvas"></canvas>; }
}


export default Canvas;