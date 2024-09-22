import { Color, Vector2, Vector3 } from 'three';
import { Geolocation } from './Geolocation';
export declare class UnitsUtils {
    static EARTH_RADIUS: number;
    static EARTH_RADIUS_A: number;
    static EARTH_RADIUS_B: number;
    static EARTH_PERIMETER: number;
    static EARTH_ORIGIN: number;
    static datumsToSpherical(latitude: number, longitude: number): Vector2;
    static sphericalToDatums(x: number, y: number): Geolocation;
    static quadtreeToDatums(zoom: number, x: number, y: number): Geolocation;
    static vectorToDatums(dir: Vector3): Geolocation;
    static datumsToVector(latitude: number, longitude: number): Vector3;
    static mapboxAltitude(color: Color): number;
}
