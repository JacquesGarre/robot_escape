import LevelConfig from "../../domain/interface/level_config";

export const level13: LevelConfig = {
    index: 12,
    name: "The choreography",
    description: "Blinded by the music",
    size: 10,
    boxes: [
        {
            x:2,
            z:7
        },
        {
            x:1,
            z:7
        },
        {
            x:2,
            z:6
        },
        {
            x:1,
            z:6
        },

        {
            x:5,
            z:7
        },
        {
            x:4,
            z:7
        },
        {
            x:4,
            z:6
        },
        {
            x:5,
            z:6
        },

        {
            x:8,
            z:7
        },
        {
            x:7,
            z:7
        },
        {
            x:7,
            z:6
        },
        {
            x:8,
            z:6
        },


        {
            x:2,
            z:4
        },
        {
            x:1,
            z:4
        },
        {
            x:2,
            z:3
        },
        {
            x:1,
            z:3
        },

        {
            x:5,
            z:4
        },
        {
            x:4,
            z:4
        },
        {
            x:4,
            z:3
        },
        {
            x:5,
            z:3
        },

        {
            x:8,
            z:4
        },
        {
            x:7,
            z:4
        },
        {
            x:7,
            z:3
        },
        {
            x:8,
            z:3
        }
    ],
    robot: {
        x: 4,
        z: 9,
    },
    elevator: {
        x: 5,
        z: 0
    },
    enemies: [
        {
            index: 22,
            x: 0,
            z: 8,
            earSight: 15,
            eyeSight: 0,
            walkingSpeed: 1.5,
            loopingPath: [
                {
                    x: 1,
                    z: 8,
                },
                {
                    x: 2,
                    z: 8,
                },
                {
                    x: 3,
                    z: 8,
                },
                {
                    x: 3,
                    z: 7,
                },
                {
                    x: 3,
                    z: 6,
                },
                {
                    x: 3,
                    z: 5,
                },
                {
                    x: 3,
                    z: 5,
                },
                {
                    x: 2,
                    z: 5,
                },
                {
                    x: 1,
                    z: 5,
                },
                {
                    x: 0,
                    z: 5,
                },
                {
                    x: 0,
                    z: 6,
                },
                {
                    x: 0,
                    z: 7,
                },
                {
                    x: 0,
                    z: 8,
                },
            ]
        },
        {
            index: 23,
            x: 4,
            z: 8,
            earSight: 15,
            eyeSight: 0,
            walkingSpeed: 1.5,
            loopingPath: [
                {
                    x: 5,
                    z: 8,
                },
                {
                    x: 6,
                    z: 8,
                },
                {
                    x: 6,
                    z: 7,
                },
                {
                    x: 6,
                    z: 6,
                },
                {
                    x: 6,
                    z: 5,
                },
                {
                    x: 5,
                    z: 5,
                },
                {
                    x: 4,
                    z: 5,
                },
                {
                    x: 3,
                    z: 5,
                },
                {
                    x: 3,
                    z: 6,
                },
                {
                    x: 3,
                    z: 7,
                },
                {
                    x: 3,
                    z: 8,
                },
                {
                    x: 4,
                    z: 8,
                },
            ]
        },
        {
            index: 24,
            x: 7,
            z: 5,
            earSight: 15,
            eyeSight: 0,
            walkingSpeed: 1.5,
            loopingPath: [
                {
                    x: 8,
                    z: 5,
                },
                {
                    x: 9,
                    z: 5,
                },
                {
                    x: 9,
                    z: 4,
                },
                {
                    x: 9,
                    z: 3,
                },
                {
                    x: 9,
                    z: 2,
                },
                {
                    x: 8,
                    z: 2,
                },
                {
                    x: 7,
                    z: 2,
                },
                {
                    x: 6,
                    z: 2,
                },
                {
                    x: 6,
                    z: 3,
                },
                {
                    x: 6,
                    z: 4,
                },
                {
                    x: 6,
                    z: 5,
                },
                {
                    x: 7,
                    z: 5,
                },
            ]
        },
        {
            index: 25,
            x: 1,
            z: 5,
            earSight: 15,
            eyeSight: 0,
            walkingSpeed: 1.5,
            loopingPath: [
                {
                    x: 2,
                    z: 5,
                },
                {
                    x: 3,
                    z: 5,
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
                    x: 3,
                    z: 2,
                },
                {
                    x: 2,
                    z: 2,
                },
                {
                    x: 1,
                    z: 2,
                },
                {
                    x: 0,
                    z: 2,
                },
                {
                    x: 0,
                    z: 3,
                },
                {
                    x: 0,
                    z: 4,
                },
                {
                    x: 0,
                    z: 5,
                },
                {
                    x: 1,
                    z: 5,
                },
            ]
        },
        {
            index: 26,
            x: 3,
            z: 0,
            earSight: 15,
            eyeSight: 0,
            walkingSpeed: 1.5,
            loopingPath: [
                {
                    x: 3,
                    z: 1,
                }, 
                {
                    x: 3,
                    z: 2,
                }, 
                {
                    x: 3,
                    z: 3,
                },
                {
                    x: 3,
                    z: 4,
                },
                {
                    x: 3,
                    z: 5,
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
                    x: 3,
                    z: 2,
                },
                {
                    x: 3,
                    z: 1,
                },
                {
                    x: 3,
                    z: 0,
                }
            ]
        },
        {
            index: 27,
            x: 6,
            z: 1,
            earSight: 15,
            eyeSight: 0,
            walkingSpeed: 1.5,
            loopingPath: [
                {
                    x: 6,
                    z: 2,
                }, 
                {
                    x: 6,
                    z: 3,
                },
                {
                    x: 6,
                    z: 4,
                },
                {
                    x: 6,
                    z: 5,
                },
                {
                    x: 6,
                    z: 4,
                },
                {
                    x: 6,
                    z: 3,
                },
                {
                    x: 6,
                    z: 2,
                },
                {
                    x: 6,
                    z: 1,
                },
                {
                    x: 6,
                    z: 0,
                },                
                {
                    x: 6,
                    z: 1,
                }, 
            ]
        },
        {
            index: 28,
            x: 9,
            z: 1,
            earSight: 15,
            eyeSight: 0,
            walkingSpeed: 1.5,
            loopingPath: [
                {
                    x: 8,
                    z: 1,
                }, 
                {
                    x: 7,
                    z: 1,
                },                 
                {
                    x: 6,
                    z: 1,
                },                 
                {
                    x: 5,
                    z: 1,
                },                  
                {
                    x: 4,
                    z: 1,
                },                 
                {
                    x: 3,
                    z: 1,
                },                
                {
                    x: 2,
                    z: 1,
                },                
                {
                    x: 1,
                    z: 1,
                },
                {
                    x: 0,
                    z: 1,
                },
                {
                    x: 1,
                    z: 1,
                },
                {
                    x: 2,
                    z: 1,
                },
                {
                    x: 3,
                    z: 1,
                },
                {
                    x: 4,
                    z: 1,
                },
                {
                    x: 5,
                    z: 1,
                },
                {
                    x: 6,
                    z: 1,
                },
                {
                    x: 7,
                    z: 1,
                },
                {
                    x: 8,
                    z: 1,
                },
                {
                    x: 9,
                    z: 1,
                },
            ]
        },
    ]
}