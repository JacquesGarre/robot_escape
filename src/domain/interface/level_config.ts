import BoxConfig from "./box_config";
import RobotConfig from "./robot_config";

export default interface LevelConfig {
    size: number;
    boxes?: BoxConfig[] | undefined;
    robot: RobotConfig;
}