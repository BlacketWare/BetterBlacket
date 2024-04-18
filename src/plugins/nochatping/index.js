import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    name: 'No Chat Ping',
    description: 'prevents you from being pinged in chat.',
    authors: [{ name: 'Death', avatar: 'https://i.imgur.com/PrvNWub.png', url: 'https://villainsrule.xyz' }],
    patches: [
        {
            file: '/lib/js/game.js',
            replacement: [
                {
                    match: /message\.message\.mentions\.includes\(\w+\.user\.id\.toString\(\)\)/,
                    replace: 'false'
                },
                {
                    match: /data\.data\.message\.mentions\.includes\(blacket\.user\.id\.toString\(\)\)/,
                    replace: 'false'
                },
                {
                    match: /\$\{mentioned/,
                    replace: `\${bb.plugins.settings['No Chat Ping']?.['Keep Highlight'] && rawMessage.includes(blacket.user.id.toString()) || mentioned`
                }
            ]
        }
    ],
    settings: [
        {
            name: 'Keep Highlight',
            default: false
        }
    ]
});