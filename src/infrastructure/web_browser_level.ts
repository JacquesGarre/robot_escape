import * as THREE from 'three';
import Level from '../domain/level';
import LevelObject from '../domain/level_object';

export default class WebBrowserLevel extends THREE.Scene {

    level: Level;

    private constructor(level: Level) {
        super();
        this.level = level;
        this.background = new THREE.Color(0xe0e0e0);
        this.fog = new THREE.Fog(0xe0e0e0, 20, 0);
        this.addLights();
        this.addMesh();
        this.addGrid();
        this.addBoxes();
    }

    static fromLevel(level: Level): WebBrowserLevel {
        return new WebBrowserLevel(level);
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
        mesh.position.x = -(this.level.size/2 - 1) * this.level.tileSize;
        mesh.position.z = (this.level.size/2 - 1) * this.level.tileSize;
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
        grid.position.x = -(this.level.size/2 - 1) * this.level.tileSize;
        grid.position.z = (this.level.size/2 - 1) * this.level.tileSize;
        this.add(grid);
    }

    addBoxes() {
        for(const box of this.level.boxes) {
            this.addLevelObject(box)
        }
    }

    addLevelObject(object: LevelObject) {
        const geometry = new THREE.BoxGeometry(object.width, object.height, object.depth);
        const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = object.center.x
        mesh.position.y = object.center.y
        mesh.position.z = object.center.z
        mesh.castShadow = true;
        this.add(mesh);
    }

}   