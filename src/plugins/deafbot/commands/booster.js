import axios from 'axios';

export default async () => {
    let b = await axios.get('/data/index.json');
    if (!b.data.booster.active) return bb.plugins.deafbot.send('There is no active booster.');

    let u = await axios.get('/worker2/user/' + b.data.booster.user);
    bb.plugins.deafbot.send(`<@${u.data.user.id}> (${u.data.user.username}) is boosting with a ${b.data.booster.multiplier}x booster until ${new Date(b.data.booster.time * 1000).toLocaleTimeString().replaceAll(' ', ' ')}!`);
};