import * as THREE from 'three';
import GameState from '../../application/game';

export default function cameraFromGameState(gameState: GameState): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(
        50, 
        window.innerWidth / window.innerHeight, 
        0.25, 
        200
    );
    camera.position.set(
        gameState.currentLevel.camera.position.x, 
        gameState.currentLevel.camera.position.y, 
        gameState.currentLevel.camera.position.z
    );
    camera.lookAt(
        gameState.currentLevel.camera.direction.x,
        gameState.currentLevel.camera.direction.y,
        gameState.currentLevel.camera.direction.z
    );
    return camera;
}