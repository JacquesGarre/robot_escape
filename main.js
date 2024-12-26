
import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import levelFromGameState from './src/infrastructure/factories/level_factory';
import cameraFromGameState from './src/infrastructure/factories/camera_factory';
import GameState from './src/application/game';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


let gameState, container, stats, clock;
let camera, level, renderer;
let robotModel;
let enemyModels = {};

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

    for(const i in gameState.currentLevel.enemies) {
        let enemy = gameState.currentLevel.enemies[i]
        loader.load('src/infrastructure/models/Robot.glb', function (gltf) {
            let model = gltf.scene;
            const mixer = new THREE.AnimationMixer(model);
            const actions = {};
            for (const clip of gltf.animations) {
                const action = mixer.clipAction(clip);
                actions[clip.name] = action;
            }
            model.name = enemy.name;
            model.animations = gltf.animations
            model.userData.mixer = mixer;
            model.userData.actions = actions;
            model.userData.currentAction = enemy.animation;
            model.castShadow = true;
            enemyModels[i] = model;
        }, undefined, function (e) {
            console.error(e);
        });
    }

 

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

    if (robotModel) {
        level.add(robotModel)
        robotModel.position.set(
            gameState.currentLevel.robot.position.x,
            gameState.currentLevel.robot.position.y,
            gameState.currentLevel.robot.position.z
        );
        robotModel.rotation.y = gameState.currentLevel.robot.rotation * (Math.PI / 180);
        const mixer = robotModel.userData.mixer;
        const actions = robotModel.userData.actions;
        if (mixer && actions) {
            const newAction = actions[gameState.currentLevel.robot.animation];
            if (robotModel.userData.currentAction != gameState.currentLevel.robot.animation) {
                const currentAction = mixer.existingAction(robotModel.userData.currentAction);
                currentAction.fadeOut(0.2);
                robotModel.userData.currentAction = gameState.currentLevel.robot.animation
                newAction.reset().fadeIn(0.2);
            }
            if (gameState.currentLevel.robot.playAnimationOnce) {
                newAction.setLoop(THREE.LoopOnce, 1);
                newAction.clampWhenFinished = true;
            }
            newAction.play();
            mixer.update(delta);
        }
    }

    for(const i in gameState.currentLevel.enemies) {
        let enemyModel = enemyModels[i]
        if (enemyModel) {
            level.add(enemyModel)
            enemyModel.position.set(
                gameState.currentLevel.enemies[i].position.x,
                gameState.currentLevel.enemies[i].position.y,
                gameState.currentLevel.enemies[i].position.z
            );
            enemyModel.rotation.y = gameState.currentLevel.enemies[i].rotation * (Math.PI / 180);
            const mixer = enemyModel.userData.mixer;
            const actions = enemyModel.userData.actions;
            if (mixer && actions) {
                const newAction = actions[gameState.currentLevel.enemies[i].animation]
                if (enemyModel.userData.currentAction != gameState.currentLevel.enemies[i].animation) {
                    const currentAction = mixer.existingAction(enemyModel.userData.currentAction);
                    currentAction.fadeOut(0.2);
                    enemyModel.userData.currentAction = gameState.currentLevel.enemies[i].animation
                    newAction.reset().fadeIn(0.2);
                } 
                if (gameState.currentLevel.enemies[i].playAnimationOnce) {
                    newAction.setLoop(THREE.LoopOnce, 1);
                    newAction.clampWhenFinished = true;
                }
                newAction.play();
                mixer.update(delta);
            }
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

