
import b from 'bss';
import L, { LatLng } from "leaflet";
import m from 'mithril';
import { AVG, EVERY_ONE, toHue } from '../globals';

const MapPage: m.ClosureComponent = () => {

    let map: L.Map;
    let markers: L.Marker[] = [];
    let centered = false;

    function clearMarkers() {
        markers.forEach(m => m.remove());
        while (markers.length) markers.pop();
    }

    return {

        oncreate: function (vnode) {

            map = L.map(vnode.dom as HTMLElement,).setView([0, 0], 13);
            L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).addTo(map);

        },
        onupdate: function () {


            if (EVERY_ONE()) {

                clearMarkers();
                Object.entries(EVERY_ONE()).map(([k, v]) => {

                    const col = `hsl(${toHue(k)}, 80%, 80%)`;
                    const m = L.marker(new LatLng(v.lat, v.lng), {
                        icon: L.divIcon({
                            html: `
                    <div style="color:black; background-color: ${col}; font-size:20pt;border-radius:0.6rem;text-align:center">${k}</div>
                    `, iconSize: L.point(32, 32), className: ''
                        })
                    })
                        .addTo(map).bindPopup(`<h1>${k}</h1>`);
                    markers.push(m);
                    console.log(col);
                });
            }

            if (AVG()) {


                if (!centered) {
                    map.setView(AVG(), 13);
                    centered = true;
                }

                const m = L.marker(AVG(), {}).addTo(map)
                    .bindPopup(`<h1>Media</h1>`);
                markers.push(m);
            }
        },
        onbeforeupdate: function (cur, old) {
        },
        view: function () {

            return m('div' + b.width('80vw').height('60vh').borderRadius('1rem'));
        }
    };
};

export default MapPage;