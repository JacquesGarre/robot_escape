import LevelConfig from "../../domain/interface/level_config";

export const level4: LevelConfig = {
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
}
