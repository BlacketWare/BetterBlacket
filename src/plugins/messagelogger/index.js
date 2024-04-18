import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    name: 'Message Logger',
    description: 'view deleted messages like a staff would.',
    authors: [{ name: 'Death', avatar: 'https://i.imgur.com/PrvNWub.png', url: 'https://villainsrule.xyz' }],
    disabled: !0,
    patches: [
        {
            file: '/lib/js/game.js',
            replacement: [
                {
                    match: /blacket\.user\.perms\.includes\("delete_messages"\) \|\| blacket\.user\.perms\.includes\("\*"\)/,
                    replace: 'true'
                }
            ]
        }
    ]
});