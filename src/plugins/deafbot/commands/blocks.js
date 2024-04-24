import axios from 'axios';

export default async (...args) => {
    switch (args[0]) {
        case 'list':
            axios.get('/worker2/friends').then((f) => {
                if (f.data.error) bb.plugins.deafbot.send(`Error fetching blocks: **${f.data.reason}**`);
                else bb.plugins.deafbot.send(`**${f.data.blocks.length}** blocks: ${f.data.blocks.map(f => f.username).join(', ')}`);
            });
            break;

        case 'add':
            if (!args[1]) return bb.plugins.deafbot.send(`Whoa - you want to block yourself or something? Tell me who to block!`);

            axios.post('/worker/friends/block', { user: args[1] }).then((f) => {
                if (f.data.error) bb.plugins.deafbot.send(`Error blocking user: **${f.data.reason}**. I guess they get mercy for now.`);
                else bb.plugins.deafbot.send(`Blocked **${args[1]}**. You must be in a GREAT mood!`);
            });
            break;

        case 'remove':
            if (!args[1]) return bb.plugins.deafbot.send(`Tell me to remove, or keep hating people. I don't care.`);

            axios.post('/worker/friends/unblock', { user: args[1] }).then((f) => {
                if (f.data.error) bb.plugins.deafbot.send(`Error removing block: **${f.data.reason}**. L them.`);
                else bb.plugins.deafbot.send(`You are no longer blocking **${args[1]}**. How nice you must feel today!`);
            });
            break;

        case 'check':
            if (!args[1]) return bb.plugins.deafbot.send(`Specify a username to check.`);

            axios.get('/worker2/friends').then((f) => {
                if (f.data.error) bb.plugins.deafbot.send(`Error fetching blocks: **${f.data.reason}**`);
                else bb.plugins.deafbot.send(`**${args[1]}** is **${f.data.blocks.map(a => a.username).map(a => a.toLowerCase()).includes(args[1].toLowerCase()) ? 'blocked' : 'not blocked'}**.`);
            });
            break;

        default:
            bb.plugins.deafbot.send(`Subcommands: **list** ~ **add** ~ **remove** ~ **check**`);
            break;
    };
};