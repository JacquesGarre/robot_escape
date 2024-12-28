import Game from "./src/domain/game";
import Level from "./src/domain/level";
import WebBrowserGame from "./src/infrastructure/web_browser_game";
import LevelConfig from "./src/domain/interface/level_config";

let level1Config: LevelConfig = {
    size: 4,
    boxes: [
        {
            x:0,
            z:0,
        },
        {
            x:1,
            z:1
        },
        {
            x:0,
            z:3
        }
    ]
}


let level1 = new Level(level1Config)


let levels = [
    level1
];
let gameConfig = {
    levels: levels
}
let game = new Game(gameConfig);

let browserGame = WebBrowserGame.fromGame(game);
let container = document.createElement('div');
document.body.appendChild(container);
container.appendChild(browserGame.renderer.domElement);
container.appendChild(browserGame.stats.dom);