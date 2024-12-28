import * as THREE from 'three';
import Level from '../domain/level';

export default class ThreeLevel extends THREE.Scene {

    level: Level;

    constructor(level: Level) {
        super();
        this.level = level;
        this.background = new THREE.Color(0xe0e0e0);
        this.fog = new THREE.Fog(0xe0e0e0, 20, 0);
        this.addLights();
        this.addMesh();
        this.addGrid();
    }

    addLights() {
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 2);
        hemiLight.position.set(0, 20, 0);
        this.add(hemiLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 3);
        dirLight.position.set(0, 20, 10);
        this.add(dirLight);
    }

    addMesh() {
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(
                this.level.size * this.level.tileSize, 
                this.level.size * this.level.tileSize, 
            ), 
            new THREE.MeshStandardMaterial({ 
                color: 0xcbcbcb, 
                depthWrite: false 
            })
        );
        mesh.rotation.x = - Math.PI / 2;
        this.add(mesh);
    }

    addGrid() {
        const grid = new THREE.GridHelper(
            this.level.size * this.level.tileSize, 
            this.level.size,  
            0x000000, 
            0x000000,
        );
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        this.add(grid);
    }

}   