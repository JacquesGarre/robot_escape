import * as THREE from 'three';
import Level from '../domain/level';
import LevelObject from '../domain/level_object';
import RobotModel from './robot_model';
import Robot from '../domain/robot';
import Game from '../domain/game';
import Elevator from '../domain/elevator';
import { Enemy } from '../domain/enemy';
import LevelObjectType from '../domain/level_object_type';
import PhysicalCoordinates from '../domain/physical_coordinates';

export default class WebBrowserScene extends THREE.Scene {

    previousLevel: Level | undefined;
    level: Level;
    nextLevel: Level | undefined;
    textures: {}
    levelName: THREE.Mesh | null;
    game: Game;

    private constructor(
        game: Game,
        robotModel: RobotModel | null,
        enemyModels: {},
        textures: {},
        delta: number
    ) {
        super();
        this.game = game;
        this.textures = textures;
        this.previousLevel = game.previousLevel();
        this.level = game.currentLevel();
        this.nextLevel = game.nextLevel();
        this.fog = new THREE.Fog(0xe0e0e0, 20, 0);
        this.addLights();
        this.addFloor();
        this.addTexts();
        this.addBoxes();
        this.addRobot(robotModel, delta);
        this.addElevator();
        this.addEnemies(enemyModels, delta);
        if(this.game.gameOver) {
            this.addGameOverScreen();
        }
    }

    static fromGame(
        game: Game,
        robotModel: RobotModel | null,
        enemyModels: {},
        textures: {},
        delta: number
    ): WebBrowserScene {
        return new WebBrowserScene(game, robotModel, enemyModels, textures, delta);
    }

