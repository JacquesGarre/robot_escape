import EnemyConfig from "./interface/enemy_config";
import PathNode from "./interface/path_node";
import Level from "./level";
import LevelObject from "./level_object";
import LevelObjectType from "./level_object_type";
import Noise from "./noise";
import Robot from "./robot";
import RobotState from "./robot_state";
import Utils from "./utils";

export class Enemy extends LevelObject {

    index: number; 
    x: number;
    y: number;
    z: number;
    animation: RobotState;
    animationLoop: boolean;
    eyeSight: number;
    earSight: number;
    target: LevelObject | null;
    goingToTargetAnimation: RobotState = RobotState.RUNNING;
    path: PathNode[] | null;

    static RUNNING_SPEED = 3;
    static WALKING_SPEED = 1;
    static DEFAULT_EYESIGHT = 20;
    static DEFAULT_EYESIGHT_ANGLE = 60;
    static DEFAULT_EARSIGHT = 20;

    constructor(config: EnemyConfig) {
        super({
            x: config.x,
            y: config.y,
            z: config.z,
            width: Robot.ROBOT_SIZE,
            height: Robot.ROBOT_HEIGHT,
            rotation: config.rotation
        })
        this.type = LevelObjectType.ENEMY
        this.index = config.index;
        this.x = config.x;
        this.z = config.z;
        this.eyeSight = config.eyeSight ?? Enemy.DEFAULT_EYESIGHT;
        this.earSight = config.earSight ?? Enemy.DEFAULT_EARSIGHT;
        this.animation = RobotState.IDLE;
        this.animationLoop = true;
        this.target = null;
        this.path = null;
    }

    rotateTowards(object: LevelObject) {
        const x1 = this.center.x;
        const z1 = this.center.z;
        const x2 = object.center.x;
        const z2 = object.center.z;
        const deltaX = x2 - x1;
        const deltaZ = z2 - z1;
        let angleRadians = Math.atan2(deltaX, deltaZ);
        let angleDegrees = Utils.toDegrees(angleRadians);
        this.rotation = -angleDegrees
    }

    jumpAnimation() {
        this.animation = RobotState.JUMP
        this.animationLoop = false;
        setTimeout(() => {
            this.animation = RobotState.IDLE
            this.animationLoop = true;
        }, 800)
    }

    punchAnimation() {
        this.animation = RobotState.PUNCH
        this.animationLoop = false;
        setTimeout(() => {
            this.animation = RobotState.IDLE
            this.animationLoop = true;
        }, 800)
    }

    runningAnimation() {
        this.animation = RobotState.RUNNING
        this.animationLoop = true;
    }

    hasInEyeSightCone(robot: Robot) {
        const x1 = this.center.x;
        const z1 = this.center.z;
        const x2 = robot.center.x;
        const z2 = robot.center.z;
        const angleThreshold = Enemy.DEFAULT_EYESIGHT_ANGLE;
        const rotationRad = Utils.toRadians(-this.rotation);
        const directionX = Math.sin(rotationRad);
        const directionZ = Math.cos(rotationRad); 
        const vectorToOtherX = x2 - x1;
        const vectorToOtherZ = z2 - z1;
        const vectorToOtherLength = Math.sqrt(vectorToOtherX ** 2 + vectorToOtherZ ** 2);
        const normalizedVectorToOtherX = vectorToOtherX / vectorToOtherLength;
        const normalizedVectorToOtherZ = vectorToOtherZ / vectorToOtherLength;
        const dotProduct = directionX * normalizedVectorToOtherX + directionZ * normalizedVectorToOtherZ;
        const thresholdCos = Math.cos(Utils.toRadians(angleThreshold));
        const isInEyeSightCone = dotProduct >= thresholdCos;
        return isInEyeSightCone;
    }

    canSee(robot: Robot, level: Level) {
        const x1 = this.center.x;
        const z1 = this.center.z;
        const x2 = robot.center.x;
        const z2 = robot.center.z;
        const deltaX = x2 - x1;
        const deltaZ = z2 - z1;
        const currentDistance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
        const couldSee = currentDistance <= this.eyeSight && this.hasInEyeSightCone(robot)
        if (couldSee) {
            for (const box of level.boxes) {
                if (Utils.isObstructed(x1, z1, x2, z2, box.center.x, box.center.z, box.width)) {
                    return false;
                }
            }
            return true;
        }
        return false
    }

