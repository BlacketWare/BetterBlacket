import axios from 'axios';

export default async (...args) => {
    switch (args[0]) {
        case 'list':
            axios.get('/worker2/friends').then((f) => {
                if (f.data.error) bb.plugins.deafbot.send(`Error fetching friends: **${f.data.reason}**`);
                else bb.plugins.deafbot.send(`You have **${f.data.friends.length}** friends: ${f.data.friends.map(f => f.username).join(', ')}`);
            });
            break;

        case 'request':
            if (!args[1]) return bb.plugins.deafbot.send(`Tell me who you actually want to request, you friendless fool.`);

            axios.post('/worker/friends/request', { user: args[1] }).then((f) => {
                if (f.data.error) bb.plugins.deafbot.send(`Error friending: **${f.data.reason}** - ig you just don't want friends.`);
                else bb.plugins.deafbot.send(`Sent a friend request to **${args[1]}**. How kind of you :3`);
            });
            break;

        case 'accept':
            if (!args[1]) return bb.plugins.deafbot.send(`Tell me who you actually want to accept, you friendless fool.`);

            axios.post('/worker/friends/accept', { user: args[1] }).then((f) => {
                if (f.data.error) bb.plugins.deafbot.send(`Error accepting: **${f.data.reason}** - ig you just don't want friends.`);
                else bb.plugins.deafbot.send(`Accepted **${args[1]}**'s friend request! How kind of you :3`);
            });
            break;

        case 'remove':
            if (!args[1]) return bb.plugins.deafbot.send(`So you want to KEEP all your bad friends? Tell me who to get rid of!`);

            axios.post('/worker/friends/remove', { user: args[1] }).then((f) => {
                if (f.data.error) bb.plugins.deafbot.send(`Error removing: **${f.data.reason}** - L you. With them forever.`);
                else bb.plugins.deafbot.send(`You are no longer friended to **${args[1]}**. How nice you must feel today!`);
            });
            break;

        case 'check':
            if (!args[1]) return bb.plugins.deafbot.send(`Specify a username to check.`);

            axios.get('/worker2/friends').then((f) => {
                if (f.data.error) bb.plugins.deafbot.send(`Error fetching friends: **${f.data.reason}**`);
                else bb.plugins.deafbot.send(`**${args[1]}** **${f.data.friends.map(a => a.username).map(a => a.toLowerCase()).includes(args[1].toLowerCase()) ? 'is' : 'isn\'t'}** your friend.`);
            });
            break;

        case 'requests':
        case 'incoming':
        case 'pending':
        case 'recieving':
            axios.get('/worker2/friends').then((f) => {
                if (f.data.error) bb.plugins.deafbot.send(`Error fetching friends: **${f.data.reason}**`);
                else bb.plugins.deafbot.send(`You have **${f.data.receiving.length}** incoming requests: ${f.data.receiving.map(f => f.username).join(', ')}`);
            });
            break;

        case 'requested':
        case 'outgoing':
        case 'sending':
            axios.get('/worker2/friends').then((f) => {
                if (f.data.error) bb.plugins.deafbot.send(`Error fetching friends: **${f.data.reason}**`);
                else bb.plugins.deafbot.send(`You have **${f.data.sending.length}** outgoing requests: ${f.data.sending.map(f => f.username).join(', ')}`);
            });
            break;

        case 'mutual':
            if (!args[1]) return bb.plugins.deafbot.send(`Tell me who you want to check for mutual friends, fool.`);

            axios.get('/worker2/user/' + args[1]).then((f) => {
                if (f.data.error) bb.plugins.deafbot.send(`Error: **${f.data.reason}**`);
                else bb.plugins.deafbot.send(`You and **${f.data.user.username}** have **${f.data.user.friends.length}** mutual friends: ${f.data.user.friends.map(f => blacket.friends.friends.find(fr => fr.id === f)).map(a => a?.username).filter(a => a).join(', ')}`);
            });
            break;

        default:
            bb.plugins.deafbot.send(`Subcommands: **list** ~ **request** ~ **accept** ~ **remove** ~ **check**`);
            break;
    };
};