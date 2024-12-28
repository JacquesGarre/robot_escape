import Box from "./box";
import Camera from "./camera";
import BoxConfig from "./interface/box_config";
import LevelConfig from "./interface/level_config";

export default class Level {

    static DEFAULT_SIZE = 5;
    static DEFAULT_TILESIZE = 5;

    size: number;
    tileSize: number;
    camera: Camera;
    boxes: Box[] = [];

    constructor(config: LevelConfig | undefined) {
        this.size = config?.size ?? Level.DEFAULT_SIZE;
        this.tileSize = config?.tileSize ?? Level.DEFAULT_TILESIZE;
        this.camera = config?.camera ?? Camera.default();
        this.initializeBoxes(config?.boxes);
    }

    initializeBoxes(boxesConfig: BoxConfig[] | undefined) {
        if (!boxesConfig) {
            return;
        }
        for(const boxConfig of boxesConfig) {
            this.boxes.push(new Box(boxConfig));
        }
    }


}