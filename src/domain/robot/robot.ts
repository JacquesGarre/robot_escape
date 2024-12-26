import { threshold } from "three/src/nodes/TSL.js";
import Position from "../shared/position";
import { initialize } from "esbuild";

export default class Robot {

    name: string;
    animation: string;
    position: Position;
    rotation: number;
    speed: number;
    radius: number;
    direction: string;
    playAnimationOnce = false;

    constructor(
        name: string, 
        animation: string, 
        position: Position,
        direction: string, 
        speed: number,
    ) {
        this.name = name;
        this.animation = animation;
        this.position = position;
        this.direction = direction
        this.rotation = this.initializeRotation();
        this.speed = speed;
        this.radius = 0.9;
    }

    initializeRotation(): number {
        switch(this.direction) {
            case 'Forward':
                return 180
            case 'Backward':
                return 0
            case 'Left':
                return 270
            case 'Right':   
                return 90
        }
        return 180
    }


    idle() {
        if (this.animation == 'Death') {
            return;
        }
        this.animation = 'Idle'
    }

    dance() {
        if (this.animation == 'Death') {
            return;
        }
        this.animation = 'Dance'
    }

    jump() {
        if (this.animation == 'Death') {
            return;
        }
        this.animation = 'Jump'
    }

    wave() {
        if (this.animation == 'Death') {
            return;
        }
        this.animation = 'Wave'
    }

    moveForward(delta: number) {
        if (this.animation == 'Death') {
            return;
        }
        this.position.z -= delta * this.speed; 
        this.animation = 'Running';
    }

    rotateForward() {
        if (this.animation == 'Death') {
            return;
        }
        this.direction = 'Forward'
        this.rotation = 180
    }

    moveBackward(delta: number) {
        if (this.animation == 'Death') {
            return;
        }
        this.rotation = 0
        this.position.z += delta * this.speed; 
        this.animation = 'Running';
    }

    rotateBackward() {
        if (this.animation == 'Death') {
            return;
        }
        this.direction = 'Backward'
        this.rotation = 0
    }

    moveLeft(delta: number) {
        if (this.animation == 'Death') {
            return;
        }
        this.position.x -= delta * this.speed; 
        this.animation = 'Running';
    }

    rotateLeft() {
        if (this.animation == 'Death') {
            return;
        }
        this.direction = 'Left'
        this.rotation = 270
    }

    moveRight(delta: number) {
        if (this.animation == 'Death') {
            return;
        }
        this.position.x += delta * this.speed; 
        this.animation = 'Running';
    }

    rotateRight() {
        if (this.animation == 'Death') {
            return;
        }
        this.direction = 'Right'
        this.rotation = 90
    }

    break() {
        if (this.animation == 'Death') {
            return;
        }
        this.animation = 'Death';    
        setTimeout(() => {
            this.animation = 'Idle';
        }, 900);    
    }

    die() {
        if (this.animation == 'Death') {
            return;
        }
        this.playAnimationOnce = true;
        this.animation = 'Death';    
    }

}