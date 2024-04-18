import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    name: 'Real Total blooks',
    description: 'displays the true number of total blooks on the stats page.',
    authors: [{ name: 'Death', avatar: 'https://i.imgur.com/PrvNWub.png', url: 'https://villainsrule.xyz' }],
    patches: [
        {
            file: '/lib/js/stats.js',
            replacement: [
                {
                    match: /maxBlooks\.toLocaleString\(\)/,
                    replace: `Object.keys(blacket.blooks).length`
                }
            ]
        }
    ]
});