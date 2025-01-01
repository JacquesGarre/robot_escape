import PathNode from "./path_node";

export default interface EnemyConfig {
    index: number;
    x: number;
    z: number;
    rotation?: number | undefined;
    eyeSight?: number | undefined; 
    earSight?: number | undefined;
    walkingSpeed?: number | undefined;
    runningSpeed?: number | undefined;
    loopingPath?: PathNode[] | undefined;
}