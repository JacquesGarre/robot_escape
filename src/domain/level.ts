import Camera from "./camera";
import LevelConfig from "./interface/level_config";

export default class Level {

    DEFAULT_SIZE = 5;
    DEFAULT_TILESIZE = 5;

    size: number;
    tileSize: number;
    camera: Camera;

    constructor(config: LevelConfig | undefined) {
        this.size = config?.size ?? this.DEFAULT_SIZE;
        this.tileSize = config?.tileSize ?? this.DEFAULT_TILESIZE;
        this.camera = config?.camera ?? Camera.default();
    }
}