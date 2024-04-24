import axios from 'axios';
import storage from 'utils/storage.js';

export default async (single) => {
    bb.themes.list = [];
    bb.themes.broken = [];

    [...document.querySelectorAll('[id*=\'bb-theme\']')].forEach((v) => v.remove());

    let themes = storage.get('bb_themeData', true).active.filter(a => a.trim() !== '');

    for (let theme of themes) axios.get(theme).then(async (res) => {
        let data = res.data;
        let meta = {};

        const matches = data.match(/\/\*\*\s*\n([\s\S]*?)\*\//s)[1].split('\n');
        if (matches) matches.forEach(input => {
            let match = /@(\w+)\s+([\s\S]+)/g.exec(input);
            if (match) meta[match[1]] = match[2].trim();
        });
        else return bb.themes.broken.push({
            url: theme,
            reason: 'Theme metadata could not be found.'
        });

        const themeStyle = document.createElement('style');
        themeStyle.id = `bb-theme-${btoa(Math.random().toString(36).slice(2))}`;
        themeStyle.innerHTML = data;

        bb.themes.list.push({
            element: themeStyle,
            name: meta.name,
            meta,
            url: theme
        });

        document.head.appendChild(themeStyle);
        console.log(`Loaded theme "${meta.name}".`);
        bb.events.dispatch('themeUpdate');
    }).catch((err) => {
        console.log('Failed to load theme: ' + theme + ' - ', err.message);
        bb.themes.broken.push({
            url: theme,
            reason: 'Theme could not be loaded.'
        });
        bb.events.dispatch('themeUpdate');
    });

    if (single) console.log('Reloaded themes.');
    else console.log('Started loading themes.');
};