import Boundaries from "./boundaries";
import Coordinates from "./coordinates";
import LevelObjectConfig from "./interface/level_object_config";
import Level from "./level";
import Utils from "./utils";

export default class LevelObject {

    center: Coordinates;
    width: number;
    height: number;
    depth: number;
    rotation: number;
    boundaries?: Boundaries | undefined;

    constructor(config: LevelObjectConfig) {
        this.width = config.width;
        this.height = (config.height ?? config.width);
        this.depth = (config.depth ?? config.width);
        this.center = new Coordinates(
            Utils.round(config.x * Level.TILESIZE + (Level.TILESIZE / 2)),
            Utils.round(((config.y ?? 0) + (this.height / 2))),
            Utils.round(config.z * Level.TILESIZE + (Level.TILESIZE / 2))
        );
        this.rotation = config.rotation ?? 0;
    }

    setHeight(newHeight: number) {
        this.center.y = newHeight / 2;
        this.height = newHeight;
    }

    edges() {
        return {
            xMin: Utils.round(this.center.x - this.width / 2),
            xMax: Utils.round(this.center.x + this.width / 2),
            yMin: Utils.round(this.center.y - this.height / 2),
            yMax: Utils.round(this.height),
            zMin: Utils.round(this.center.z - this.depth / 2),
            zMax: Utils.round(this.center.z + this.depth / 2),
        };
    }

    canMove(direction: "up" | "down" | "right" | "left", level: Level, distance: number): boolean {
        if (this.boundaries && this.willBeOutOfBounds(this.boundaries, direction, distance)) {
            return false;
        }
        if (this.willBeOutOfBounds(level.boundaries, direction, distance)) {
            return false;
        }
        for (const box of level.boxes) {
            if (this.willCollideWith(box, direction, distance)) {
                return false;
            }
        }
        if (this.willCollideWith(level.elevator, direction, distance)) {
            return false;
        }
        return true;
    }

    private willBeOutOfBounds(boundaries: Boundaries, direction: string, distance: number): boolean {
        const edges = this.edges();
        switch (direction) {
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

    private willCollideWith(
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

    canMoveUp(level: Level, distance: number): boolean {
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
