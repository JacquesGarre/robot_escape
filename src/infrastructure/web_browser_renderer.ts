import * as THREE from 'three';

export default class WebBrowserRenderer extends THREE.WebGLRenderer {

    private constructor(callback: XRFrameRequestCallback) {
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

    static withAnimationLoop(callback: XRFrameRequestCallback): WebBrowserRenderer {
        return new WebBrowserRenderer(callback);
    }
    
}