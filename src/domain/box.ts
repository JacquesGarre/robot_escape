import BoxConfig from "./interface/box_config";
import Level from "./level";
import LevelObject from "./level_object";
import LevelObjectType from "./level_object_type";
import GridCoordinates from "./grid_coordinates";
import PhysicalCoordinates from "./physical_coordinates";
import Utils from "./utils";

export default class Box extends LevelObject {

    coordinates: GridCoordinates;
    movable: boolean;

    constructor(config: BoxConfig) {
        super({
            x: config.x,
            z: config.z,
            width: Level.TILESIZE
        })
        this.type = config.movable ? LevelObjectType.MOVABLE_BOX : LevelObjectType.BOX; // TODO : Split into 2 different classes instead of this
        this.coordinates = new GridCoordinates(config.x, config.z)
        this.movable = config.movable ?? false; // TODO : Does not make sense
    }

    moveTo(level: Level, direction: string) { // TODO : Wrong function naming here + Does not make sense > split into 2 differents classes
        let distance = 0.5;
        if (direction == "up" && this.canMoveUp(level, distance)) {
            this.center.z += distance
        }   
        if (direction == "down" && this.canMoveDown(level, distance)) {
            this.center.z -= distance
        }   
        if (direction == "right" && this.canMoveRight(level, distance)) {
            this.center.x += distance
        }  
        if (direction == "left" && this.canMoveLeft(level, distance)) {
            this.center.x -= distance
        }  
    }

    getGridCoordinates(): GridCoordinates { // TODO : Better have GridCoordinates.fromBox() instead of this method here... 
        let x = Math.round((this.center.x - (Level.TILESIZE / 2)) / Level.TILESIZE)
        let z = Math.round((this.center.z - (Level.TILESIZE / 2)) / Level.TILESIZE)
        return new GridCoordinates(
            x,
            z,
        )
    }

}
