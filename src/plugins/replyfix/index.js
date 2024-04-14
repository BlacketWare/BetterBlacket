import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    title: 'Reply Fix',
    description: 'fixes blacket\'s broken replies.',
    authors: [{ name: 'Syfe', avatar: 'https://i.imgur.com/OKpOipQ.gif', url: 'https://github.com/ItsSyfe' }],
    patches: [
        {
            file: '/lib/js/game.js',
            replacement: [
                {
                    match: /var tem \= document\.querySelector\('\#chatContainer \.styles__chatMessageContainer__G1Z4P\-camelCase\:last\-child'\);/,
                    replace: `
                        message = message.replace(/&lt;\\/gradient\=.*&gt;/, '');
                        message = message.replace(/&lt;gradient\=.*&gt;/, '');
                        message = message.replace(/&lt;\\\/\#.*&gt;/, '');
                        message = message.replace(/&lt;\#.*&gt;/, '');
                        var tem = document.querySelector('#chatContainer .styles__chatMessageContainer__G1Z4P-camelCase:last-child');
                    `
                }
            ]
        }
    ]
});