import GridCoordinates from "./grid_coordinates";
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

    index: number; // TODO: Value object here, that number is not random, it's an int, etc...
    coordinates: GridCoordinates;
    animation: RobotState; // TODO: Rename "animation" to State then?!
    animationLoop: boolean; // TODO: Should actually be in infra layer
    eyeSight: number; // TODO: Value object here, that number is not random, it has rules
    earSight: number;  // TODO: Value object here, that number is not random, it has rules
    target: LevelObject | null;
    goingToTargetAnimation: RobotState = RobotState.RUNNING; // TODO: Remove this ugly thing.
    path: PathNode[] | null; // TODO: Have a Path value object, and maybe rename it to current path?
    loopingPath: PathNode[] | undefined; // TODO: An enemy can only have one path?! the in-loop could be part of path value object
    walkingSpeed: number; // TODO: value object, has rules
    runningSpeed: number; // TODO: value object, has rules
    playingNothingFoundSound: boolean = false; // TODO: Move to infra
    playingTargetAcquiredSound: boolean = false; // TODO: Move to infra
    playingTargetNeutralizedSound: boolean = false; // TODO: Move to infra

    static DEFAULT_RUNNING_SPEED = 3;
    static DEFAULT_WALKING_SPEED = 1;
    static DEFAULT_EYESIGHT = 20;
    static DEFAULT_EYESIGHT_ANGLE = 60;
    static DEFAULT_EARSIGHT = 20;

    constructor(config: EnemyConfig) {
        super({
            x: config.x,
            z: config.z,
            width: Robot.ROBOT_SIZE,
            height: Robot.ROBOT_HEIGHT,
            rotation: config.rotation
        })
        this.type = LevelObjectType.ENEMY
        this.index = config.index;
        this.coordinates = new GridCoordinates(config.x, config.z);
        this.eyeSight = config.eyeSight ?? Enemy.DEFAULT_EYESIGHT;
        this.earSight = config.earSight ?? Enemy.DEFAULT_EARSIGHT;
        this.animation = RobotState.IDLE;
        this.animationLoop = true;
        this.target = null;
        this.path = null;
        this.loopingPath = config.loopingPath;
        this.walkingSpeed = config.walkingSpeed ?? Enemy.DEFAULT_WALKING_SPEED;
        this.runningSpeed = config.runningSpeed ?? Enemy.DEFAULT_RUNNING_SPEED;
    }

    rotateTowards(x: number, z: number) {
        const x1 = this.center.x;
        const z1 = this.center.z;
        const x2 = x;
        const z2 = z;
        const deltaX = x2 - x1;
        const deltaZ = z2 - z1;
        let angleRadians = Math.atan2(deltaX, deltaZ);
        let angleDegrees = Utils.toDegrees(angleRadians);
        this.rotation = -angleDegrees
    }

    jumpAnimation() { // TODO: Should be just "jump()"
        this.animation = RobotState.JUMP // TODO: this.state = RobotState.JUMP...
        this.animationLoop = false; // TODO: remove this, should be in infra
        setTimeout(() => {  // TODO : Remove this, should be in infra
            this.animation = RobotState.IDLE
            this.animationLoop = true;
        }, 800)
    }

    punchAnimation() { // TODO: Should be just "punch()"
        this.animation = RobotState.PUNCH // TODO: cf jumpAnimation() method...
        this.animationLoop = false;
        setTimeout(() => {
            this.animation = RobotState.IDLE
            this.animationLoop = true;
        }, 800)
    }

    runningAnimation() { // TODO: cf jumpAnimation() method...
        this.animation = RobotState.RUNNING
        this.animationLoop = true;
    }

    walkingAnimation() { // TODO: cf jumpAnimation() method...
        this.animation = RobotState.WALKING
        this.animationLoop = true;
    }

    hasInEyeSightCone(robot: Robot) { // TODO: Better naming?!
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
                if (Utils.isObstructed(x1, z1, x2, z2, box.center.x, box.center.z, box.width)) { // TODO: sthg like box.isObstructingView(enemy, robot) ?! 
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

    setTarget(object: LevelObject, goingToTargetAnimation: RobotState) { // TODO: refacto this, does not make sense to have goingToTargetAnimation
        this.playTargetAcquiredSound(); // TODO: infra layer
        this.target = object;
        this.goingToTargetAnimation = goingToTargetAnimation;
    }

    animate(level: Level) { // TODO: Apply state pattern here no ifs needed
        if (this.target) {  
            this.goToTarget(this.target, level);
        }
        if (this.canSee(level.robot, level)) {
            this.setTarget(level.robot, RobotState.RUNNING)
        }
        if (this.loopingPath && !this.target) {
            this.loopPath()
        }
    }

    loopPath() { // TODO: Review that ugly method, what does it mean?! "walk that path in repeat?!"
        if (!this.loopingPath) {
            return;
        }
        if (!this.path || this.path?.length == 0) {
            this.path = [...this.loopingPath];
        }
        this.walkingAnimation()
        this.followPath(this.path, Utils.round(0.1 * this.walkingSpeed)) 
    }

    goToTarget(object: LevelObject, level: Level) { // TODO: State pattern
        this.goToTargetAnimation();
        let grid = level.gridRepresentation()
        const start = {
            x: Math.floor(this.center.x / Level.TILESIZE),
            z: Math.floor(this.center.z / Level.TILESIZE),
        };
        const target = {
            x: Math.floor(object.center.x / Level.TILESIZE),
            z: Math.floor(object.center.z / Level.TILESIZE),
        };
        let previousPath = this.path;
        this.path = Utils.findPath(start, target, grid);
        if (this.path.length == 0 && !previousPath) {
            this.path = null;
            this.target = null;
            return;
        }
        this.followObject(object, level)
    }

    goToTargetAnimation() { // TODO: Cf jumpAnimation()
        this.animation = this.goingToTargetAnimation;
        this.animationLoop = true;
    }

    goToTargetSpeed() {  // TODO: State pattern
        const speed = this.goingToTargetAnimation == RobotState.RUNNING 
            ? this.runningSpeed
            : this.walkingSpeed;

        return Utils.round(0.1 * speed)
    }

    followPath(path: PathNode[] | null, speed: number) {
        if (!path || path.length == 0) {
            return;
        }
        const target = path[0];
        const targetX = Utils.round(target.x * Level.TILESIZE + (Level.TILESIZE / 2))
        const targetZ = Utils.round(target.z * Level.TILESIZE + (Level.TILESIZE / 2))
        this.rotateTowards(targetX, targetZ)
        const deltaX = targetX - this.center.x;
        const deltaZ = targetZ - this.center.z;
        const distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
        if (distance < 0.1) { 
            path.shift();
            return;
        }
        const directionX = deltaX / distance;
        const directionZ = deltaZ / distance;
        this.center.x += directionX * speed;
        this.center.z += directionZ * speed;
    }

    followObject(object: LevelObject, level: Level) { // TODO: Refacto this whole thing
        if (!this.path) {
            return;
        }
        const speed = this.goToTargetSpeed()
        if (this.path.length > 0) {
            this.followPath(this.path, speed);
        } else {
            const targetX = object.center.x  // TODO: that whole block can be in a method, maybe using the enum that should exist : direction.betweenObjectAndTarget(this, object) { .... return direction.left } ?!!
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
            
            const distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ); // TODO: Utils ? distance.betweenObjectAndTarget(this, object) 
            if(!this.willCollideWith(level.elevator, direction, distance)) { // TODO: Who still writes nested ifs in 2024 seriously...
                if(!this.willCollideWith(object, direction, distance)) {
                    const directionX = deltaX / distance;
                    const directionZ = deltaZ / distance;
                    this.center.x += directionX * speed; // TODO: refacto..., if only center was a value object....!
                    this.center.z += directionZ * speed;
                } else {
                    this.doActionOnTarget(object, level) // TODO : naming is getting worse and worse
                }
            }

        }
    }

    doActionOnTarget(object: LevelObject, level: Level) { // TODO : State pattern can handle this "BumpedIntoRobotState" or "HeardNoiseState" or whatever... <- better naming ofc
        switch(object.type) {
            case LevelObjectType.ROBOT:
                let robot: Robot = object as Robot;
                robot.bumpInto(this, level);
                this.playTargetNeutralizedSound();
            break;
            case LevelObjectType.NOISE:
                this.danceAnimation();
            break;
        }
    }

    danceAnimation() { // cf jumpAnimation() comments
        this.playNothingFoundSound();
        this.animation = RobotState.DANCING;
        this.animationLoop = false;
    }

    playNothingFoundSound() { // move to infra
        if(this.playingNothingFoundSound) {
            return;
        }
        this.playingNothingFoundSound = true;
        const audio = new Audio('assets/sounds/robot_nothing.wav');
        audio.volume = 0.3;
        audio.play().catch(error => {
            console.error('Error playing sound:', error);
        });
    }

    playTargetAcquiredSound() { // move to infra
        if(this.playingTargetAcquiredSound) {
            return;
        }
        this.playingTargetAcquiredSound = true;
        const audio = new Audio('assets/sounds/robot_target_acquired.wav');
        audio.volume = 0.3;
        audio.play().catch(error => {
            console.error('Error playing sound:', error);
        });
    }

    playTargetNeutralizedSound() { // move to infra
        if(this.playingTargetNeutralizedSound) {
            return;
        }
        this.playingTargetNeutralizedSound = true;
        const audio = new Audio('assets/sounds/robot_target_neutralized.wav');
        audio.volume = 0.3;
        audio.play().catch(error => {
            console.error('Error playing sound:', error);
        });
    }

}