    canHear(noise: Noise) {
        const x1 = this.center.x;
        const z1 = this.center.z;
        const x2 = noise.center.x;
        const z2 = noise.center.z;
        const deltaX = x2 - x1;
        const deltaZ = z2 - z1;
        const currentDistance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
        const canHear = currentDistance <= this.earSight
        return canHear
    }

    setTarget(object: LevelObject, goingToTargetAnimation: RobotState) {
        this.target = object;
        this.goingToTargetAnimation = goingToTargetAnimation;
    }

    animate(level: Level) {
        if (this.target) {
            this.goToTarget(this.target, level);
        }
        if (this.canSee(level.robot, level)) {
            this.setTarget(level.robot, RobotState.RUNNING)
        }
    }

    goToTarget(object: LevelObject, level: Level) {
        this.goToTargetAnimation();
        this.rotateTowards(object)
        let grid = level.gridRepresentation()
        const start = {
            x: Math.floor(this.center.x / Level.TILESIZE),
            z: Math.floor(this.center.z / Level.TILESIZE),
        };
        const target = {
            x: Math.floor(object.center.x / Level.TILESIZE),
            z: Math.floor(object.center.z / Level.TILESIZE),
        };
        this.path = Utils.findPath(start, target, grid);
        this.followPath(object, level)
    }

    goToTargetAnimation() {
        this.animation = this.goingToTargetAnimation;
        this.animationLoop = true;
    }

    goToTargetSpeed() {
        const speed = this.goingToTargetAnimation == RobotState.RUNNING 
            ? Enemy.RUNNING_SPEED
            : Enemy.WALKING_SPEED;

        return Utils.round(0.1 * speed)
    }

    followPath(object: LevelObject, level: Level) {
        if (!this.path) {
            return;
        }
        const speed = this.goToTargetSpeed()
        console.log(this.path.length)
        if (this.path.length > 0) {
            const target = this.path[0];
            const targetX = Utils.round(target.x * Level.TILESIZE + (Level.TILESIZE / 2))
            const targetZ = Utils.round(target.z * Level.TILESIZE + (Level.TILESIZE / 2))
            const deltaX = targetX - this.center.x;
            const deltaZ = targetZ - this.center.z;
            const distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
            if (distance < 0.1) { 
                this.path.shift();
                return;
            }
            const directionX = deltaX / distance;
            const directionZ = deltaZ / distance;
            
            this.center.x += directionX * speed;
            this.center.z += directionZ * speed;
        } else {
            const targetX = object.center.x
            const targetZ =  object.center.z
            const deltaX = targetX - this.center.x;
            const deltaZ = targetZ - this.center.z;
            let direction = ""
            if (deltaX < 0) {
                direction = "left"
            }
            if (deltaX > 0) {
                direction = "right"
            }
            if (deltaZ < 0) {
                direction = "down"
            }
            if (deltaZ > 0) {
                direction = "up"
            }
            
            const distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
            if(!this.willCollideWith(level.elevator, direction, distance)) {
                console.log("DOES NOT COLLIDE WITH ELEVATOR")
                if(!this.willCollideWith(object, direction, distance)) {
                    const directionX = deltaX / distance;
                    const directionZ = deltaZ / distance;
                    this.center.x += directionX * speed;
                    this.center.z += directionZ * speed;
                } else {
                    this.doActionOnTarget(object, level)
                }
            }

        }
    }

    doActionOnTarget(object: LevelObject, level: Level) {
        switch(object.type) {
            case LevelObjectType.ROBOT:
                let robot: Robot = object as Robot;
                robot.bumpInto(this, level)
            break;
            case LevelObjectType.NOISE:
                console.log("DOING ACTION")
                this.danceAnimation();
            break;
        }
    }

    danceAnimation() {
        this.animation = RobotState.DANCING;
        this.animationLoop = false;
    }

}