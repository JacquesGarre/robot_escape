export default class Utils {

    static round(value: number): number {
        return Math.round(value * 1000) / 1000 // To handle F***IN floats in javascript...!!!
    }

}