import PhysicalCoordinates from "./physical_coordinates"
import CameraConfig from "./interface/camera_config";
import Robot from "./robot";

export default class Camera { // TODO: Should move to infrastructure, does not make sense in the game domain?

    position: PhysicalCoordinates
    direction: PhysicalCoordinates

    constructor(config: CameraConfig) {
        this.position = config.position;
        this.direction = config.direction;
    }

    static fromRobot(robot: Robot): Camera {
        let position = new PhysicalCoordinates(0, 0, 0);
        let direction = new PhysicalCoordinates(0, 0, 0);
        let camera = new Camera({position, direction });
        camera.follow(robot);
        return camera;
    }
    
    follow(robot: Robot) {
        this.position.x = robot.center.x;
        this.position.y = robot.center.y + 40;
        this.position.z = robot.center.z - 30;
        this.direction.x = robot.center.x;
        this.direction.y = robot.center.y + 10;
        this.direction.z = robot.center.z;
    }

}
