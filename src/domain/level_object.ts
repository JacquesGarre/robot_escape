import Boundaries from "./boundaries";
import Box from "./box";
import PhysicalCoordinates from "./physical_coordinates";
import Elevator from "./elevator";
import { Enemy } from "./enemy";
import LevelObjectConfig from "./interface/level_object_config";
import Level from "./level";
import LevelObjectType from "./level_object_type";
import Utils from "./utils";

export default class LevelObject { // TODO : Refacto this mess

    center: PhysicalCoordinates;
    width: number;
    height: number;
    depth: number;
    rotation: number;
    type: LevelObjectType;
    boundaries?: Boundaries | undefined;

    constructor(config: LevelObjectConfig) {
        this.width = config.width;
        this.height = (config.height ?? config.width);
        this.depth = (config.depth ?? config.width);
        this.center = new PhysicalCoordinates(
            Utils.round(config.x * Level.TILESIZE + (Level.TILESIZE / 2)),
            Utils.round(((config.y ?? 0) + (this.height / 2))),
            Utils.round(config.z * Level.TILESIZE + (Level.TILESIZE / 2))
        );
        this.rotation = config.rotation ?? 0;
    }

    edges() {   // TODO : Seems like the boundaries class
        return {
            xMin: Utils.round(this.center.x - this.width / 2),
            xMax: Utils.round(this.center.x + this.width / 2),
            yMin: Utils.round(this.center.y - this.height / 2),
            yMax: Utils.round(this.height),
            zMin: Utils.round(this.center.z - this.depth / 2),
            zMax: Utils.round(this.center.z + this.depth / 2),
        };
    }

    canMove(direction: string | null, level: Level, distance: number): boolean { // TODO : There is a smarter way
        if (!direction) {
            return false;
        }
        if (this.boundaries && this.willBeOutOfBounds(this.boundaries, direction, distance)) {
            return false;
        }
        if (this.willBeOutOfBounds(level.boundaries, direction, distance)) {
            return false;
        }
        if (this.willCollideWithLevelObject(direction, level, distance)) {
            return false;
        }
        return true;
    }
    
    willCollideWithLevelObject(direction: string | null, level: Level, distance: number): Box | Enemy | Elevator | null {  // TODO : There is a smarter way
        if (!direction) {
            return null;
        }
        for (const box of level.boxes) {
            if (this.willCollideWith(box, direction, distance)) {
                return box;
            }
        }
        for (const enemy of level.enemies) {
            if (this.willCollideWith(enemy, direction, distance)) {
                return enemy;
            }
        }
        if (this.willCollideWith(level.elevator, direction, distance)) {
            return level.elevator;
        }
        return null;
    }

    willBeOutOfBounds(boundaries: Boundaries, direction: string, distance: number): boolean { // TODO : boundaries class should have that logic 
        const edges = this.edges(); 
        switch (direction) { // TODO : Direction enum
            case "up":
                if ((edges.zMax + distance) > boundaries.zMax) return true;
                break;
            case "down":
                if ((edges.zMin - distance) < boundaries.zMin) return true;
                break;
            case "right":
                if ((edges.xMax + distance) > boundaries.xMax) return true;
                break;
            case "left":
                if ((edges.xMin - distance) < boundaries.xMin) return true;
                break;
        }
        return false;
    }

    willCollideWith( // TODO : boundaries class should have that logic 
        otherObject: LevelObject,
        direction: string,
        distance: number
    ): boolean {
        const obj1 = this.edges();
        const obj2 = otherObject.edges();
        const overlapsInX = obj1.xMax > obj2.xMin && obj1.xMin < obj2.xMax;
        const overlapsInY = obj1.yMax > obj2.yMin && obj1.yMin < obj2.yMax;
        const overlapsInZ = obj1.zMax > obj2.zMin && obj1.zMin < obj2.zMax;
        if (direction === "up") {
            return overlapsInY && overlapsInX && (obj1.zMax+distance) > obj2.zMin && obj1.zMax < obj2.zMax;
        } else if (direction === "down") {
            return overlapsInY && overlapsInX && (obj1.zMin-distance) < obj2.zMax && obj1.zMin > obj2.zMin;
        } else if (direction === "right") {
            return overlapsInY && overlapsInZ && (obj1.xMax+distance) > obj2.xMin && obj1.xMax < obj2.xMax;
        } else if (direction === "left") {
            return overlapsInY && overlapsInZ && (obj1.xMin-distance) < obj2.xMax && obj1.xMin > obj2.xMin;
        }
        return false;
    }

    canMoveUp(level: Level, distance: number): boolean { // TODO : Is it really useful to have 4 different methods here to save 1 param? use the direction enum
        return this.canMove("up", level, distance);
    }

    canMoveDown(level: Level, distance: number): boolean {
        return this.canMove("down", level, distance);
    }

    canMoveRight(level: Level, distance: number): boolean {
        return this.canMove("right", level, distance);
    }

    canMoveLeft(level: Level, distance: number): boolean {
        return this.canMove("left", level, distance);
    }
}
