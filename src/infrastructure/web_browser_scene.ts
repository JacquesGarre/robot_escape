import * as THREE from 'three';
import Level from '../domain/level';
import LevelObject from '../domain/level_object';
import RobotModel from './robot_model';
import Robot from '../domain/robot';

export default class WebBrowserScene extends THREE.Scene {

    level: Level;

    private constructor(
        level: Level, 
        robotModel: RobotModel | null, 
        delta: number
    ) {
        super();
        this.level = level;
        this.background = new THREE.Color(0xe0e0e0);
        this.fog = new THREE.Fog(0xe0e0e0, 20, 0);
        this.addLights();
        this.addMesh();
        this.addGrid();
        this.addBoxes();
        this.addRobot(robotModel, delta);
        this.addElevator();
    }

    static fromLevel(
        level: Level, 
        robotModel: RobotModel | null, 
        delta: number
    ): WebBrowserScene {
        return new WebBrowserScene(level, robotModel, delta);
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
        mesh.position.z = this.level.size/2 * Level.TILESIZE;
        this.add(mesh);
    }

    addGrid() {
        const grid = new THREE.GridHelper(
            this.level.size * Level.TILESIZE, 
            this.level.size,  
            0x000000, 
            0x000000,
        );
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        grid.position.x = -(this.level.size/2) * Level.TILESIZE;
        grid.position.z = this.level.size/2 * Level.TILESIZE;
        this.add(grid);
    }

    addBoxes() {
        for(const box of this.level.boxes) {
            this.addLevelObject(box, 0x808080, 1)
        }
    }

    addLevelObject(object: LevelObject, color: number, opacity: number) {
        const geometry = new THREE.BoxGeometry(object.width, object.height, object.depth);
        const material = new THREE.MeshStandardMaterial({ 
            color: color,
            transparent: true, 
            opacity: opacity
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = -object.center.x
        mesh.position.y = object.center.y
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
            this.addLevelObject(this.level.robot, 0x000000, 0.1)
        }
    }

    addElevator() {
        this.addLevelObject(this.level.elevator, 0x000000, 1)
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
        action.play();
        mixer.update(delta);
        model.userData.currentAction = robot.animation;
        this.add(model);
    }

}   