export default class Utils {

    static round(value: number): number {
        return Math.round(value * 1000) / 1000
    }

    static toRadians(angle: number): number {
        return angle * (Math.PI / 180);
    }

}