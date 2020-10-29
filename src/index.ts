
import b from "bss";
import m from "mithril";
import ChooseLetter from "./components/ChooseLetter";
import MapPage from "./components/MapPage";
import Result from "./components/Result";
import WSConnect from "./components/WSConnect";
import { MY_LETTER, WEB_SOCKET } from "./globals";

const Home: m.Component = {

    oninit: function () {
        const letter = localStorage.getItem('letter');
        if (letter) {
            MY_LETTER(letter);
        }
    },

    view: function () {

        let content: m.Children;
        if (!MY_LETTER()) {
            content = m(ChooseLetter);
        } else if (!WEB_SOCKET()) {
            content = m(WSConnect);
        } else if (WEB_SOCKET()) {
            content = [m(Result), m(MapPage)];
        }

        return m('div' + b.h('100%').d('flex')
            .flexFlow('column').alignItems('center').justifyContent('center'),
            content,
            m('button' + b.position('fixed').top(5).right(5).zIndex('10')
                .c('#ffaaaa').cursor('pointer').fontSize('14pt')
                .bc('transparent').border('none').outline('none'),
                { onclick: () => { MY_LETTER(undefined); } },
                'X'),
        );
    }
};

(() => {
    const body = document.getElementsByTagName('body')[0];
    body.className = b.bc('#111').c('#e6d6c6');

    m.mount(body, Home);
})();
