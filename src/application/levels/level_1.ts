import Level from "../../domain/level";

export const level1 = new Level({
    index: 0,
    size: 4,
    boxes: [],
    robot: {
        x: 0,
        z: 0,
    },
    elevator: {
        x: 3,
        z: 3
    },
    enemies: []
})