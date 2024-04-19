import createPlugin from '#utils/createPlugin';
import { instead } from 'spitroast';

export default () => createPlugin({
    name: 'Faster',
    description: 'Attempt to make blacket run faster.',
    authors: [{ name: 'zastix', avatar: 'https://zastix.club/resources/pfps/pfp_crop.png', url: 'https://zastix.club/' }],
    patches: [
        {
            file: '/lib/js/game.js',
            replacement: [
                {
                    match: /blacket.\getMessages = async \(room, limit\) => {/,
                    replace: `blacket.getMessages = async (room, limit, real = false) => {if (bb.plugins.settings['Faster']['No Load Chat'] && !real) return;`,
                    setting: 'No Load Chat'
                },
                {
                    match: /blacket.\getMessages\(id, 250\);/,
                    replace: `blacket.getMessages(id, 250, true);`,
                    setting: 'No Load Chat'
                },
                {
                    match: /blacket.toggleChat = \(\) => {/,
                    replace: 'blacket.toggleChat = () => {if (!$self.initedChat) blacket.getMessages(blacket.chat.room, 125, true),$self.initedChat = true;',
                }
            ]
        },
        {
            file: '/lib/js/all.js',
            replacement: [
                {
                    match: /blacket\.requests\.get\(\"\/data\/index\.json\"/,
                    replace: `$self.loadData(\"/data/index.json\"`,
                    setting: 'Cache Assests'
                },
            ]
        },
        {
            file: '/lib/js/stats.js',
            replacement: [
                {
                    match: /Object\.keys\(blacket.friends.friends\)/,
                    replace: `[]`,
                    setting: 'No Friends'
                },
                {
                    match: /user\.clan == null/,
                    replace: `true`,
                    setting: 'No Clan On Stats'
                },
            ]
        }
    ],
    settings: [
        // alot of these can be named better but death refuses to add plugin descriptions 
        {
            name: 'No Friends',
            default: true
        },
        {
            name: 'No Clan On Stats',
            default: true
        },
        {
            name: 'Cache Assests',
            default: true
        },
        {
            name: 'No Load Chat',
            default: true
        }
    ],
    loadData(...args) {
        if (bb.plugins.settings['Faster']['Cache Assests']) {
            const fasterAssets = JSON.parse(bb.storage.get('faster_assets'));
            if (fasterAssets && (Date.now() - fasterAssets.time) < (24 * 60 * 60 * 1000))
                return args[1]?.(fasterAssets.data);
            else return blacket.requests.get(args[0], (data) => {
                bb.storage.set('faster_assets', JSON.stringify({
                    time: Date.now(),
                    data
                }));
                args[1]?.(data);
            });
        } else return blacket.requests.get(...args);
    },
    initedChat: false
});
