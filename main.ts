import Game from "./src/domain/game";
import WebBrowserGame from "./src/infrastructure/web_browser_game";
import {level1} from "./src/application/levels/level_1";
import {level2} from "./src/application/levels/level_2";
import {level3} from "./src/application/levels/level_3";
import {level4} from "./src/application/levels/level_4";
import {level5} from "./src/application/levels/level_5";
import {level6} from "./src/application/levels/level_6";
import {level7} from "./src/application/levels/level_7";
import {level8} from "./src/application/levels/level_8";
import {level9} from "./src/application/levels/level_9";
import {level10} from "./src/application/levels/level_10";
import {level11} from "./src/application/levels/level_11";
import {level12} from "./src/application/levels/level_12";
import {level13} from "./src/application/levels/level_13";

const game = new Game({
    levels: [
        level1,
        level2,
        level3,
        level4,
        level5,
        level6,
        level7,
        level8,
        level9,
        level10,
        level11,
        level12,
        level13
    ]
});
WebBrowserGame.start(game);
