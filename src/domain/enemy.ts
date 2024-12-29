import EnemyConfig from "./interface/enemy_config";
import LevelObject from "./level_object";
import LevelObjectType from "./level_object_type";
import Robot from "./robot";
import RobotState from "./robot_state";

export class Enemy extends LevelObject {

    index: number; 
    x: number;
    y: number;
    z: number;
    animation: string;

    static SPEED = 2.5;

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
        this.animation = RobotState.IDLE
    }

}