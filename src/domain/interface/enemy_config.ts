export default interface EnemyConfig {
    index: number;
    x: number;
    y?: number | undefined;
    z: number;
    rotation?: number | undefined;
    eyeSight?: number | undefined; 
    earSight?: number | undefined;
    walkingSpeed?: number | undefined;
    runningSpeed?: number | undefined;
}