import LevelNotFoundError from "./errors/level_not_found_error";
import GameConfig from "./interface/game_config";
import LevelConfig from "./interface/level_config";
import Level from "./level";

export default class Game {

    levels: Level[]
    currentLevelIndex: number;

    constructor(config: GameConfig) {
        this.currentLevelIndex = 0;
        this.levels = this.initializeLevels(config.levels);
    }

    initializeLevels(levelsConfig: LevelConfig[]): Level[] {
        let levels: Level[] = [];
        for(const levelConfig of levelsConfig) {
            levels.push(new Level(levelConfig));
        }
        return levels;
    }

    currentLevel(): Level {
        if (this.currentLevelIndex < 0 || this.currentLevelIndex >= this.levels.length) {
            throw new LevelNotFoundError(`Level index ${this.currentLevelIndex} does not exist`);
        }
        return this.levels[this.currentLevelIndex];
    }

    animate(delta: number) {
        //console.log("Game is running")
    }

}