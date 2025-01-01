import LevelConfig from "../../domain/interface/level_config";

export const level10: LevelConfig = {
    index: 9,
    name: "Four squares",
    description: "",
    size: 5,
    boxes: [
        {
            x:1,
            z:3
        },
        {
            x:1,
            z:1
        },
        {
            x:3,
            z:3
        },
        {
            x:3,
            z:1
        }
    ],
    robot: {
        x: 0,
        z: 0,
    },
    elevator: {
        x: 4,
        z: 4
    },
    enemies: [
        {
            index: 15,
            x: 2,
            z: 4,
            rotation: 180
        },
        {
            index: 16,
            x: 4,
            z: 0
        },
        {
            index: 17,
            x: 4,
            z: 2,
            rotation: 90
        },
    ]
}