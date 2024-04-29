import axios from 'axios';

export default async (...args) => {
    let calculate = (exp) => {
        let level = 0;
        let needed = 0;
        for (let i = 0; i <= 27915; i++) {
            needed = 5 * Math.pow(level, blacket.config.exp.difficulty) * level;
            if (exp >= needed) {
                exp -= needed;
                level++;
            };
        };
        return { level, needed, exp };
    };

    if (args[0]) return axios.get('/worker2/user/' + args[0]).then((u) => {
        if (u.data.error) return bb.plugins.deafbot.send(`Error fetching user ${args[0]}: **${u.data.reason}**`);
        
        let levelData = calculate(u.data.user.exp);
        bb.plugins.deafbot.send(`**${u.data.user.username}** is level **${levelData.level}**. They need **${Math.round(levelData.needed).toLocaleString()} XP** to advance, and they're currently **${Math.round((levelData.exp / levelData.needed)*100)}%** complete.`);
    });

    let levelData = blacket.user.level && blacket.user.needed ? blacket.user : calculate(blacket.user.exp);
    bb.plugins.deafbot.send(`You are level **${levelData.level}**. You need **${Math.round(levelData.needed).toLocaleString()} XP** to advance, and you're currently **${Math.round((levelData.exp / levelData.needed)*100)}%** complete.`);
};