import BoundariesConfig from "./interface/boundaries_config";

export default class Boundaries {
    
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    zMin: number;
    zMax: number;

    constructor(config: BoundariesConfig) {
        this.xMin = config.xMin;
        this.xMax = config.xMax;
        this.yMin = config.yMin;
        this.yMax = config.yMax;
        this.zMin = config.zMin;
        this.zMax = config.zMax;
    }
}