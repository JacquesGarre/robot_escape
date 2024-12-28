import Game from "./src/domain/game";
import Level from "./src/domain/level";
import WebBrowserGame from "./src/infrastructure/web_browser_game";

let level1 = new Level({
    size: 6,
    boxes: [
        {
            x:2,
            z:2
        }
    ]
})
let game = new Game({
    levels: [
        level1
    ]
});

let browserGame = WebBrowserGame.fromGame(game);
let container = document.createElement('div');
document.body.appendChild(container);
container.appendChild(browserGame.renderer.domElement);
container.appendChild(browserGame.stats.dom);