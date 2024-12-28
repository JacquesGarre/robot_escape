import Direction from "./direction";
import Position from "../shared/position";
import Robot from "../robot/robot";

export default class Camera {

	position: Position;
	direction: Direction;

	constructor(
		position: Position,
		direction: Direction
	) {
		this.position = position;
		this.direction = direction;
	}

	static fromRobot(robot: Robot): Camera {
		let position = new Position(
			robot.position.x, 
			60, 
			robot.position.z + 50
		);
		let direction = new Direction(
			robot.position.x,  
			0, 
			robot.position.z
		);
		return new Camera(position, direction);
	}

	zoomIn() {
		if (this.position.z >= 30) {
			this.position.z -= 0.5
		}
	}

}