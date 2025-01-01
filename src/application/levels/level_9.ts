import LevelConfig from "../../domain/interface/level_config";

export const level9: LevelConfig = {
    index: 8,
    name: "Schrödinger's box",
    description: "Is there a cat inside?",
    size: 8,
    boxes: [
        {
            x:4,
            z:0,
        },
        {
            x:4,
            z:1,
        },
        {
            x:4,
            z:2,
        },
        {
            x:4,
            z:3,
        },
        {
            x:6,
            z:1,
            movable: true,
        },
        {
            x:4,
            z:5,
        },
        {
            x:4,
            z:6,
        },
        {
            x:4,
            z:7,
        },
        {
            x:3,
            z:5,
        },
        {
            x:3,
            z:6,
        },
        {
            x:2,
            z:6,
        },
        {
            x:1,
            z:6,
        },
        {
            x:1,
            z:5,
        },
        {
            x:0,
            z:6,
        },
        {
            x:0,
            z:5,
        },
    ],
    robot: {
        x: 6,
        z: 7,
    },
    elevator: {
        x: 0,
        z: 0
    },
    enemies: [
        {
            index: 14,
            x: 2,
            z: 5,
            rotation: 180,
            runningSpeed: 5
        }
    ]
}