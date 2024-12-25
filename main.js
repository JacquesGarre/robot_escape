
import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import levelFromGameState from './src/infrastructure/factories/level_factory';
import cameraFromGameState from './src/infrastructure/factories/camera_factory';
import GameState from './src/application/game';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


let gameState, container, stats, clock;
let camera, level, renderer;
let robotModel;

init();

function init() {
    
    gameState = new GameState();

    // load robot model
    const loader = new GLTFLoader();
    loader.load('src/infrastructure/models/Robot.glb', function (gltf) {
        let model = gltf.scene;
        const mixer = new THREE.AnimationMixer(model);
        const actions = {};
        for (const clip of gltf.animations) {
            const action = mixer.clipAction(clip);
            actions[clip.name] = action;
        }
        model.name = gameState.currentLevel.robot.name;
        model.animations = gltf.animations
        model.userData.mixer = mixer;
        model.userData.actions = actions;
        model.userData.currentAction = gameState.currentLevel.robot.animation;
        model.castShadow = true;
        robotModel = model;
    }, undefined, function (e) {
        console.error(e);
    });
 

    // Keyboard
    window.addEventListener('keydown', gameState.onKeyDown.bind(gameState));
    window.addEventListener('keyup', gameState.onKeyUp.bind(gameState));

    // Dom
    container = document.createElement('div');
    document.body.appendChild(container);
    
    // Clock
    clock = new THREE.Clock();

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize);

    // Stats
    stats = new Stats();
    container.appendChild(stats.dom);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}



function animate() {
    const delta = clock.getDelta();

    // Level
    level = levelFromGameState(gameState)
    level.add(robotModel)

    const model = level.getObjectByName(gameState.currentLevel.robot.name);
    if (model) {
        model.position.set(
            gameState.currentLevel.robot.position.x,
            gameState.currentLevel.robot.position.y,
            gameState.currentLevel.robot.position.z
        );
        model.rotation.y = gameState.currentLevel.robot.rotation * (Math.PI / 180);
        const mixer = model.userData.mixer;
        const actions = model.userData.actions;
        if (mixer && actions) {
            if (model.userData.currentAction != gameState.currentLevel.robot.animation) {
                const currentAction = mixer.existingAction(model.userData.currentAction);
                currentAction.fadeOut(0.2);
                model.userData.currentAction = gameState.currentLevel.robot.animation
                actions[gameState.currentLevel.robot.animation].reset().fadeIn(0.2).play();
            } else {
                actions[gameState.currentLevel.robot.animation].play();
            }
            mixer.update(delta);
        }
    }

    const elevator = level.getObjectByName('Elevator')
    let geometry = elevator.geometry
    elevator.geometry.dispose();
    let newHeight = gameState.currentLevel.elevator.height
    elevator.geometry = new THREE.BoxGeometry(geometry.parameters.width, newHeight, geometry.parameters.depth);
    elevator.position.y = gameState.currentLevel.elevator.position.y + newHeight / 2;

    camera = cameraFromGameState(gameState)
    gameState.animate(delta);
    renderer.render(level, camera);
    stats.update();
}

