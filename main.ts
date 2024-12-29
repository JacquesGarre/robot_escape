import Game from "./src/domain/game";
import Level from "./src/domain/level";
import WebBrowserGame from "./src/infrastructure/web_browser_game";

let level1 = new Level({
    index: 0,
    size: 4,
    boxes: [],
    robot: {
        x: 0,
        z: 0,
    },
    elevator: {
        x: 3,
        z: 3
    },
    enemies: []
})


let level2 = new Level({
    index: 1,
    size: 6,
    boxes: [
        {
            x: 3,
            z: 2,
        },
        {
            x: 4,
            z: 2,
        },
        {
            x: 4,
            z: 3,
        },
        {
            x: 4,
            z: 4,
        },
        {
            x: 1,
            z: 0,
        },
        {
            x: 2,
            z: 3,
        },
        {
            x: 2,
            z: 4,
        },
        {
            x: 2,
            z: 5,
        },
        {
            x: 1,
            z: 1,
        },
    ],
    robot: {
        x: 3,
        y: 0,
        z: 3,
    },
    elevator: {
        x: 0,
        z: 0
    },
    enemies: [
        {
            index: 0,
            x: 1,
            z: 5,
            runningSpeed: 2,
            walkingSpeed: 1,
        }
    ]
})


let level3 = new Level({
    index: 2,
    size: 5,
    boxes: [
        {
            x: 3,
            z: 4,
        },
        {
            x: 3,
            z: 3,
        },
        {
            x: 1,
            z: 1,
        },
        {
            x: 1,
            z: 2,
        }
    ],
    robot: {
        x: 0,
        y: 0,
        z: 0,
    },
    elevator: {
        x: 4,
        z: 4
    },
    enemies: [
        {
            index: 1,
            x: 4,
            z: 3,
            runningSpeed: 3,
            walkingSpeed: 1,
            rotation: 180,
            earSight: 30
        }
    ]
})
let level4 = new Level({
    index: 3,
    size: 8,
    boxes: [
        {
            x: 0,
            z: 4,
        },
        {
            x: 1,
            z: 4,
        },
        {
            x: 2,
            z: 4,
        },
        {
            x: 3,
            z: 4,
        },
        {
            x: 3,
            z: 3,
        },
        {
            x: 4,
            z: 3,
        },
        {
            x: 1,
            z: 1,
        },
        {
            x: 4,
            z: 1,
        },
        {
            x: 4,
            z: 2,
        },
        {
            x: 5,
            z: 3,
        },
        {
            x: 5,
            z: 4,
        },
        {
            x: 1,
            z: 6,
        },
        {
            x: 2,
            z: 6,
        },
        {
            x: 3,
            z: 6,
        },
        {
            x: 4,
            z: 6,
        }
    ],
    robot: {
        x: 4,
        y: 0,
        z: 4,
    },
    elevator: {
        x: 0,
        z: 3
    },
    enemies: [
        {
            index: 2,
            x: 0,
            z: 2,
            runningSpeed: 3,
            walkingSpeed: 1,
            rotation: 270,
            earSight: 15
        },
        {
            index: 3,
            x: 6,
            z: 4,
            runningSpeed: 3,
            walkingSpeed: 1,
            rotation: 0,
            earSight: 20
        }
    ]
})

let level5 = new Level({
    index: 4,
    size: 12,
    boxes: [],
    robot: {
        x: 0,
        z: 3,
    },
    elevator: {
        x: 11,
        z: 3
    },
    enemies: [
        {
            index: 4,
            x: 5,
            z: 3,
            runningSpeed: 2.3,
            walkingSpeed: 1,
            rotation: 90,
            earSight: 20,
            eyeSight: 30
        }
    ]
})

let level6 = new Level({
    index: 5,
    size: 12,
    boxes: [
        {
            x: 11,
            z: 4
        },
        {
            x: 10,
            z: 4
        },
        {
            x: 10,
            z: 3
        },
        {
            x: 10,
            z: 2
        },
        {
            x: 10,
            z: 1
        },
        {
            x: 8,
            z: 1
        },
        {
            x: 7,
            z: 1
        },
        {
            x: 6,
            z: 1
        },
        {
            x: 5,
            z: 1
        },
        {
            x: 4,
            z: 1
        },
        {
            x: 3,
            z: 1
        },
        {
            x: 2,
            z: 1
        },
        {
            x: 0,
            z: 1
        },
        // 2nd line
        {
            x: 8,
            z: 3
        },
        {
            x: 7,
            z: 3
        },
        {
            x: 6,
            z: 3
        },
        {
            x: 5,
            z: 3
        },
        {
            x: 4,
            z: 3
        },
        {
            x: 2,
            z: 3
        },
        {
            x: 2,
            z: 2
        },
        // 3rd line
        {
            x: 8,
            z: 5
        },
        {
            x: 7,
            z: 5
        },
        {
            x: 6,
            z: 5
        },
        {
            x: 5,
            z: 5
        },
        {
            x: 4,
            z: 5
        },
        {
            x: 2,
            z: 5
        },
        {
            x: 3,
            z: 5
        },
        {
            x: 1,
            z: 3
        },
        {
            x: 1,
            z: 4
        },
        {
            x: 1,
            z: 5
        },
        {
            x: 10,
            z: 6
        },
        {
            x: 9,
            z: 6
        },
        {
            x: 8,
            z: 6
        },
        {
            x: 10,
            z: 7,
        },
        {
            x: 10,
            z: 8,
        },
        {
            x: 10,
            z: 9,
        },
        {
            x: 10,
            z: 10,
        },
        {
            x: 8,
            z: 8,
        },
        {
            x: 8,
            z: 9,
        },
        {
            x: 8,
            z: 10,
        },
        {
            x: 6,
            z: 10,
        },
        {
            x: 5,
            z: 10,
        },
        {
            x: 4,
            z: 10,
        },
        {
            x: 3,
            z: 10,
        },
        {
            x: 3,
            z: 11,
        },
        {
            x: 3,
            z: 8,
        },
        {
            x: 4,
            z: 8,
        },
        {
            x: 5,
            z: 8,
        },
        {
            x: 3,
            z: 7,
        },
        {
            x: 4,
            z: 7,
        },
        {
            x: 5,
            z: 7,
        },
        {
            x: 1,
            z: 7,
        },
        {
            x: 0,
            z: 7,
        },
    ],
    robot: {
        x: 11,
        z: 3,
    },
    elevator: {
        x: 0,
        z: 11
    },
    enemies: [
        {
            index: 5,
            x: 1,
            z: 0,
            rotation: 270,
            eyeSight: 25,
            earSight: 0,
            runningSpeed: 2
        },
        {
            index: 6,
            x: 9,
            z: 9,
            rotation: 0,
            eyeSight: 15,
            earSight: 50,
            runningSpeed: 2
        },
        {
            index: 7,
            x: 2,
            z: 7,
            rotation: 180,
            eyeSight: 15,
            earSight: 30,
            runningSpeed: 2
        },
        {
            index: 8,
            x: 3,
            z: 9,
            rotation: 270,
            eyeSight: 15,
            earSight: 30,
            runningSpeed: 2
        }
    ]
})

let game = new Game({
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
