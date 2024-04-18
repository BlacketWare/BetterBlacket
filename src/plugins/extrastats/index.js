import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    name: 'Extra Stats',
    description: 'gives you extra stats for users.',
    authors: [{ name: 'Death', avatar: 'https://i.imgur.com/PrvNWub.png', url: 'https://villainsrule.xyz' }],
    patches: [
        {
            file: '/lib/js/stats.js',
            replacement: [
                {
                    match: /\$\("#messages"\)\.html\(`\$\{user\.misc\.messages\.toLocaleString\(\)\}`\);/,
                    replace: `
                        $("#messages").html(user.misc.messages.toLocaleString());
                        $("#stat_id").html(user.id);
                        $("#stat_created").html(new Date(user.created * 1000).toLocaleString('en-US', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                        }));
                        $("#stat_lastonline").removeAttr('timestamped');
                        $("#stat_lastonline").text(\`<t:\${user.modified}:R>\`);
                    `
                }
            ]
        }
    ],
    onLoad: () => {
        if (location.pathname.startsWith('/stats')) document.querySelector('.styles__statsContainer___QnrRB-camelCase').insertAdjacentHTML('afterend', `
            <div class="styles__statsContainer___QnrRB-camelCase">
                <div class="styles__containerHeader___3xghM-camelCase">
                    <div class="styles__containerHeaderInside___2omQm-camelCase">Account</div>
                </div>
                <div class="styles__topStats___3qffP-camelCase">
                    <div class="styles__statContainer___QKuOF-camelCase" currentitem="false">
                        <div class="styles__statTitle___z4wSV-camelCase">ID</div>
                        <div id="stat_id" class="styles__statNum___5RYSd-camelCase">0</div>
                        <img loading="lazy" src="https://cdn-icons-png.flaticon.com/512/3596/3596097.png" class="styles__statImg___3DBXt-camelCase" draggable="false">
                    </div>
                    <div class="styles__statContainer___QKuOF-camelCase" currentitem="false">
                        <div class="styles__statTitle___z4wSV-camelCase">Created</div>
                        <div id="stat_created" class="styles__statNum___5RYSd-camelCase">0/0/0</div>
                        <img loading="lazy" src="https://cdn-icons-png.flaticon.com/512/4305/4305432.png" class="styles__statImg___3DBXt-camelCase" draggable="false">
                    </div>
                    <div class="styles__statContainer___QKuOF-camelCase" currentitem="false">
                        <div class="styles__statTitle___z4wSV-camelCase">Last Online</div>
                        <div id="stat_lastonline" class="styles__statNum___5RYSd-camelCase" style="font-size: 0.9vw;text-align:center;">0/0/0</div>
                        <img loading="lazy" src="https://cdn.discordapp.com/emojis/1102897525192663050.png?size=2048&quality=lossless" class="styles__statImg___3DBXt-camelCase" draggable="false">
                    </div>
                </div>
            </div>
        `);
    }
});