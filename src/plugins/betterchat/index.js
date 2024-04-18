import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    name: 'Better Chat',
    description: 'enhances your chatting experience!',
    authors: [{ name: 'Death', avatar: 'https://i.imgur.com/PrvNWub.png', url: 'https://villainsrule.xyz' }],
    patches: [
        {
            file: '/lib/js/game.js',
            replacement: [
                {
                    match: /id="\${randomUsernameId}"/,
                    replace: '',
                    setting: 'Click 2 Clan'
                },
                {
                    match: /style="color: \${data\.author\.co/,
                    replace: `id="\${randomUsernameId}" style="color: \${data.author.co`,
                    setting: 'Click 2 Clan'
                },
                {
                    match: /style="color: \${data\.author\.clan\.color};"/,
                    replace: `onclick="window.open('/clans/discover?name=\${encodeURIComponent(data.author.clan.name)}');" style="color: \${data.author.clan.color};"`,
                    setting: 'Click 2 Clan'
                },
                {
                    match: /\$\{blacket\.config\.path !== "trade" \? `<div class="styles__contextMenuItemContainer___m3Xa3-camelCase" id="message-context-quote">/,
                    replace: `\${(data.author.id !== blacket.user.id) && blacket.config.path !== "trade" ? \`<div class="styles__contextMenuItemContainer___m3Xa3-camelCase" id="message-context-trade">
                        <div class="styles__contextMenuItemName___vj9a3-camelCase">Trade</div>
                        <i class="styles__contextMenuItemIcon___2Zq3a-camelCase fas fa-hand-holding"></i>
                    </div>\` : ""}
                    
                    \${blacket.config.path !== "trade" ? \`<div class="styles__contextMenuItemContainer___m3Xa3-camelCase" id="message-context-quote">`
                },
                {
                    match: /\$\(`#message-context-copy-id`\)\.click\(\(\) => navigator\.clipboard\.writeText\(data\.message\.id\)\);/,
                    replace: `$('message-context-trade').click(() => blacket.tradeUser(data.author.id));
                    $(\`#message-context-copy-id\`).click(() => navigator.clipboard.writeText(data.message.id));`
                }
            ]
        }
    ],
    styles: `
        .styles__chatMessageContainer__G1Z4P-camelCase {
            padding: 1vw 1.5vw;
        }
        
        .styles__chatContainer___iA8ZU-camelCase {
            height: calc(100% - 4.25vw);
        }
        
        div[style="position: absolute;bottom: 0;width: 100%;"] {
            bottom: 1.25vw !important;
            left: 2vw;
            width: calc(100% - 3vw) !important;
        }
        
        .styles__chatInputContainer___gkR4A-camelCase {
            border-radius: 10vw;
        }
        
        .styles__chatUploadButton___g39Ac-camelCase,
        .styles__chatEmojiButton___8RFa2-camelCase {
            border-radius: 50%;
        }

        .styles__chatEmojiPickerContainer___KR4aN-camelCase {
            border-radius: 0 0 0.5vw 0.5vw;
            bottom: 3.3vw;
            background-color: #2f2f2f;
            width: 19vw;
        }

        .styles__chatEmojiPickerBody___KR4aN-camelCase {
            left: unset;
            gap: 0.5vw;
            justify-content: center;
        }

        .styles__chatEmojiPickerHeader___FK4Ac-camelCase {
            font-size: 1.15vw;
            height: 3vw;
            font-weight: 800;
            background-color: #3f3f3f;
        }
    `,
    settings: [{
        name: 'Click 2 Clan',
        default: true
    }]
});