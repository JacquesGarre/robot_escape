import BoxConfig from "./interface/box_config";
import Level from "./level";
import LevelObject from "./level_object";
import LevelObjectType from "./level_object_type";
import GridCoordinates from "./grid_coordinates";

export default class Box extends LevelObject {

    coordinates: GridCoordinates;

    constructor(config: BoxConfig) {
        super({
            x: config.x,
            z: config.z,
            width: Level.TILESIZE
        })
        this.type = LevelObjectType.BOX
        this.coordinates = new GridCoordinates(config.x, config.z)
    }

}