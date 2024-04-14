import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    title: 'No Chat Color',
    description: 'disables color in chat.',
    authors: [{ name: 'Syfe', avatar: 'https://i.imgur.com/OKpOipQ.gif', url: 'https://github.com/ItsSyfe' }],
    patches: [
        {
            file: '/lib/js/game.js',
            replacement: [
                {
                    match: /\$\{data\.author\.color/,
                    replace: `\${"#ffffff"`,
                    setting: 'No Username Colors'
                },
                {
                    match: /\$\{blacket\.chat\.cached\.users\[id\]\.color/,
                    replace: `\${"#ffffff"`,
                    setting: 'No Mention Colors'
                },
                {
                    match: /\!data\.author\.permissions\.includes\("use_chat_colors"\)/,
                    replace: `bb.plugins.settings['No Chat Color']?.['No Message Colors'] ?? true`,
                    setting: 'No Message Colors'
                },
                {
                    match: /\$\{data\.author\.clan\.color\}/,
                    replace: `\${"#ffffff"}`,
                    setting: 'No Clan Colors'
                }
            ]
        }
    ],
    settings: [
        { name: 'No Username Colors', default: true },
        { name: 'No Mention Colors', default: true },
        { name: 'No Message Colors', default: true },
        { name: 'No Clan Colors', default: true }
    ]
});