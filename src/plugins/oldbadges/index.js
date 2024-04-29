import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    name: 'OldBadges',
    description: 'reverts the first badge upgrade, returning many badges to the original state.',
    authors: [{ name: 'Death', avatar: 'https://i.imgur.com/PrvNWub.png', url: 'https://villainsrule.xyz' }],
    patches: [
        {
            file: '/lib/js/all.js',
            replacement: [
                {
                    match: /Object.assign/,
                    replace: `data=$self.modify(data);Object.assign`
                }
            ]
        }
    ],
    modify: (data) => {
        let oldBadges = {
            Plus: 'https://i.imgur.com/qu3WJQ6.png',
            Owner: 'https://i.imgur.com/w5PV2jw.png',
            Artist: 'https://i.imgur.com/2EGHbLG.png',
            'Legacy Ankh': 'https://i.imgur.com/m0Vin3j.png',
            Booster: 'https://i.imgur.com/7E20vLD.png',
            Verified: 'https://i.imgur.com/RwlUTSe.png',
            'Verified Bot': 'https://i.imgur.com/0eLB3Xz.png',
            Tester: 'https://i.imgur.com/0K816Nj.png',
            Staff: 'https://i.imgur.com/dmJ2lIB.png',
            OG: 'https://i.imgur.com/kWNfORf.png',
            'Big Spender': 'https://i.imgur.com/bpr9QoT.png'
        };

        if (bb.plugins.settings['OldBadges']['Co-Owner to Owner']) oldBadges['Co-Owner'] = oldBadges['Owner'];

        Object.entries(oldBadges).forEach(([badge, url]) => data.badges[badge].image = url);
        return data;
    },
    settings: [{
        name: 'Co-Owner to Owner',
        default: false
    }]
});