import BoxConfig from "./box_config";
import ElevatorConfig from "./elevator_config";
import EnemyConfig from "./enemy_config";
import RobotConfig from "./robot_config";

export default interface LevelConfig {
    index: number;
    size: number;
    boxes?: BoxConfig[] | undefined;
    robot: RobotConfig;
    elevator: ElevatorConfig;
    enemies?: EnemyConfig[] | undefined;
}