import createPlugin from '#utils/createPlugin';
import commands from './commands/index.js';

export default () => createPlugin({
    name: 'DeafBot',
    description: 'the chatbot you know and love.',
    authors: [{ name: 'Death', avatar: 'https://i.imgur.com/PrvNWub.png', url: 'https://villainsrule.xyz' }],
    patches: [
        {
            file: '/lib/js/game.js',
            replacement: [
                {
                    match: /blacket\.sendMessage =\ async \((.*?)\) => \{/,
                    replace: `blacket.sendMessage = async (room, content, instantSend) => {
                        let rawContent = content.replace(/<(gradient=\\[(?:up|down|left|right|\\d{1,3}deg)(?: |):(?: |)(?:(?:(?:black|lime|white|brown|magenta|cyan|turquoise|red|orange|yellow|green|blue|purple|\\#[0-9a-fA-F]{6})(?:, |,| ,| , |)){2,7})\\]|black|lime|white|brown|magenta|cyan|turquoise|red|orange|yellow|green|blue|purple|(\\#[0-9a-fA-F]{6}))>(.+?)<\\/([^&]+?)>/g, (...args) => {
                            return args[3];
                        });
                        if (rawContent.startsWith(' ')) rawContent = rawContent.slice(1);

                        if (rawContent.startsWith(atob('JA==')) && !instantSend) {
                            let data = rawContent.split(' ');
                            let command = data[0].slice(1);
                            let args = data.slice(1);
                            console.log(\`Executed BB command "\${command}" with args\`, args);
                            if (!bb.plugins.deafbot.commands[command]) return bb.plugins.deafbot.send('Command not found.');
                            bb.plugins.deafbot.commands[command](...args);
                            return;
                        };
                    `
                }
            ]
        }
    ],
    onLoad: () => {
        bb.plugins.deafbot = {
            send: (msg) => {
                let prefix = '**$ sudo node deafbot.js** > > > ';
                blacket.sendMessage(blacket.chat.room, prefix + msg, true);
            },
            commands
        };
    }
});