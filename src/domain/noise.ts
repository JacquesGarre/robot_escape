import LevelObject from "./level_object";
import LevelObjectType from "./level_object_type";
import Robot from "./robot";

export default class Noise extends LevelObject { // TODO: Shouldn't extend level object...

    constructor(x: number, z: number) {
        super({
            x: x,
            z: z,
            width: Robot.ROBOT_SIZE
        })
        this.center.x = x;
        this.center.z = z;
        this.type = LevelObjectType.NOISE
    }

}
