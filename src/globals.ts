
import L, { LatLng } from "leaflet";
import stream from "mithril/stream";

declare const DEV_ENV: boolean | undefined;

export const WS_URL = DEV_ENV
    ? `ws://${location.hostname}:9000/ws`
    : `wss://${location.host}/ws`;

export type Letters = 'a' | 'b' | 'c' | 'd' | 'e';
export type LettersMap = { [K in Letters]: { lat: number, lng: number, online: string; } };
export type LettersMap2 = { [K in Letters]: { lat: number, lng: number, online: Date; } };


export const REFRESH_MS = 10_000;

export const MY_LETTER = stream<string | undefined>();
export const LATLNG = stream<L.LatLng>();
export const WEB_SOCKET = stream<WebSocket | undefined>();

export const EVERY_ONE = stream<LettersMap2>();
export const AVG = EVERY_ONE.map(vs => {

    const latlngs = Object.values(vs);
    const lat = latlngs.reduce((acc, v) => acc + v.lat, 0) / latlngs.reduce((acc) => acc + 1, 0);
    const lng = latlngs.reduce((acc, v) => acc + v.lng, 0) / latlngs.reduce((acc) => acc + 1, 0);
    console.log(lat, lng);
    return new LatLng(lat, lng);
});


export const toHue = function (str: string) {

    str = str.repeat(10);

    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    return hash % 360;
};
