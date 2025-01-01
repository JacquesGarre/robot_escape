import LevelConfig from "../../domain/interface/level_config";

export const level11: LevelConfig = {
    index: 10,
    name: "A storage room",
    description: "Not so well guarded",
    size: 5,
    boxes: [
        {
            x: 3,
            z: 4,
            movable: true,
        },
        {
            x: 4,
            z: 3,
            movable: true,
        },
        {
            x: 2,
            z: 3,
        },
        {
            x: 3,
            z: 3,
            movable: true,
        },
        {
            x: 1,
            z: 3,
            movable: true,
        },
        {
            x: 0,
            z: 1,
        },
        {
            x: 1,
            z: 1,
        }
    ],
    robot: {
        x: 4,
        z: 4,
    },
    elevator: {
        x: 0,
        z: 0
    },
    enemies: [
        {
            index: 18,
            x: 4,
            z: 0,
            rotation: 90,
            runningSpeed: 5,
        },
    ]
}