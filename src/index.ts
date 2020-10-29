
import b from "bss";
import m from "mithril";
import ChooseLetter from "./components/ChooseLetter";
import MapPage from "./components/MapPage";
import Result from "./components/Result";
import WSConnect from "./components/WSConnect";
import { MY_LETTER, WEB_SOCKET } from "./globals";

const Home: m.Component = {

    oninit: function () {
    },

    view: function () {

        let see;
        if (!MY_LETTER()) {
            see = m(ChooseLetter);
        } else if (!WEB_SOCKET()) {
            see = m(WSConnect);
        } else if (WEB_SOCKET()) {
            see = [m(Result), m(MapPage)];
        }

        return m('div' + b.h('100%').d('flex')
            .flexFlow('column').alignItems('center').justifyContent('center'),
            see,
        );
    }
};

const body = document.getElementsByTagName('body')[0];
body.className = b.bc('#000').c('#e6d6c6');

m.mount(body, Home);
