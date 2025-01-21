import BoundariesConfig from "./interface/boundaries_config";

export default class Boundaries {

    xMin: number; // TODO: Use value objects here, those numbers are not random and have limits
    xMax: number;
    yMin: number;
    yMax: number;
    zMin: number;
    zMax: number;

    constructor(config: BoundariesConfig) { // TODO: Make private and have a fromConfig factory method?
        this.xMin = config.xMin;
        this.xMax = config.xMax;
        this.yMin = config.yMin;
        this.yMax = config.yMax;
        this.zMin = config.zMin;
        this.zMax = config.zMax;
    }
}
