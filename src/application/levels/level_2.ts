import LevelConfig from "../../domain/interface/level_config";

export const level2: LevelConfig = {
    index: 1,
    name: "The friend",
    description: "Silence is golden",
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
            earSight: 60,
        }
    ]
}