import Game from "./src/domain/game";
import Level from "./src/domain/level";
import WebBrowserGame from "./src/infrastructure/web_browser_game";

let level1 = new Level()
let levels = [level1];
let game = new Game({levels});

let browserGame = WebBrowserGame.fromGame(game);
let container = document.createElement('div');
document.body.appendChild(container);
container.appendChild(browserGame.renderer.domElement);
container.appendChild(browserGame.stats.dom);