import * as THREE from 'three';
import Camera from '../domain/camera';

export default class WebBrowserCamera extends THREE.PerspectiveCamera {

    private constructor(camera: Camera) {
        super(
            50, 
            window.innerWidth / window.innerHeight, 
            0.25, 
            200
        );
        this.position.set(
            camera.position.x, 
            camera.position.y, 
            camera.position.z
        );
        this.lookAt(
            camera.direction.x,
            camera.direction.y,
            camera.direction.z
        );
    }

    static fromCamera(camera: Camera): WebBrowserCamera {
        return new WebBrowserCamera(camera);
    }

}