import Robot from "../robot/robot";
import Position from "../shared/position";

export default class Enemy {

    name: string
    position: Position;
    animation: string;
    rotation: number;

    constructor(position: Position, name: string, rotation: number) {
        this.name = name;
        this.position = position;
        this.animation = 'Idle';
        this.rotation = rotation;
    }

    hitByRobot(robot: Robot) {
        this.rotateTowards(robot);
    }

    rotateTowards(robot: Robot) {
        const x1 = this.position.x;
        const z1 = this.position.z;
        const x2 = robot.position.x;
        const z2 = robot.position.z ;
        const deltaX = x2 - x1;
        const deltaZ = z2 - z1;
        let angleRadians = Math.atan2(deltaX, deltaZ);
        let angleDegrees = (angleRadians * (180 / Math.PI)) + 360 % 360;
        this.rotation = angleDegrees
    }

}