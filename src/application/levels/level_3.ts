import LevelConfig from "../../domain/interface/level_config";

export const level3: LevelConfig = {
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
}