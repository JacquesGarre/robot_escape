import PhysicalCoordinates from "../physical_coordinates";

export default interface CameraConfig {
    position: PhysicalCoordinates;
    direction: PhysicalCoordinates;
}