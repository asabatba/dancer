
import m from 'mithril';
import { EVERY_ONE, LettersMap, LettersMap2, WEB_SOCKET, WS_URL } from '../globals';


const WSConnect: m.Component = {

    oninit: function () {

        const wss = new WebSocket(WS_URL);

        wss.onopen = (ev) => {
            WEB_SOCKET(wss);
            m.redraw();
        };
        wss.onmessage = (ev) => {
            const parsedJson = JSON.parse(ev.data) as LettersMap;

            const oneHourAgo = (new Date());
            oneHourAgo.setHours(oneHourAgo.getHours() - 1);

            for (const obj in (parsedJson)) {
                const parsedDate = new Date(parsedJson[obj].online);
                if (parsedDate < oneHourAgo) {
                    delete parsedJson[obj];
                    continue;
                }
                parsedJson[obj] = {
                    ...parsedJson[obj],
                    online: parsedDate,
                };
            }

            EVERY_ONE(parsedJson as unknown as LettersMap2);
            m.redraw();
        };
    },
    view: function () {

        return m('div', 'connecting to ws...');
    }
};

export default WSConnect;