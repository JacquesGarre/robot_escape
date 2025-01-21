import Controls from "./controls";
import LevelNotFoundError from "./errors/level_not_found_error";
import GameConfig from "./interface/game_config";
import LevelConfig from "./interface/level_config";
import Level from "./level";

export default class Game {

    levels: Level[] // TODO : Levels value objects?
    currentLevelIndex: number; // TODO : could be in the Levels value objects ?
    controls: Controls;
    gameOver: boolean = false; // TODO : have a state instead
    levelsConfig: LevelConfig[]  // TODO : could be in the Levels value objects ?

    constructor(config: GameConfig) {
        this.currentLevelIndex = 0;
        this.levelsConfig = config.levels
        this.levels = this.initializeLevels(); // TODO : Levels.fromConfig() 
        this.controls = new Controls();
    }

    initializeLevels(): Level[] { // TODO : Move to Levels.fromConfig() 
        let levels: Level[] = [];
        for(const levelConfig of this.levelsConfig) {
            levels.push(new Level(levelConfig));
        }
        return levels;
    }

    previousLevel(): Level | undefined { // TODO : could be in the Levels value objects  (game.levels.previous())
        if ((this.currentLevelIndex-1) < 0 || (this.currentLevelIndex-1) >= this.levels.length) {
            return;
        }
        return this.levels[this.currentLevelIndex-1];
    }

    currentLevel(): Level { // TODO : could be in the Levels value objects (game.levels.current())
        if (this.currentLevelIndex < 0 || this.currentLevelIndex >= this.levels.length) {
            throw new LevelNotFoundError(`Level index ${this.currentLevelIndex} does not exist`);
        }
        return this.levels[this.currentLevelIndex];
    }

    nextLevel(): Level | undefined { // TODO : (game.levels.next())
        if ((this.currentLevelIndex+1) < 0 || (this.currentLevelIndex+1) >= this.levels.length) {
            return;
        }
        return this.levels[this.currentLevelIndex+1];
    }

    startNextLevel() { // TODO :  game.levels.next().start() ?
        let nextLevelIndex = this.currentLevelIndex + 1;
        this.levels[nextLevelIndex].synchronize(this.currentLevel());
        this.currentLevelIndex = nextLevelIndex;
    }

    restartLevel() { // TODO :  game.levels.current().restart() ?
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
