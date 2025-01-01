import LevelConfig from "../../domain/interface/level_config";

export const level12: LevelConfig = {
    index: 11,
    name: "The open corridor",
    description: "Someone should close it",
    size: 10,
    boxes: [
        {
            x:3,
            z:9
        },
        {
            x:3,
            z:8
        },
        {
            x:3,
            z:7
        },
        {
            x:3,
            z:6
        },
        {
            x:3,
            z:5
        },
        {
            x:3,
            z:4
        },
        {
            x:3,
            z:3
        },
        {
            x:3,
            z:2
        },
        
        {
            x:5,
            z:9
        },
        {
            x:5,
            z:5
        },
        {
            x:5,
            z:4
        },
        {
            x:5,
            z:3
        },
        {
            x:5,
            z:2
        },

        {
            x:0,
            z:2,
            movable: true,
        },
        {
            x:1,
            z:2,
            movable: true,
        },
        {
            x:2,
            z:2,
            movable: true,
        },
        {
            x:2,
            z:6,
            movable: true,
        }
    ],
    robot: {
        x: 0,
        z: 0,
    },
    elevator: {
        x: 4,
        z: 9
    },
    enemies: [
        {
            index: 19,
            x: 4,
            z: 5,
            earSight: 50,
        },
        {
            index: 20,
            x: 4,
            z: 3,
            rotation: 180,
            earSight: 50,
        },
        {
            index: 21,
            x: 6,
            z: 9,
            rotation: 180,
            earSight: 50,
        }
    ]
}