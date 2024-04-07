import { devs } from '../../constants.js';
import createPlugin from 'utils/createPlugin.js';

export default () => createPlugin({
    title: 'Staff Tags',
    description: 'gives staff who speak in chat a special tag.',
    author: devs.thonk,
    patches: [
        {
            file: '/lib/js/game.js',
            replacement: [
                {
                    match: /\$\{badges\}/,
                    replace: `\${badges} \${['Owner', 'Admin', 'Moderator', 'Helper'].includes(data.author.role) || bb.plugins.settings['Staff Tags']?.['Show Artists'] && data.author.role === 'Artist' || bb.plugins.settings['Staff Tags']?.['Show Testers'] && data.author.role === 'Tester' ? \`<span class="bb_roleTag">\${data.author.role}</span>\` : ''}`
                }
            ]
        }
    ],
    styles: `
        .bb_roleTag {
            margin-left: 0.208vw;
            background: #2f2f2f;
            padding: 1px 8px;
            border-radius: 10px;
            font-size: 1vw;
            color: white;
        }
    `,
    settings: [
        {
            name: 'Show Testers',
            default: true
        },
        {
            name: 'Show Artists',
            default: true
        }
    ]
});