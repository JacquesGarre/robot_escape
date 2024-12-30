import Game from "./src/domain/game";
import WebBrowserGame from "./src/infrastructure/web_browser_game";
import {level1} from "./src/application/levels/level_1";
import {level2} from "./src/application/levels/level_2";
import {level3} from "./src/application/levels/level_3";
import {level4} from "./src/application/levels/level_4";
import {level5} from "./src/application/levels/level_5";
import {level6} from "./src/application/levels/level_6";

const game = new Game({
    levels: [
        level1,
        level2,
        level3,
        level4,
        level5,
        level6,
    ]
});
WebBrowserGame.start(game);
