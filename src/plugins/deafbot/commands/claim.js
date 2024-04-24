import axios from 'axios';

export default async () => {
    let claim = await axios.get('/worker/claim');
    if (claim.data.error) bb.plugins.deafbot.send(`Error: **${claim.data.reason}**`);
    else bb.plugins.deafbot.send(`Claimed **${blacket.config.rewards[claim.data.reward - 1]}** tokens!`);
};