import Game from "./src/domain/game";
import Level from "./src/domain/level";
import WebBrowserGame from "./src/infrastructure/web_browser_game";

let level1 = new Level({
    size: 6,
    boxes: [
        {
            x:2,
            z:1
        },
        {
            x:3,
            z:3
        }
    ],
    robot: {
        x: 0,
        y: 0,
        z: 0,
    },
    elevator: {
        x: 0,
        z: 1
    }
})

let game = new Game({
    levels: [
        level1
    ]
});


WebBrowserGame.start(game);
