import Controls from "./controls";
import LevelNotFoundError from "./errors/level_not_found_error";
import GameConfig from "./interface/game_config";
import LevelConfig from "./interface/level_config";
import Level from "./level";

export default class Game {

    levels: Level[]
    currentLevelIndex: number;
    controls: Controls;

    constructor(config: GameConfig) {
        this.currentLevelIndex = 0;
        this.levels = this.initializeLevels(config.levels);
        this.controls = new Controls();
    }

    initializeLevels(levelsConfig: LevelConfig[]): Level[] {
        let levels: Level[] = [];
        for(const levelConfig of levelsConfig) {
            levels.push(new Level(levelConfig));
        }
        return levels;
    }

    previousLevel(): Level | undefined {
        if ((this.currentLevelIndex-1) < 0 || (this.currentLevelIndex-1) >= this.levels.length) {
            return;
        }
        return this.levels[this.currentLevelIndex-1];
    }

    currentLevel(): Level {
        if (this.currentLevelIndex < 0 || this.currentLevelIndex >= this.levels.length) {
            throw new LevelNotFoundError(`Level index ${this.currentLevelIndex} does not exist`);
        }
        return this.levels[this.currentLevelIndex];
    }

    nextLevel(): Level | undefined {
        if ((this.currentLevelIndex+1) < 0 || (this.currentLevelIndex+1) >= this.levels.length) {
            return;
        }
        return this.levels[this.currentLevelIndex+1];
    }

    startNextLevel() {
        let nextLevelIndex = this.currentLevelIndex + 1;
        this.levels[nextLevelIndex].synchronize(this.currentLevel());
        this.currentLevelIndex = nextLevelIndex;
    }

    animate() {
        let currentLevel = this.currentLevel();
        currentLevel.animate(this.controls);
        if (currentLevel.finished) {
            this.startNextLevel();
        }
    }

}