import * as THREE from "three";

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#app"),
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.localClippingEnabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

export default renderer;