    addLights() {
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 2);
        hemiLight.position.set(0, 20, 0);
        this.add(hemiLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 4);
        dirLight.position.set(30, 20, -10);
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 2000;
        dirLight.shadow.camera.bottom = - 2000;
        dirLight.shadow.camera.left = - 2000;
        dirLight.shadow.camera.right = 2000;
        dirLight.shadow.camera.near = 1200;
        dirLight.shadow.camera.far = 2500;
        dirLight.shadow.bias = 0.0001;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        this.add(dirLight);
    }

    addFloor() {

        if (this.previousLevel) {
            const secondLevelMesh = new THREE.Mesh(
                new THREE.BoxGeometry(
                    this.previousLevel.size * Level.TILESIZE,
                    this.previousLevel.size * Level.TILESIZE,
                    1
                ),
                new THREE.MeshStandardMaterial({
                    map: this.textures['Floor']
                })
            );
            secondLevelMesh.rotation.x = - Math.PI / 2;
            secondLevelMesh.position.x = -(this.previousLevel.size / 2) * Level.TILESIZE;
            secondLevelMesh.position.y = -1 * Elevator.MAX_HEIGHT;
            secondLevelMesh.position.z = this.previousLevel.size / 2 * Level.TILESIZE;
            secondLevelMesh.receiveShadow = true;
            this.add(secondLevelMesh);
        }

        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(
                this.level.size * Level.TILESIZE,
                this.level.size * Level.TILESIZE,
                1
            ),
            new THREE.MeshStandardMaterial({
                map: this.textures['Floor']
            })
        );
        mesh.rotation.x = - Math.PI / 2;
        mesh.position.x = -(this.level.size / 2) * Level.TILESIZE;
        mesh.position.y = -0.55;
        mesh.position.z = this.level.size / 2 * Level.TILESIZE;
        mesh.receiveShadow = true;
        this.add(mesh);

        if (this.nextLevel) {
            const thirdLevelMesh = new THREE.Mesh(
                new THREE.BoxGeometry(
                    this.nextLevel.size * Level.TILESIZE,
                    this.nextLevel.size * Level.TILESIZE,
                    1
                ),
                new THREE.MeshStandardMaterial({
                    map: this.textures['Floor']
                })
            );
            thirdLevelMesh.rotation.x = - Math.PI / 2;
            thirdLevelMesh.position.x = -(this.nextLevel.size / 2) * Level.TILESIZE;
            thirdLevelMesh.position.y = 1 * Elevator.MAX_HEIGHT;
            thirdLevelMesh.position.z = this.nextLevel.size / 2 * Level.TILESIZE;
            thirdLevelMesh.receiveShadow = true;
            this.add(thirdLevelMesh);
        }

    }

    addGrid() {

        if (this.previousLevel) {
            const previousLevelGrid = new THREE.GridHelper(
                this.previousLevel.size * Level.TILESIZE,
                this.previousLevel.size,
                0x000000,
                0x000000,
            );
            previousLevelGrid.material.opacity = 0.2;
            previousLevelGrid.material.transparent = true;
            previousLevelGrid.position.x = -(this.previousLevel.size / 2) * Level.TILESIZE;
            previousLevelGrid.position.y = -1 * Elevator.MAX_HEIGHT;
            previousLevelGrid.position.z = this.previousLevel.size / 2 * Level.TILESIZE;
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
        grid.position.x = -(this.level.size / 2) * Level.TILESIZE;
        grid.position.y = 0 * Elevator.MAX_HEIGHT;
        grid.position.z = this.level.size / 2 * Level.TILESIZE;
        this.add(grid);

        if (this.nextLevel) {
            const nextLevelGrid = new THREE.GridHelper(
                this.nextLevel.size * Level.TILESIZE,
                this.nextLevel.size,
                0x000000,
                0x000000,
            );
            nextLevelGrid.material.opacity = 0.2;
            nextLevelGrid.material.transparent = true;
            nextLevelGrid.position.x = -(this.nextLevel.size / 2) * Level.TILESIZE;
            nextLevelGrid.position.y = 1 * Elevator.MAX_HEIGHT;
            nextLevelGrid.position.z = this.nextLevel.size / 2 * Level.TILESIZE;
            this.add(nextLevelGrid);
        }

    }

    addBoxes() {
        if (this.previousLevel) {
            for (const box of this.previousLevel.boxes) {
                this.addLevelObject(-1, box, 0x808080, 1, this.textures[box.type])
            }
        }
        for (const box of this.level.boxes) {
            this.addLevelObject(0, box, 0x808080, 1, this.textures[box.type])
        }
        if (this.nextLevel) {
            for (const box of this.nextLevel.boxes) {
                this.addLevelObject(1, box, 0x808080, 1, this.textures[box.type])
            }
        }

    }

    addLevelObject(levelIndex: number, object: LevelObject, color: number, opacity: number, texture?: THREE.Texture) {
        const geometry = new THREE.BoxGeometry(object.width, object.height, object.depth);
        let material = new THREE.MeshStandardMaterial({
            color: color,
            transparent: true,
            opacity: opacity,
        });
        if (texture) {
            material = new THREE.MeshStandardMaterial({
                map: texture
            });
        }
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = -object.center.x
        mesh.position.y = object.center.y + levelIndex * Elevator.MAX_HEIGHT
        mesh.position.z = object.center.z
        mesh.rotation.y = object.rotation * (Math.PI / 180);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
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
            this.addLevelObject(-1, this.previousLevel.elevator, 0xe0e0e0, 1)
        }
        this.addLevelObject(0, this.level.elevator, 0xe0e0e0, 1);
        if (this.nextLevel) {
            this.addLevelObject(1, this.nextLevel.elevator, 0xe0e0e0, 1)
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
            robot.center.y - robot.height / 2,
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
        for (const enemy of this.level.enemies) {
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
            enemy.center.y - enemy.height / 2,
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

    addTexts() {
        this.addText(
            `LEVEL ${this.level.index+1}`, 
            100, 
            new PhysicalCoordinates(
                (-this.level.size / 2 * Level.TILESIZE),
                18,
                this.level.size * Level.TILESIZE
            ),
            '#e0e0e0'
        );
        this.addText(
            this.level.name, 
            100, 
            new PhysicalCoordinates(
                (-this.level.size / 2 * Level.TILESIZE),
                15,
                this.level.size * Level.TILESIZE
            ),
            '#e0e0e0'
        );
        this.addText(
            this.level.description, 
            50, 
            new PhysicalCoordinates(
                (-this.level.size / 2 * Level.TILESIZE),
                13,
                this.level.size * Level.TILESIZE
            ),
            '#e0e0e0'
        );
    }

    addText(
        text: string, 
        fontSize: number, 
        coordinates: PhysicalCoordinates,
        color: string,
    ) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.width = 1024;
        canvas.height = 128;
        context.font = `bold ${fontSize}px Arial`;
        context.fillStyle = color;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const aspect = canvas.width / canvas.height;
        const geometry = new THREE.PlaneGeometry(
            aspect * 2, 2
        );
        const textMesh = new THREE.Mesh(geometry, material);
        textMesh.position.set(
            coordinates.x,
            coordinates.y,
            coordinates.z
        );
        textMesh.rotateY(180 * (Math.PI / 180));
        this.add(textMesh);
    }

    addGameOverScreen() {
        this.addText(
            "You died!", 
            100,             
            new PhysicalCoordinates(
                -this.level.robot.center.x,
                16,
                this.level.robot.center.z
            ),
            '#eb2113'
        )
        this.addRestartLevelButton();
    }

    addRestartLevelButton() {
        if (document.getElementById('restartButton')) { 
            return;
        }
        const button = document.createElement('button');
        button.id = 'restartButton';
        button.textContent = 'Restart Level';
        button.style.position = 'absolute';
        button.style.bottom = '15px';
        button.style.left = '50%';
        button.style.transform = 'translateX(-50%)';
        button.style.zIndex = '100';
        button.style.padding = '15px 30px';
        button.style.fontSize = '20px';
        button.style.fontFamily = "Arial";
        button.style.color = '#fff';
        button.style.backgroundColor = '#444';
        button.style.border = '2px solid rgba(235, 33, 19, 0.57)';
        button.style.borderRadius = '10px';
        button.style.cursor = 'pointer';
        button.style.boxShadow = '0px 5px 15px rgba(0, 0, 0, 0.5)';
        button.style.transition = 'all 0.3s ease';
        button.onmouseover = () => {
            button.style.backgroundColor = 'rgba(235, 33, 19, 0.57)';
            button.style.color = '#000';
        };
        button.onmouseout = () => {
            button.style.backgroundColor = '#444';
            button.style.color = '#fff';
        };
        button.onclick = () => {
            const btn = document.getElementById('restartButton');
            if  (btn) {
                btn.remove();
            }
            this.game.restartLevel();
        }
        document.body.appendChild(button);
    }

}   