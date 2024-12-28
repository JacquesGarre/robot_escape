import * as THREE from 'three';

export default class ThreeRenderer extends THREE.WebGLRenderer {

    constructor(callback: XRFrameRequestCallback) {
        super({ antialias: true });
        this.setPixelRatio(window.devicePixelRatio);
        this.setSize(window.innerWidth, window.innerHeight);
        this.shadowMap.enabled = true;
        this.setAnimationLoop(callback);
        window.addEventListener('resize', this.onWindowResize);
    }

    onWindowResize() {
        this.setSize(window.innerWidth, window.innerHeight);
    }
    
}