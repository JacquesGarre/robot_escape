import Controls from "./controls";
import LevelNotFoundError from "./errors/level_not_found_error";
import GameConfig from "./interface/game_config";
import LevelConfig from "./interface/level_config";
import Level from "./level";

export default class Game {

    levels: Level[]
    currentLevelIndex: number;
    controls: Controls;
    gameOver: boolean = false;
    levelsConfig: LevelConfig[]

    constructor(config: GameConfig) {
        this.currentLevelIndex = 0;
        this.levelsConfig = config.levels
        this.levels = this.initializeLevels();
        this.controls = new Controls();
    }

    initializeLevels(): Level[] {
        let levels: Level[] = [];
        for(const levelConfig of this.levelsConfig) {
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

    restartLevel() {
        this.gameOver = false;
        const currentLevelConfig = this.levelsConfig.find(obj => obj.index === this.currentLevelIndex) as LevelConfig;
        this.levels[this.currentLevelIndex] = new Level(currentLevelConfig);
    }

    animate() {
        let currentLevel = this.currentLevel();
        if (currentLevel.gameOver) {
            this.gameOver = true;
        }
        currentLevel.animate(this.controls);
        if (currentLevel.finished) {
            this.startNextLevel();
        }
    }

}