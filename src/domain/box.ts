import BoxConfig from "./interface/box_config";
import Level from "./level";
import LevelObject from "./level_object";
import LevelObjectType from "./level_object_type";

export default class Box extends LevelObject {

    x: number;
    z: number;

    constructor(config: BoxConfig) {
        super({
            x: config.x,
            z: config.z,
            width: Level.TILESIZE
        })
        this.type = LevelObjectType.BOX
        this.x = config.x;
        this.z = config.z;
    }

}