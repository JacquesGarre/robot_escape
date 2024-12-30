import Level from "../../domain/level";

export const level6 = new Level({
    index: 5,
    size: 12,
    boxes: [
        {
            x: 11,
            z: 4
        },
        {
            x: 10,
            z: 4
        },
        {
            x: 10,
            z: 3
        },
        {
            x: 10,
            z: 2
        },
        {
            x: 10,
            z: 1
        },
        {
            x: 8,
            z: 1
        },
        {
            x: 7,
            z: 1
        },
        {
            x: 6,
            z: 1
        },
        {
            x: 5,
            z: 1
        },
        {
            x: 4,
            z: 1
        },
        {
            x: 3,
            z: 1
        },
        {
            x: 2,
            z: 1
        },
        {
            x: 0,
            z: 1
        },
        // 2nd line
        {
            x: 8,
            z: 3
        },
        {
            x: 7,
            z: 3
        },
        {
            x: 6,
            z: 3
        },
        {
            x: 5,
            z: 3
        },
        {
            x: 4,
            z: 3
        },
        {
            x: 2,
            z: 3
        },
        {
            x: 2,
            z: 2
        },
        // 3rd line
        {
            x: 8,
            z: 5
        },
        {
            x: 7,
            z: 5
        },
        {
            x: 6,
            z: 5
        },
        {
            x: 5,
            z: 5
        },
        {
            x: 4,
            z: 5
        },
        {
            x: 2,
            z: 5
        },
        {
            x: 3,
            z: 5
        },
        {
            x: 1,
            z: 3
        },
        {
            x: 1,
            z: 4
        },
        {
            x: 1,
            z: 5
        },
        {
            x: 10,
            z: 6
        },
        {
            x: 9,
            z: 6
        },
        {
            x: 8,
            z: 6
        },
        {
            x: 10,
            z: 7,
        },
        {
            x: 10,
            z: 8,
        },
        {
            x: 10,
            z: 9,
        },
        {
            x: 10,
            z: 10,
        },
        {
            x: 8,
            z: 8,
        },
        {
            x: 8,
            z: 9,
        },
        {
            x: 8,
            z: 10,
        },
        {
            x: 6,
            z: 10,
        },
        {
            x: 5,
            z: 10,
        },
        {
            x: 4,
            z: 10,
        },
        {
            x: 3,
            z: 10,
        },
        {
            x: 3,
            z: 11,
        },
        {
            x: 3,
            z: 8,
        },
        {
            x: 4,
            z: 8,
        },
        {
            x: 5,
            z: 8,
        },
        {
            x: 3,
            z: 7,
        },
        {
            x: 4,
            z: 7,
        },
        {
            x: 5,
            z: 7,
        },
        {
            x: 1,
            z: 7,
        },
        {
            x: 0,
            z: 7,
        },
    ],
    robot: {
        x: 11,
        z: 3,
    },
    elevator: {
        x: 0,
        z: 11
    },
    enemies: [
        {
            index: 5,
            x: 1,
            z: 0,
            rotation: 270,
            eyeSight: 25,
            earSight: 0,
            runningSpeed: 2
        },
        {
            index: 6,
            x: 9,
            z: 9,
            rotation: 0,
            eyeSight: 15,
            earSight: 50,
            runningSpeed: 2
        },
        {
            index: 7,
            x: 2,
            z: 7,
            rotation: 180,
            eyeSight: 15,
            earSight: 30,
            runningSpeed: 2
        },
        {
            index: 8,
            x: 3,
            z: 9,
            rotation: 270,
            eyeSight: 15,
            earSight: 30,
            runningSpeed: 2
        }
    ]
})