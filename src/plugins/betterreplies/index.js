import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    name: 'Better Replies',
    description: 'overhauls the message reply system.',
    authors: [
        { name: 'Death', avatar: 'https://i.imgur.com/PrvNWub.png', url: 'https://villainsrule.xyz' },
        { name: 'Syfe', avatar: 'https://i.imgur.com/OKpOipQ.gif', url: 'https://github.com/ItsSyfe' }
    ],
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
                },
                {
                    match: /quote`\).click\(\(\) => \{/,
                    replace: `quote\`\).click\(\(\) => {return;`
                },
                {
                    match: /\$\(`\#message-context-copy`\)/,
                    replace: `$('#message-context-quote').click(() => $self.quote(data));$('#message-context-copy')`
                },
                {
                    match: /\$\(`\#message-\$\{data.message.id\}-r/,
                    replace: `$(\`#message-\${data.message.id}-quote\`).click(() => $self.quote(data));$(\`#message-\${data.message.id}-r`
                },
                {
                    match: /let delay = 0;/,
                    replace: `window.blacket.chat.update = () => chatBoxUpdate();let delay = 0;`
                }
            ]
        }
    ],
    quote: (data) => {
        let msg = `╭ From <@${data.author.id}> ${localStorage.getItem('chatColor') ? '</c>' : ''}${data.author.clan ? `**<${data.author.clan.color}>[ ${data.author.clan.name} ]</c>**` : ''} ${data.message.content}\n${localStorage.getItem('chatColor') ? `<${localStorage.getItem('chatColor')}>` : ''}`;
        document.querySelector('#chatBox').value = msg;
        document.querySelector('#chatBox').focus();
        blacket.chat.update();
    }
});