import Coordinates from "./coordinates";
import BoxConfig from "./interface/box_config";
import Level from "./level";
import LevelObject from "./level_object";

export default class Box extends LevelObject {

    x: number;
    z: number;

    constructor(config: BoxConfig) {
        let tileSize = Level.DEFAULT_TILESIZE;
        let x = -config.x * tileSize + tileSize/2
        let y = tileSize/2
        let z = config.z * tileSize - tileSize/2
        super(
            new Coordinates(x, y, z),
            Level.DEFAULT_TILESIZE,
            Level.DEFAULT_TILESIZE,
            Level.DEFAULT_TILESIZE
        )
        this.x = config.x;
        this.z = config.z;
    }

}