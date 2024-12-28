import ElevatorConfig from "./interface/elevator_config";
import Level from "./level";
import LevelObject from "./level_object";

export default class Elevator extends LevelObject {

    x: number;
    z: number;

    constructor(config: ElevatorConfig) {
        super({
            x: config.x,
            z: config.z,
            width: Level.TILESIZE,
            height: 3
        })
        this.x = config.x;
        this.z = config.z;
    }
}