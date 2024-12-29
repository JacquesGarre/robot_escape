import * as THREE from 'three';
import Level from '../domain/level';
import LevelObject from '../domain/level_object';
import RobotModel from './robot_model';
import Robot from '../domain/robot';
import Game from '../domain/game';
import Elevator from '../domain/elevator';
import { Enemy } from '../domain/enemy';

export default class WebBrowserScene extends THREE.Scene {

    previousLevel: Level | undefined;
    level: Level;
    nextLevel: Level | undefined;

    private constructor(
        game: Game, 
        robotModel: RobotModel | null, 
        enemyModels: {},
        delta: number
    ) {
        super();
        this.previousLevel = game.previousLevel();
        this.level = game.currentLevel();
        this.nextLevel = game.nextLevel();
        this.background = new THREE.Color(0xe0e0e0);
        this.fog = new THREE.Fog(0xe0e0e0, 20, 0);
        this.addLights();
        this.addMesh();
        this.addGrid();
        this.addBoxes();
        this.addRobot(robotModel, delta);
        this.addElevator();
        this.addEnemies(enemyModels, delta);
    }

    static fromGame(
        game: Game, 
        robotModel: RobotModel | null, 
        enemyModels: {}, 
        delta: number
    ): WebBrowserScene {
        return new WebBrowserScene(game, robotModel, enemyModels, delta);
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

        if(this.previousLevel) {
            const secondLevelMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(
                    this.previousLevel.size * Level.TILESIZE, 
                    this.previousLevel.size * Level.TILESIZE, 
                ), 
                new THREE.MeshStandardMaterial({ 
                    color: 0xcbcbcb, 
                    depthWrite: false 
                })
            );
            secondLevelMesh.rotation.x = - Math.PI / 2;
            secondLevelMesh.position.x = -(this.previousLevel.size/2) * Level.TILESIZE;
            secondLevelMesh.position.y = -1 * Elevator.MAX_HEIGHT;
            secondLevelMesh.position.z = this.previousLevel.size/2 * Level.TILESIZE;
            this.add(secondLevelMesh);
        }

        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(
                this.level.size * Level.TILESIZE, 
                this.level.size * Level.TILESIZE, 
            ), 
            new THREE.MeshStandardMaterial({ 
                color: 0xcbcbcb, 
                depthWrite: false 
            })
        );
        mesh.rotation.x = - Math.PI / 2;
        mesh.position.x = -(this.level.size/2) * Level.TILESIZE;
        mesh.position.y = 0 * Elevator.MAX_HEIGHT;
        mesh.position.z = this.level.size/2 * Level.TILESIZE;
        this.add(mesh);

        if(this.nextLevel) {
            const secondLevelMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(
                    this.nextLevel.size * Level.TILESIZE, 
                    this.nextLevel.size * Level.TILESIZE, 
                ), 
                new THREE.MeshStandardMaterial({ 
                    color: 0xcbcbcb, 
                    depthWrite: false 
                })
            );
            secondLevelMesh.rotation.x = - Math.PI / 2;
            secondLevelMesh.position.x = -(this.nextLevel.size/2) * Level.TILESIZE;
            secondLevelMesh.position.y = 1 * Elevator.MAX_HEIGHT;
            secondLevelMesh.position.z = this.nextLevel.size/2 * Level.TILESIZE;
            this.add(secondLevelMesh);
        }

    }

    addGrid() {

        if(this.previousLevel) {
            const previousLevelGrid = new THREE.GridHelper(
                this.previousLevel.size * Level.TILESIZE, 
                this.previousLevel.size,  
                0x000000, 
                0x000000,
            );
            previousLevelGrid.material.opacity = 0.2;
            previousLevelGrid.material.transparent = true;
            previousLevelGrid.position.x = -(this.previousLevel.size/2) * Level.TILESIZE;
            previousLevelGrid.position.y = -1 * Elevator.MAX_HEIGHT;
            previousLevelGrid.position.z = this.previousLevel.size/2 * Level.TILESIZE;
            this.add(previousLevelGrid);
        }

        const grid = new THREE.GridHelper(
            this.level.size * Level.TILESIZE, 
            this.level.size,  
            0x000000, 
            0x000000,
        );
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        grid.position.x = -(this.level.size/2) * Level.TILESIZE;
        grid.position.y = 0 * Elevator.MAX_HEIGHT;
        grid.position.z = this.level.size/2 * Level.TILESIZE;
        this.add(grid);

        if(this.nextLevel) {
            const nextLevelGrid = new THREE.GridHelper(
                this.nextLevel.size * Level.TILESIZE, 
                this.nextLevel.size,  
                0x000000, 
                0x000000,
            );
            nextLevelGrid.material.opacity = 0.2;
            nextLevelGrid.material.transparent = true;
            nextLevelGrid.position.x = -(this.nextLevel.size/2) * Level.TILESIZE;
            nextLevelGrid.position.y = 1 * Elevator.MAX_HEIGHT;
            nextLevelGrid.position.z = this.nextLevel.size/2 * Level.TILESIZE;
            this.add(nextLevelGrid);
        }

    }

    addBoxes() {
        if(this.previousLevel) {
            for(const box of this.previousLevel.boxes) {
                this.addLevelObject(-1, box, 0x808080, 1)
            }
        }
        for(const box of this.level.boxes) {
            this.addLevelObject(0, box, 0x808080, 1)
        }
        if(this.nextLevel) {
            for(const box of this.nextLevel.boxes) {
                this.addLevelObject(1, box, 0x808080, 1)
            }
        }

    }

    addLevelObject(levelIndex: number, object: LevelObject, color: number, opacity: number) {
        const geometry = new THREE.BoxGeometry(object.width, object.height, object.depth);
        const material = new THREE.MeshStandardMaterial({ 
            color: color,
            transparent: true, 
            opacity: opacity
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = -object.center.x
        mesh.position.y = object.center.y + levelIndex * Elevator.MAX_HEIGHT
        mesh.position.z = object.center.z
        mesh.rotation.y = object.rotation * (Math.PI / 180);
        mesh.castShadow = true;
        this.add(mesh);
    }

    addRobot(
        robotModel: RobotModel | null, 
        delta: number
    ) {
        if (robotModel) {
            this.addRobotModel(this.level.robot, robotModel, delta);
        } else {
            this.addLevelObject(0, this.level.robot, 0x000000, 0.1)
        }
    }

    addElevator() {
        if (this.previousLevel) {
            this.previousLevel.elevator.setHeight(Elevator.MAX_HEIGHT)
            this.addLevelObject(-1, this.previousLevel.elevator, 0x000000, 1)
        }
        this.addLevelObject(0, this.level.elevator, 0x000000, 1);
        if (this.nextLevel) {
            this.addLevelObject(1, this.nextLevel.elevator, 0x000000, 1)
        }
    }

    addRobotModel(
        robot: Robot, 
        robotModel: RobotModel, 
        delta: number
    ) {
        const mixer = robotModel.model.userData.mixer;
        const model = robotModel.model;
        const actions = model.userData.actions;
        model.position.set(
            -robot.center.x,
            robot.center.y - robot.height/2,
            robot.center.z
        );
        model.rotation.y = robot.rotation * (Math.PI / 180);
        const action = actions[robot.animation];
        if (model.userData.currentAction && model.userData.currentAction != robot.animation) {
            const currentAction = actions[model.userData.currentAction]
            currentAction.fadeOut(0.2);
            action.reset().fadeIn(0.2);
        }        
        if (!robot.animationLoop) {
            action.setLoop(THREE.LoopOnce, 1);
            action.clampWhenFinished = true;
        }
        action.play();
        mixer.update(delta);
        model.userData.currentAction = robot.animation;
        this.add(model);
    }

    addEnemies(
        enemyModels: {}, 
        delta: number
    ) {
        for(const enemy of this.level.enemies) {
            let key = `${this.level.index}-${enemy.index}`
            let enemyModel = enemyModels[key]
            if (!enemyModel) {
                continue;
            }
            this.addEnemyModel(enemy, enemyModel, delta);
        }
    }

    addEnemyModel(
        enemy: Enemy, 
        robotModel: RobotModel, 
        delta: number
    ) {
        const mixer = robotModel.model.userData.mixer;
        const model = robotModel.model;
        const actions = model.userData.actions;
        model.position.set(
            -enemy.center.x,
            enemy.center.y - enemy.height/2,
            enemy.center.z
        );
        model.rotation.y = enemy.rotation * (Math.PI / 180);
        const action = actions[enemy.animation];
        if (model.userData.currentAction && model.userData.currentAction != enemy.animation) {
            const currentAction = actions[model.userData.currentAction]
            currentAction.fadeOut(0.2);
            action.reset().fadeIn(0.2);
        }        
        if (!enemy.animationLoop) {
            action.setLoop(THREE.LoopOnce, 1);
            action.clampWhenFinished = true;
        }
        action.play();
        mixer.update(delta);
        model.userData.currentAction = enemy.animation;
        this.add(model);
    }

}   