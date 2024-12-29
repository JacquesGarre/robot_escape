import ElevatorConfig from "./interface/elevator_config";
import Level from "./level";
import LevelObject from "./level_object";
import LevelObjectType from "./level_object_type";
import Robot from "./robot";

export default class Elevator extends LevelObject {

    x: number;
    z: number;

    static SPEED = 0.2;
    static MAX_HEIGHT = 50;

    constructor(config: ElevatorConfig) {
        super({
            x: config.x,
            z: config.z,
            width: Level.TILESIZE,
            height: 0
        })
        this.type = LevelObjectType.ELEVATOR
        this.x = config.x;
        this.z = config.z;
    }

    goUp(robot: Robot) {
        if (this.height >= Elevator.MAX_HEIGHT) {
            return;
        }
        robot.center.y += Elevator.SPEED
        this.setHeight(this.height + Elevator.SPEED)
    }

    hasReachedTop() {
        return this.height >= Elevator.MAX_HEIGHT;
    }
}