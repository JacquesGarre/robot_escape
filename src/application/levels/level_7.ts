import LevelConfig from "../../domain/interface/level_config";

export const level7: LevelConfig = {
    index: 6,
    name: "They got legs",
    description: "Timing is key",
    size: 12,
    boxes: [
        {
            x: 1,
            z: 11,
        },
        {
            x: 1,
            z: 10,
        },
        {
            x: 1,
            z: 9,
        },
        {
            x: 0,
            z: 7,
        },
        {
            x: 1,
            z: 7,
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
        },
        {
            x: 5,
            z: 6,
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
            x: 2,
            z: 10,
        },
        {
            x: 3,
            z: 10,
        },
        {
            x: 4,
            z: 10,
        },
        {
            x: 5,
            z: 10,
        },
        {
            x: 6,
            z: 10,
        },
        {
            x: 6,
            z: 11,
        },
        {
            x: 6,
            z: 9,
        },
        {
            x: 6,
            z: 7,
        },
        
        {
            x: 8,
            z: 11,
        },
        {
            x: 8,
            z: 10,
        },
        {
            x: 8,
            z: 11,
        },
        {
            x: 8,
            z: 9,
        },
        {
            x: 8,
            z: 7,
        },
        {
            x: 6,
            z: 6,
        },
        {
            x: 7,
            z: 6,
        },
        {
            x: 8,
            z: 6,
        },
        {
            x: 10,
            z: 6,
        },
        {
            x: 10,
            z: 7,
        },
        {
            x: 11,
            z: 4,
        },
        {
            x: 10,
            z: 4,
        },
        {
            x: 9,
            z: 4,
        },
        {
            x: 8,
            z: 4,
        },
        {
            x: 4,
            z: 3,
        },
        {
            x: 5,
            z: 3,
        },
        {
            x: 4,
            z: 2,
        },
        {
            x: 5,
            z: 2,
        },
    ],
    robot: {
        x: 0,
        z: 11,
    },
    elevator: {
        x: 0,
        z: 0
    },
    enemies: [
        {
            index: 9,
            x: 3,
            z: 9,
            loopingPath: [
                {
                    x: 2,
                    z: 9,
                },
                {
                    x: 2,
                    z: 8,
                },
                {
                    x: 2,
                    z: 7,
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
                    x: 5,
                    z: 8,
                },
                {
                    x: 5,
                    z: 9,
                },
                {
                    x: 4,
                    z: 9,
                },
                {
                    x: 3,
                    z: 9,
                }
            ]
        },
        {
            index: 10,
            x: 7,
            z: 11,
            loopingPath: [
                {
                    x: 7,
                    z: 10,
                },
                {
                    x: 7,
                    z: 9,
                },
                {
                    x: 7,
                    z: 8,
                },
                {
                    x: 7,
                    z: 7,
                },
                {
                    x: 7,
                    z: 8,
                },
                {
                    x: 7,
                    z: 9,
                },
                {
                    x: 7,
                    z: 10,
                },
                {
                    x: 7,
                    z: 11,
                },
            ]
        },
        {
            index: 11,
            x: 9,
            z: 6,
            rotation: 180,
        },
        {
            index: 12,
            x: 4,
            z: 1,
            rotation: 90,
            loopingPath: [
                {
                    x: 5,
                    z: 1,
                },
                {
                    x: 6,
                    z: 1,
                },
                {
                    x: 6,
                    z: 2,
                },
                {
                    x: 6,
                    z: 3,
                },
                {
                    x: 6,
                    z: 4,
                },
                {
                    x: 5,
                    z: 4,
                },
                {
                    x: 4,
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
                    x: 3,
                    z: 2,
                },
                {
                    x: 3,
                    z: 1,
                },
                {
                    x: 4,
                    z: 1,
                }
            ]
        }
    ]
}