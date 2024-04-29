export default async (...args) => {    
    eval(`
        let send = (msg) => bb.plugins.deafbot.send(msg);
        ${args.join(' ')}
    `);
};