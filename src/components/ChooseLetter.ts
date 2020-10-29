
import b from 'bss';
import m from 'mithril';
import { MY_LETTER } from '../globals';

const ChooseLetter: m.Component = {

    view: function () {

        const randomLetters = ['d', 'a', 'n', 'c', 'e'].sort(() => Math.random() - 0.5);
        const isDance = randomLetters.join('') == 'dance';
        const rngColor = () => '#' + ['f0', '60', '10'].sort(() => Math.random() - .5).join('');

        let style = randomLetters.map(_ =>
            b.ff('Gloria Hallelujah').fs('48pt')
                .m('0.2rem').p('1rem').cursor('pointer').w('7rem')
                .borderRadius('0.2rem').border('none')
                .background('none')
                .color(isDance ? rngColor() : '#555').outline('none')
                .$animate(`${isDance ? `${200 + Math.random() * 100}ms` : '200ms'} ${isDance ? 'infinite' : ''} ease`, {
                    from: b.o(0).filter('hue-rotate(0deg)').style,
                    '50%': b.filter('hue-rotate(360deg)').style,
                    to: b.o(1).filter('hue-rotate(0deg)').style
                })
                .$hover(b.color('pink'))
        );

        return m('div' + b.d('flex').flexFlow('row wrap').p('2rem')
            .justifyContent('center').userSelect('none'),
            randomLetters.map((l, idx) => {

                return m('button' + style[idx],
                    { onclick: () => { MY_LETTER(l); } },
                    l + '.');
            }),
        );
    }
};

export default ChooseLetter;