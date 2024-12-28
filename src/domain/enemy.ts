import EnemyConfig from "./interface/enemy_config";
import Robot from "./robot";

export class Enemy extends Robot {

    index: number; 

    constructor(config: EnemyConfig) {
        super(config);
        this.index = config.index;
    }

}