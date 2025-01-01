import LevelConfig from "../../domain/interface/level_config";

export const level1: LevelConfig = {
    index: 0,
    name: "The bedroom",
    description: "Robots don't need a bed!",
    size: 4,
    boxes: [
        {
            x:1,
            z:3
        }
    ],
    robot: {
        x: 0,
        z: 0,
    },
    elevator: {
        x: 3,
        z: 3
    },
    enemies: []
}