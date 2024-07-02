import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    name: 'Tokens Everywhere',
    description: 'shows your token count on ALL pages!',
    authors: [{ name: 'Death', avatar: 'https://i.imgur.com/PrvNWub.png', url: 'https://villainsrule.xyz' }],
    patches: [
        {
            file: '/lib/js/game.js',
            replacement: [
                {
                    match: /\$\("#roomDropdownGlobal"\)/,
                    replace: `$self.updateTokens();$("#roomDropdownGlobal")`
                }
            ]
        },
        {
            file: '/lib/js/blooks.js',
            replacement: [
                {
                    match: /-= quantity;/,
                    replace: `-= quantity;blacket.user.tokens += blacket.blooks[blacket.blooks.selected].price*quantity;$self.updateTokens();`
                }
            ]
        }
    ],
    updateTokens: () => $('#tokenBalance > div:nth-child(2)').html(blacket.user.tokens.toLocaleString()),
    onLoad: () => {
        if ([
            'leaderboard',
            'clans/discover',
            'blooks',
            'inventory',
            'settings'
        ].some(path => location.pathname.startsWith(`/${path}`))) {
            document.querySelector('.styles__topRightRow___dQvxc-camelCase').insertAdjacentHTML('afterbegin', `
                <div id="tokenBalance" class="styles__tokenBalance___1FHgT-camelCase">
                    <img loading="lazy" src="/content/tokenIcon.webp" alt="Token" class="styles__tokenBalanceIcon___3MGhs-camelCase" draggable="false">
                    <div>tokens</div>
                </div>
            `);
        };
    }
});