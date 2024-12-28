import Coordinates from "./coordinates";

export default class LevelObject {

    center: Coordinates;
    width: number;
    height: number;
    depth: number;

    constructor(
        center: Coordinates,
        width: number,
        height: number,
        depth: number,
    ) {
        this.center = center;
        this.width = width;
        this.height = height;
        this.depth = depth;
    }

}