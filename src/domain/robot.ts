import Boundaries from "./boundaries";
import Box from "./box";
import Controls from "./controls";
import Elevator from "./elevator";
import { Enemy } from "./enemy";
import GridCoordinates from "./grid_coordinates";
import RobotConfig from "./interface/robot_config";
import Level from "./level";
import LevelObject from "./level_object";
import LevelObjectType from "./level_object_type";
import Noise from "./noise";
import RobotState from "./robot_state";
import Utils from "./utils";

export default class Robot extends LevelObject {

    static ROBOT_SIZE = 2.5;
    static ROBOT_HEIGHT = 5;
    static SPEED = 2.5;

    coordinates: GridCoordinates;
    animation: string;
    animationLoop: boolean;
    isDead: boolean;
    playingPunchSound: boolean = false;

    constructor(config: RobotConfig) {
        super({
            x: config.x,
            z: config.z,
            width: Robot.ROBOT_SIZE,
            height: Robot.ROBOT_HEIGHT,
            rotation: config.rotation
        })
        this.type = LevelObjectType.ROBOT
        this.coordinates = new GridCoordinates(config.x, config.z);
        this.idleAnimation()
        this.isDead = false;
    }

    animate(controls: Controls, level: Level) {
        if (this.isDead) {
            return;
        }
        this.rotate(controls)
        if (controls.arePressed()) {
            let distance = Utils.round(0.1 * Robot.SPEED)
            let direction = controls.direction()
            let object = this.willCollideWithLevelObject(direction, level, distance);
            if (object) {
                this.bumpInto(object, level, direction)
            } else {
                this.move(controls, level, distance)
            }
        } else {
            this.idleAnimation()
        }
    }

    bumpInto(object: Box | Enemy | Elevator, level: Level, direction?: string | null) {
        switch(object.type) {
            case LevelObjectType.ENEMY:
                let enemy: Enemy = object as Enemy;
                enemy.rotateTowards(this.center.x, this.center.z)
                enemy.punchAnimation()
                this.deathAnimation()
            break;
            case LevelObjectType.BOX:
                this.punchAnimation()
                let noise = this.makeNoise();
                for(const enemy of level.enemies) {
                    if (enemy.canHear(noise)) {
                        enemy.jumpAnimation()
                        setTimeout(() => {
                            enemy.setTarget(noise, RobotState.WALKING)
                        }, 700)
                    }
                }
            break;
            case LevelObjectType.MOVABLE_BOX:
                if (!direction) {
                    return;
                }
                let box: Box = object as Box;
                box.moveTo(level, direction);
            break;
        }
    }

    makeNoise(): Noise {
        return new Noise(this.center.x, this.center.z);
    }

    deathAnimation() {
        this.isDead = true;
        this.animation = RobotState.DEATH
        this.animationLoop = false;
    }

    walkingAnimation() {
        this.animation = RobotState.WALKING
        this.animationLoop = true;
    }

    brokenAnimation() {
        this.animation = RobotState.DEATH
        this.animationLoop = false;
    }

    punchAnimation() {
        this.playPunchSound();
        this.animation = RobotState.PUNCH
        this.animationLoop = false;
        setTimeout(() => {
            this.playingPunchSound = false;
            this.animation = RobotState.IDLE
            this.animationLoop = true;
        }, 800)
    }

    playPunchSound() {
        if(this.playingPunchSound) {
            return;
        }
        this.playingPunchSound = true;
        const audio = new Audio('/assets/sounds/robot_punch.mp3');
        audio.volume = 0.2;
        audio.play().catch(error => {
            console.error('Error playing sound:', error);
        });
    }

    idleAnimation() {
        if (this.animation == RobotState.DEATH) {
            return;
        }
        this.animation = RobotState.IDLE
        this.animationLoop = true;
    }

    runningAnimation() {
        this.animation = RobotState.RUNNING
        this.animationLoop = true;
    }

    move(controls: Controls, level: Level, distance: number) {
        if (controls.up && this.canMoveUp(level, distance)) {
            this.center.z += distance
        }   
        if (controls.down && this.canMoveDown(level, distance)) {
            this.center.z -= distance
        }   
        if (controls.right && this.canMoveRight(level, distance)) {
            this.center.x += distance
        }  
        if (controls.left && this.canMoveLeft(level, distance)) {
            this.center.x -= distance
        }  
        this.runningAnimation()
    }

    rotate(controls: Controls) {
        if (controls.up) {
            this.rotation = 0
            if (controls.right) {
                this.rotation = 315
            }
            if (controls.left) {
                this.rotation = 45
            }
        }   
        if (controls.down) {
            this.rotation = 180
            if (controls.right) {
                this.rotation = 225
            }
            if (controls.left) {
                this.rotation = 135
            }
        }   
        if (controls.left) {
            this.rotation = 90  
            if (controls.up) {
                this.rotation = 45
            }
            if (controls.down) {
                this.rotation = 135
            }
        }   
        if (controls.right) {
            this.rotation = 270
            if (controls.up) {
                this.rotation = 315
            }
            if (controls.down) {
                this.rotation = 225
            }
        }  
    }

    isOnElevator(elevator: Elevator): boolean {
        const edges = this.edges()
        const boundaries = elevator.edges();
        return edges.xMin >= boundaries.xMin
            && edges.xMax <= boundaries.xMax
            && edges.zMin >= boundaries.zMin
            && edges.zMax <= boundaries.zMax;
    }

    setBoundaries(boundaries: Boundaries) {
        this.boundaries = boundaries
    }

}