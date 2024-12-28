import Coordinates from "../coordinates";
import BoxConfig from "./box_config";
import CameraConfig from "./camera_config";
import RobotConfig from "./robot_config";

export default interface LevelConfig {
    size: number | undefined;
    tileSize?: number | undefined;
    boxes?: BoxConfig[] | undefined;
    robot: RobotConfig;
}