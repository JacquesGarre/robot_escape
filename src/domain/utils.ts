export default class Utils {

    static round(value: number): number {
        return Math.round(value * 1000) / 1000
    }

    static toRadians(angle: number): number {
        return angle * (Math.PI / 180);
    }

    static lineIntersectsAABB(
        x1: number, z1: number,
        x2: number, z2: number,
        minX: number, maxX: number,
        minZ: number, maxZ: number
    ): boolean {
        const dx = x2 - x1;
        const dz = z2 - z1;
        if (dx === 0) {
            return x1 >= minX && x1 <= maxX && (
                (z1 <= maxZ && z2 >= minZ) || (z2 <= maxZ && z1 >= minZ)
            );
        }
        if (dz === 0) {
            return z1 >= minZ && z1 <= maxZ && (
                (x1 <= maxX && x2 >= minX) || (x2 <= maxX && x1 >= minX)
            );
        }
        const t1 = (minX - x1) / dx;
        const t2 = (maxX - x1) / dx;
        const t3 = (minZ - z1) / dz;
        const t4 = (maxZ - z1) / dz;
        const tMin = Math.max(Math.min(t1, t2), Math.min(t3, t4));
        const tMax = Math.min(Math.max(t1, t2), Math.max(t3, t4));
        return tMax >= 0 && tMin <= tMax && tMin <= 1;
    }

    static isObstructed(
        x1: number, 
        z1: number, 
        x2: number, 
        z2: number, 
        x3: number,
        z3: number,
        width: number
    ): boolean {
        const xMin = x3 - width / 2;
        const xMax = x3 + width / 2;
        const zMin = z3 - width / 2;
        const zMax = z3 + width / 2;
        return this.lineIntersectsAABB(x1, z1, x2, z2, xMin, xMax, zMin, zMax);
    }

}