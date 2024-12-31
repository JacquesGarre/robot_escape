import LevelConfig from "../../domain/interface/level_config";

export const level5: LevelConfig = {
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
}