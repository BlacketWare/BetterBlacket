import axios from 'axios';
import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    name: 'Bazaar Sniper',
    description: 'pew pew! sniped right off the bazaar!',
    authors: [{ name: 'Death', avatar: 'https://i.imgur.com/PrvNWub.png', url: 'https://villainsrule.xyz' }],
    onStart: () => {
        let checkBazaar = setInterval(() => {
            if (blacket.login || blacket.config.path === '') return clearInterval(checkBazaar);
            if (!blacket.user) return;

            axios.get('/worker/bazaar').then((bazaar) => {
                bazaar.data.bazaar.forEach((bazaarItem) => {
                    let blookData = blacket.blooks[bazaarItem.item];
                    if (!(!!blookData) || (blookData.price < bazaarItem.price) || bazaarItem.seller === blacket.user.username) return;

                    axios.post('/worker/bazaar/buy', { id: bazaarItem.id }).then((purchase) => {
                        if (purchase.data.error) return console.log(`[Bazaar Sniper] Error sniping Blook`, bazaarItem, purchase);

                        console.log(`[Bazaar Sniper] Sniped a blook!`, bazaarItem);
                        alert(`Sniped Blook ${bazaarItem.item} from seller ${bazaarItem.seller} with price ${bazaarItem.price}!\nCheck the console for more information.`);
                    });
                });
            });
        }, 1000);
    }
});