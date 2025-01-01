import LevelConfig from "../../domain/interface/level_config";

export const level8: LevelConfig = {
    index: 7,
    name: "The corridor",
    description: "The very end of the corner",
    size: 8,
    boxes: [
        {
            x:0,
            z:1
        },
        {
            x:1,
            z:1
        },
        {
            x:2,
            z:1
        },
        {
            x:1,
            z:2
        },
        {
            x:1,
            z:3,
        },
        {
            x:2,
            z:3
        },
        {
            x:2,
            z:4
        },
        {
            x:2,
            z:5
        },
        {
            x:2,
            z:6
        },
        {
            x:2,
            z:7
        },
        {
            x:5,
            z:2
        },
        {
            x:5,
            z:3
        },
        {
            x:5,
            z:4
        },
        {
            x:6,
            z:5
        },
        {
            x:6,
            z:4
        },
        {
            x:6,
            z:6
        },
        {
            x:5,
            z:6
        },
        {
            x:7,
            z:7
        },
        {
            x:7,
            z:6
        },
        {
            x:5,
            z:1
        },
        {
            x:5,
            z:0
        },
    ],
    robot: {
        x: 0,
        z: 0,
    },
    elevator: {
        x: 6,
        z: 7
    },    
    enemies: [
        {
            index: 13,
            x: 3,
            z: 7,
            rotation: 180,
            loopingPath: [
                {
                    x: 3,
                    z: 6,
                },
                {
                    x: 3,
                    z: 5,
                },
                {
                    x: 3,
                    z: 4,
                },
                {
                    x: 3,
                    z: 2,
                },
                {
                    x: 3,
                    z: 1,
                },
                {
                    x: 3,
                    z: 0,
                },
                {
                    x: 4,
                    z: 0,
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
                    x: 4,
                    z: 3,
                },
                {
                    x: 4,
                    z: 4,
                },
                {
                    x: 4,
                    z: 5,
                },
                {
                    x: 4,
                    z: 6,
                },
                {
                    x: 4,
                    z: 7,
                },                
                {
                    x: 3,
                    z: 7,
                },
            ]
        }
    ]
}