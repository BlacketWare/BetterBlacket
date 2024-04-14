import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    title: 'No Chat Colors',
    description: 'disables all colors in chat.',
    authors: [{ name: 'Syfe', avatar: 'https://i.imgur.com/OKpOipQ.gif', url: 'https://github.com/ItsSyfe' }],
    patches: [
        {
            file: '/lib/js/game.js',
            replacement: [
                {
                    match: /\$\{data\.author\.color/,
                    replace: `\${"#ffffff"`,
                    setting: 'No username colors'
                },
                {
                    match: /\$\{blacket\.chat\.cached\.users\[id\]\.color/,
                    replace: `\${"#ffffff"`,
                    setting: 'No mentioned username colors'
                },
                {
                    match: /\!data\.author\.permissions\.includes\("use_chat_colors"\)/,
                    replace: `bb.plugins.settings['No Chat Colors']?.['No message colors'] ?? true`,
                    setting: 'No message colors'
                },
                {
                    match: /\$\{data\.author\.clan\.color\}/,
                    replace: `\${"#ffffff"}`,
                    setting: 'No clan colors'
                }
            ]
        }
    ],
    settings: [
        { name: 'No Username Colors', default: true },
        { name: 'No Mentioned Username Colors', default: true },
        { name: 'No Message Colors', default: true },
        { name: 'No Clan Colors', default: true }
    ]
});