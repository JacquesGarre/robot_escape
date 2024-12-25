import * as THREE from 'three';
import GameState from '../../application/game';


export default function levelFromGameState(gameState: GameState): THREE.Scene {

    // scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(gameState.currentLevel.scene.backgroundColor);
    scene.fog = new THREE.Fog(
        gameState.currentLevel.scene.fog.color, 
        gameState.currentLevel.scene.fog.near, 
        gameState.currentLevel.scene.fog.far
    );

    // hemisphere light
    const hemiLight = new THREE.HemisphereLight(
        gameState.currentLevel.scene.hemisphereLight.skyColor, 
        gameState.currentLevel.scene.hemisphereLight.groundColor, 
        gameState.currentLevel.scene.hemisphereLight.intensity
    );
    hemiLight.position.set(
        gameState.currentLevel.scene.hemisphereLight.position.x,
        gameState.currentLevel.scene.hemisphereLight.position.y,
        gameState.currentLevel.scene.hemisphereLight.position.z,
    );
    scene.add(hemiLight);

    // directional light
    const dirLight = new THREE.DirectionalLight(
        gameState.currentLevel.scene.directionalLight.color, 
        gameState.currentLevel.scene.directionalLight.intensity
    );
    dirLight.position.set(
        gameState.currentLevel.scene.directionalLight.position.x,
        gameState.currentLevel.scene.directionalLight.position.y,
        gameState.currentLevel.scene.directionalLight.position.z,
    );
    scene.add(dirLight);

    // ground
    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(
            gameState.currentLevel.scene.ground.width, 
            gameState.currentLevel.scene.ground.height
        ), 
        new THREE.MeshStandardMaterial({ 
            color: gameState.currentLevel.scene.ground.color, 
            depthWrite: false 
        })
    );
    mesh.rotation.x = - Math.PI / 2;
    scene.add(mesh);

    // grid
    const grid = new THREE.GridHelper(
        gameState.currentLevel.scene.grid.size, 
        gameState.currentLevel.scene.grid.divisions,  
        gameState.currentLevel.scene.grid.color1, 
        gameState.currentLevel.scene.grid.color2, 
    );
    grid.material.opacity = gameState.currentLevel.scene.grid.opacity;
    grid.material.transparent = true;
    scene.add(grid);

    // boxes
    for(const cube of gameState.currentLevel.scene.cubes) {
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
        const box = new THREE.Mesh(geometry, material);
        box.position.x = cube.position.x
        box.position.y = cube.position.y
        box.position.z = cube.position.z
        box.castShadow = true;
        scene.add(box);
    }

    // elevator
    const geometry = new THREE.BoxGeometry(5, gameState.currentLevel.elevator.height, 5);
    const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const elevator = new THREE.Mesh(geometry, material);
    elevator.position.x = gameState.currentLevel.elevator.position.x
    elevator.position.y = gameState.currentLevel.elevator.position.y
    elevator.position.z = gameState.currentLevel.elevator.position.z
    elevator.castShadow = true;
    elevator.name = 'Elevator'
    scene.add(elevator);
    
    return scene;
}