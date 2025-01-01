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
    ]
});
WebBrowserGame.start(game);
