
import b from 'bss';
import { LatLng } from 'leaflet';
import m from 'mithril';
import { LATLNG, MY_LETTER, REFRESH_MS, WEB_SOCKET } from '../globals';

function getLocation(): Promise<Position> {

    return new Promise((resolve, reject) => {

        navigator.geolocation
            .getCurrentPosition(function (position) {
                resolve(position);
            }, function (err) {
                reject(err);
            });
    });
}

const Result: m.ClosureComponent = () => {

    let content = 'please give me power';

    return {

        onremove: function () {
            WEB_SOCKET()?.close();
            WEB_SOCKET(undefined);
        },

        oninit: function () {

            getLocation().then((loc: Position) => {

                const { latitude, longitude } = loc.coords;
                // content = latitude + ', ' + longitude;
                content = '^ ^';
                LATLNG(new LatLng(latitude, longitude));

                const updateStatus = () => {
                    if (WEB_SOCKET()?.readyState === WebSocket.OPEN) {
                        WEB_SOCKET()?.send(JSON.stringify({
                            letter: MY_LETTER(),
                            lat: latitude + (Math.random() - .5) / 1_000,
                            lng: longitude + (Math.random() - .5) / 1_000,
                        }));
                    }
                };
                setInterval(updateStatus, REFRESH_MS);
                updateStatus();

                m.redraw();
            }, (err: PositionError) => {
                content = err.message;
                m.redraw();
            });
        },

        view: function (vnode) {

            return m('div.result' + b.fs('12pt').m('1rem'),
                m('code', content),
            );
        }
    };
};

export default Result;