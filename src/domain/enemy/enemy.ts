import Robot from "../robot/robot";
import Position from "../shared/position";

export default class Enemy {

    name: string
    position: Position;
    animation: string;
    rotation: number;
    playAnimationOnce = false;
    sightDistance: number;

    constructor(position: Position, name: string, rotation: number, sightDistance: number) {
        this.name = name;
        this.position = position;
        this.animation = 'Idle';
        this.rotation = rotation;
        this.sightDistance = sightDistance
    }

    hitByRobot(robot: Robot) {
        this.rotateTowards(robot);
        this.punch();
    }

    rotateTowards(robot: Robot) {
        const x1 = this.position.x;
        const z1 = this.position.z;
        const x2 = robot.position.x;
        const z2 = robot.position.z;
        const deltaX = x2 - x1;
        const deltaZ = z2 - z1;
        let angleRadians = Math.atan2(deltaX, deltaZ);
        let angleDegrees = (angleRadians * (180 / Math.PI)) + 360 % 360;
        this.rotation = angleDegrees
    }

    canSee(robot: Robot) {
        const x1 = this.position.x;
        const z1 = this.position.z;
        const x2 = robot.position.x;
        const z2 = robot.position.z;
        const deltaX = x2 - x1;
        const deltaZ = z2 - z1;
        const currentDistance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
        const canSee = currentDistance <= this.sightDistance && this.withinEyeSightCone(robot)
        return canSee
    }

    withinEyeSightCone(robot: Robot) {
        const x1 = this.position.x;
        const z1 = this.position.z;
        const x2 = robot.position.x;
        const z2 = robot.position.z;
        const angleThreshold = 75
        const rotationRad = 0
        const directionX = Math.cos(rotationRad);
        const directionY = Math.sin(rotationRad);
        const vectorToOtherX = x2 - x1;
        const vectorToOtherZ = z2 - z1;
        const vectorToOtherLength = Math.sqrt(vectorToOtherX ** 2 + vectorToOtherZ ** 2);
        const normalizedVectorToOtherX = vectorToOtherX / vectorToOtherLength;
        const normalizedVectorToOtherZ = vectorToOtherZ / vectorToOtherLength;
        const dotProduct = directionX * normalizedVectorToOtherX + directionY * normalizedVectorToOtherZ;
        const thresholdCos = Math.cos(angleThreshold * (Math.PI / 180));
        const isInFront = dotProduct >= thresholdCos;
        return isInFront;
    }

    punch() {
        if (this.animation == 'Punch') {
            return;
        }
        this.animation = 'Punch';    
        setTimeout(() => {
            this.animation = 'Idle';
        }, 700);    
    }

}