import Cube from "../cube/cube";
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

    canSee(robot: Robot, cubes: Cube[]) {
        const x1 = this.position.x;
        const z1 = this.position.z;
        const x2 = robot.position.x;
        const z2 = robot.position.z;
        const deltaX = x2 - x1;
        const deltaZ = z2 - z1;
        const currentDistance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
        const couldSee = currentDistance <= this.sightDistance && this.withinEyeSightCone(robot)
        if (couldSee) {
            for (const cube of cubes) {
                if (this.isObstructed(x1, z1, x2, z2, cube)) {
                    console.log(`${this.name} could see, but is obstructed by a cube!`);
                    return false;
                }
            }
            console.log(`${this.name} can see me!`);
            return true;
        }
        return false
    }

    isObstructed(x1: number, z1: number, x2: number, z2: number, cube: Cube): boolean {
        const cubeMinX = cube.position.x - cube.width / 2;
        const cubeMaxX = cube.position.x + cube.width / 2;
        const cubeMinZ = cube.position.z - cube.width / 2;
        const cubeMaxZ = cube.position.z + cube.width / 2;
        return this.lineIntersectsAABB(x1, z1, x2, z2, cubeMinX, cubeMaxX, cubeMinZ, cubeMaxZ);
    }

    lineIntersectsAABB(
        x1: number, z1: number,
        x2: number, z2: number,
        minX: number, maxX: number,
        minZ: number, maxZ: number
    ): boolean {
        const dx = x2 - x1;
        const dz = z2 - z1;
        if (dx === 0) {
            return x1 >= minX && x1 <= maxX && (
                (z1 <= maxZ && z2 >= minZ) || (z2 <= maxZ && z1 >= minZ)
            );
        }
        if (dz === 0) {
            return z1 >= minZ && z1 <= maxZ && (
                (x1 <= maxX && x2 >= minX) || (x2 <= maxX && x1 >= minX)
            );
        }
        const t1 = (minX - x1) / dx;
        const t2 = (maxX - x1) / dx;
        const t3 = (minZ - z1) / dz;
        const t4 = (maxZ - z1) / dz;
        const tMin = Math.max(Math.min(t1, t2), Math.min(t3, t4));
        const tMax = Math.min(Math.max(t1, t2), Math.max(t3, t4));
        return tMax >= 0 && tMin <= tMax && tMin <= 1;
    }

    withinEyeSightCone(robot: Robot) {
        const x1 = this.position.x;
        const z1 = this.position.z;
        const x2 = robot.position.x;
        const z2 = robot.position.z;
        const angleThreshold = 60;
        const rotationRad = this.rotation * (Math.PI / 180);
        const directionX = Math.sin(rotationRad);
        const directionZ = Math.cos(rotationRad); 
        const vectorToOtherX = x2 - x1;
        const vectorToOtherZ = z2 - z1;
        const vectorToOtherLength = Math.sqrt(vectorToOtherX ** 2 + vectorToOtherZ ** 2);
        const normalizedVectorToOtherX = vectorToOtherX / vectorToOtherLength;
        const normalizedVectorToOtherZ = vectorToOtherZ / vectorToOtherLength;
        const dotProduct = directionX * normalizedVectorToOtherX + directionZ * normalizedVectorToOtherZ;
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

    catch(robot: Robot) {
        
    }

}