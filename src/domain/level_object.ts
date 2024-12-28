import Coordinates from "./coordinates";
import LevelObjectConfig from "./interface/level_object_config";

export default class LevelObject {

    center: Coordinates;
    width: number;
    height: number;
    depth: number;

    constructor(config: LevelObjectConfig) {
        this.width = config.width;
        this.height = config.height ?? config.width;
        this.depth = config.depth ?? config.width;
        let centerX = -config.x * this.width + this.width/2
        let centerY = (config.y ?? 0) + this.height/2
        let centerZ = config.z * this.depth - this.depth/2
        this.center = new Coordinates(centerX, centerY, centerZ)
    }

}