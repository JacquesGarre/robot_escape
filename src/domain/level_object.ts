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
        this.width = config.width;
        this.height = config.height ?? config.width;
        this.depth = config.depth ?? config.width;
        let centerX = -config.x * this.width + Level.TILESIZE/2
        let centerY = (config.y ?? 0) + this.height/2
        let centerZ = config.z * this.depth - Level.TILESIZE/2
        this.center = new Coordinates(centerX, centerY, centerZ)
        this.rotation = config.rotation ?? 0;
    }

    boundaries() {
        const xMin = this.center.x - this.width / 2;
        const xMax = this.center.x + this.width / 2;
        const zMin = this.center.z - this.depth / 2;
        const zMax = this.center.z + this.depth / 2;
        return {
            xMin: xMin, 
            xMax: xMax, 
            zMin: zMin, 
            zMax: zMax, 
        }
    }

    canMoveUp(otherObjects: LevelObject[], distance: number) {
        const boundaries = this.boundaries();
        for (const otherObject of otherObjects) {
            const otherObjectBoundaries = otherObject.boundaries()
            const isIntersecting =
                (
                    (boundaries.xMin > otherObjectBoundaries.xMin && boundaries.xMin < otherObjectBoundaries.xMax) ||
                    (boundaries.xMax > otherObjectBoundaries.xMin && boundaries.xMax < otherObjectBoundaries.xMax)
                ) 
                && (boundaries.zMax+distance) > otherObjectBoundaries.zMin
                && boundaries.zMax <  otherObjectBoundaries.zMax
            if (isIntersecting) {
                return false;
            }
        }
        return true;
    }

    canMoveDown(otherObjects: LevelObject[], distance: number) {
        const boundaries = this.boundaries();
        for (const otherObject of otherObjects) {
            const otherObjectBoundaries = otherObject.boundaries()
            const isIntersecting =
                (
                    (boundaries.xMin > otherObjectBoundaries.xMin && boundaries.xMin < otherObjectBoundaries.xMax) ||
                    (boundaries.xMax > otherObjectBoundaries.xMin && boundaries.xMax < otherObjectBoundaries.xMax)
                ) 
                && (boundaries.zMin-distance) < otherObjectBoundaries.zMax
                && boundaries.zMin > otherObjectBoundaries.zMin
            if (isIntersecting) {
                return false;
            }
        }
        return true;
    }

    canMoveRight(otherObjects: LevelObject[], distance: number) {
        const boundaries = this.boundaries();
        for (const otherObject of otherObjects) {
            const otherObjectBoundaries = otherObject.boundaries()
            const isIntersecting =
                (
                    (boundaries.zMin > otherObjectBoundaries.zMin && boundaries.zMin < otherObjectBoundaries.zMax) ||
                    (boundaries.zMax > otherObjectBoundaries.zMin && boundaries.zMax < otherObjectBoundaries.zMax)
                ) 
                && (boundaries.xMin-distance) < otherObjectBoundaries.xMax
                && boundaries.xMin > otherObjectBoundaries.xMin
            if (isIntersecting) {
                return false;
            }
        }
        return true;
    }

    canMoveLeft(otherObjects: LevelObject[], distance: number) {
        const boundaries = this.boundaries();
        for (const otherObject of otherObjects) {
            const otherObjectBoundaries = otherObject.boundaries()
            const isIntersecting =
                (
                    (boundaries.zMin > otherObjectBoundaries.zMin && boundaries.zMin < otherObjectBoundaries.zMax) ||
                    (boundaries.zMax > otherObjectBoundaries.zMin && boundaries.zMax < otherObjectBoundaries.zMax)
                ) 
                && (boundaries.xMax+distance) > otherObjectBoundaries.xMin
                && boundaries.xMin < otherObjectBoundaries.xMax
            if (isIntersecting) {
                return false;
            }
        }
        return true;
    }
}