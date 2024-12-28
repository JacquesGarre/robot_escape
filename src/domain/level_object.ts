import Coordinates from "./coordinates";
import LevelObjectConfig from "./interface/level_object_config";
import Level from "./level";

export default class LevelObject {

    center: Coordinates;
    width: number;
    height: number;
    depth: number;
    rotation: number;

    constructor(config: LevelObjectConfig) {
        const TILESIZE = Level.TILESIZE;
        this.width = config.width;
        this.height = (config.height ?? config.width);
        this.depth = (config.depth ?? config.width);
        this.center = new Coordinates(
            config.x * TILESIZE + TILESIZE / 2,
            ((config.y ?? 0) + this.height / 2),
            config.z * TILESIZE + TILESIZE / 2
        );

        this.rotation = config.rotation ?? 0;
    }

    boundaries() {
        return {
            xMin: this.center.x - this.width / 2,
            xMax: this.center.x + this.width / 2,
            zMin: this.center.z - this.depth / 2,
            zMax: this.center.z + this.depth / 2,
        };
    }

    canMove(direction: "up" | "down" | "right" | "left", level: Level, distance: number): boolean {
        const boundaries = this.boundaries();
        const levelBoundaries = level.boundaries();
        const newBoundaries = { ...boundaries };
        switch (direction) {
            case "up":
                if ((newBoundaries.zMax + distance) > levelBoundaries.zMax) return false;
                break;
            case "down":
                if ((newBoundaries.zMin - distance) < levelBoundaries.zMin) return false;
                break;
            case "right":
                if ((newBoundaries.xMax + distance) > levelBoundaries.xMax) return false;
                break;
            case "left":
                if ((newBoundaries.xMin - distance) < levelBoundaries.xMin) return false;
                break;
        }
        for (const box of level.boxes) {
            const boxBoundaries = box.boundaries();
            if (this.isColliding(newBoundaries, boxBoundaries, direction)) {
                return false;
            }
        }

        return true;
    }

    private isColliding(
        obj1: { xMin: number; xMax: number; zMin: number; zMax: number },
        obj2: { xMin: number; xMax: number; zMin: number; zMax: number },
        direction: string
    ): boolean {
        const overlapsInX = obj1.xMax > obj2.xMin && obj1.xMin < obj2.xMax;
        const overlapsInZ = obj1.zMax > obj2.zMin && obj1.zMin < obj2.zMax;
        if (direction === "up") {
            return overlapsInX && obj1.zMax >= obj2.zMin && obj1.zMax < obj2.zMax;
        } else if (direction === "down") {
            return overlapsInX && obj1.zMin <= obj2.zMax && obj1.zMin > obj2.zMin;
        } else if (direction === "right") {
            return overlapsInZ && obj1.xMax >= obj2.xMin && obj1.xMax < obj2.xMax;
        } else if (direction === "left") {
            return overlapsInZ && obj1.xMin <= obj2.xMax && obj1.xMin > obj2.xMin;
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
