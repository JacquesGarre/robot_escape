import BoxConfig from "./box_config";
import CameraConfig from "./camera_config";

export default interface LevelConfig {
    size: number | undefined;
    tileSize?: number | undefined;
    camera?: CameraConfig | undefined;
    boxes?: BoxConfig[] | undefined;
}