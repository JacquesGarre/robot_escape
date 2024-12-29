import Game from "./src/domain/game";
import Level from "./src/domain/level";
import WebBrowserGame from "./src/infrastructure/web_browser_game";

let level1 = new Level({
    index: 0,
    size: 6,
    boxes: [
        {
            x: 5,
            z: 3,
        }
    ],
    robot: {
        x: 0,
        z: 0,
    },
    elevator: {
        x: 1,
        z: 1
    },
    enemies: [
        {
            index: 0,
            x: 2,
            z: 2,
            rotation: 270,
        }
    ]
})
let level2 = new Level({
    index: 1,
    size: 10,
    boxes: [
        {
            x: 3,
            z: 3,
        },
        {
            x: 7,
            z: 6,
        }
    ],
    robot: {
        x: 1,
        y: 0,
        z: 1,
    },
    elevator: {
        x: 8,
        z: 8
    }
})
let level3 = new Level({
    index: 2,
    size: 9,
    boxes: [
        {
            x: 3,
            z: 3,
        },
        {
            x: 6,
            z: 6,
        }
    ],
    robot: {
        x: 8,
        y: 0,
        z: 8,
    },
    elevator: {
        x: 0,
        z: 0
    }
})
let level4 = new Level({
    index: 3,
    size: 7,
    boxes: [
        {
            x: 3,
            z: 3,
        },
        {
            x: 1,
            z: 1,
        }
    ],
    robot: {
        x: 0,
        y: 0,
        z: 0,
    },
    elevator: {
        x: 6,
        z: 6
    }
})

let game = new Game({
    levels: [
        level1,
        level2,
        level3,
        level4
    ]
});


WebBrowserGame.start(game);
