export default class Utils {

    static round(value: number): number {
        return Math.round(value * 1000) / 1000
    }

    static toRadians(angle: number): number {
        return angle * (Math.PI / 180);
    }

    static toDegrees(angle: number): number {
        return angle * (180 / Math.PI);
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

    static findPath(start: { x: number; z: number }, target: { x: number; z: number }, grid: number[][]): PathNode[] {
        const openSet: PathNode[] = [];
        const closedSet: PathNode[] = []; 
        const cameFrom = new Map<string, PathNode>();
        const startNode: PathNode = { x: start.x, z: start.z, g: 0, h: 0, f: 0 };
        const targetNode: PathNode = { x: target.x, z: target.z, g: 0, h: 0, f: 0 };
        openSet.push(startNode);
        while (openSet.length > 0) {
            openSet.sort((a, b) => a.f - b.f);
            const current = openSet.shift()!;
            if (current.x === targetNode.x && current.z === targetNode.z) {
                const path: PathNode[] = [];
                let temp: PathNode | undefined = current;
                while (temp) {
                    path.push(temp);
                    temp = cameFrom.get(`${temp.x},${temp.z}`);
                }
                let computedPath = path.reverse();
                computedPath.shift()
                return computedPath;
            }
            closedSet.push(current);
            const neighbors = Utils.getNeighbors(current, grid);
            for (const neighbor of neighbors) {
                if (closedSet.some(n => n.x === neighbor.x && n.z === neighbor.z)) {
                    continue; 
                }
                const tentativeG = current.g + 1; // All moves cost 1
                const existingNeighbor = openSet.find(n => n.x === neighbor.x && n.z === neighbor.z);
                if (!existingNeighbor || tentativeG < (existingNeighbor?.g ?? Infinity)) {
                    const updatedNeighbor: PathNode = {
                        ...neighbor,
                        g: tentativeG,
                        h: Utils.heuristic(neighbor, targetNode),
                        f: tentativeG + Utils.heuristic(neighbor, targetNode),
                    };
                    cameFrom.set(`${updatedNeighbor.x},${updatedNeighbor.z}`, current);
                    if (!existingNeighbor) {
                        openSet.push(updatedNeighbor);
                    }
                }
            }
        }
        return [];
    }

    static getNeighbors(node: PathNode, grid: number[][]): PathNode[] {
        const directions = [
            { x: 0, z: 1 },
            { x: 1, z: 0 },
            { x: 0, z: -1 },
            { x: -1, z: 0 }
        ];
        return directions
            .map(d => ({ x: node.x + d.x, z: node.z + d.z, g: 0, h: 0, f: 0 }))
            .filter(
                n =>
                    n.x >= 0 &&
                    n.z >= 0 &&
                    n.x < grid.length &&
                    n.z < grid[0].length &&
                    grid[n.x][n.z] === 0
            );
    }

    static heuristic(node: PathNode, target: PathNode): number {
        return Math.abs(node.x - target.x) + Math.abs(node.z - target.z); 
    }
    
}