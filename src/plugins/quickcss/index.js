import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    name: 'Quick CSS',
    description: 'edit CSS for the game and have it applied instantly.',
    authors: [{ name: 'Death', avatar: 'https://i.imgur.com/PrvNWub.png', url: 'https://villainsrule.xyz' }],
    styles: `
        .bb_customCSSBox {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            min-width: 5vw;
            height: 2.865vw;
            border-bottom-left-radius: 0.521vw;
            border-bottom-right-radius: 0.521vw;
            box-sizing: border-box;
            box-shadow: inset 0 -0.417vw rgba(0, 0, 0, 0.2), 0 0 0.208vw rgba(0, 0, 0, 0.15);
            padding: 0 0.521vw 0.417vw;
            font-size: 1.042vw;
            color: white;
            background: #2f2f2f;
        }

        .bb_customCSSIcon {
            margin: -0.2vw 0 0 0;
            padding: 0;
            font-size: 1.5vw;
        }

        .bb_customCSSCorner {
            position: absolute;
            bottom: 1vw;
            right: 1vw;
            padding: 10px;
        }

        .bb_customCSSCornerIcon {
            font-size: 2.5vw;
        }

        .bb_customCSSTextarea {
            min-height: 30vh;
            height: 40vh;
            width: 80%;
            background: #2f2f2f;
            border: 2px solid #1f1f1f;
            border-radius: 3px;
            color: white;
            padding: 10px;
            margin-top: 2.5vh;
            outline: none;
            resize: none;
        }
    `,
    onStart: () => {
        let storage = bb.storage.get('bb_pluginData', true);

        if ([
            'stats',
            'leaderboard',
            'clans/discover',
            'market',
            'blooks',
            'bazaar',
            'inventory',
            'settings'
        ].some(path => location.pathname.startsWith(`/${path}`))) {
            document.querySelector('#app > div > div > div').insertAdjacentHTML('afterbegin', `
                <div class="bb_customCSSBox">
                    <i class="bb_customCSSIcon fas fa-palette"></i>
                </div>
            `);
        } else if ([
            'trade',
            'store',
            'register',
            'login'
        ].some(path => location.pathname.startsWith(`/${path}`))) {
            document.querySelector('.arts__body___3acI_-camelCase').insertAdjacentHTML('beforeend', `
                <div class='bb_customCSSCorner styles__button___1_E-G-camelCase' role='button' tabindex='0'>
                    <div class='styles__shadow___3GMdH-camelCase'></div>
                    <div class='styles__edge___3eWfq-camelCase' style='background-color: #2f2f2f;'></div>
                    <div class='styles__front___vcvuy-camelCase''>
                        <i class="bb_customCSSCornerIcon fas fa-palette"></i>
                    </div>
                </div>
            `);
        } else if (location.pathname.includes('my-clan')) {
            document.querySelector('#clanLeaveButton').insertAdjacentHTML('afterend', `
                <div class="bb_customCSSBox">
                    <i class="bb_customCSSIcon fas fa-palette"></i>
                </div>
            `);
        } else return;

        document.body.insertAdjacentHTML('beforeend', `<style id="bb_quickCSS">${storage?.quickcss || ''}</style>`);

        (
            document.querySelector('.bb_customCSSBox') ||
            document.querySelector('.bb_customCSSCorner') ||
            document.querySelector('.bb_customCSSSmallBox')
        ).onclick = () => {
            document.body.insertAdjacentHTML('beforeend', `
                <div class="arts__modal___VpEAD-camelCase" id="bigModal">
                    <div class="bb_bigModal">
                        <div class="bb_bigModalTitle">QuickCSS</div>
                        <div class="bb_bigModalDescription">Quickly modify the CSS of Blacket.</div>
                        <hr class="bb_bigModalDivider" />
                        <textarea class="bb_customCSSTextarea">${document.querySelector('#bb_quickCSS')?.innerHTML || ''}</textarea>
                        <hr class="bb_bigModalDivider" />
                        <div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0" onclick="document.getElementById('bigModal').remove()" style="width: 30%;margin-bottom: 1.5vh;">
                            <div class="styles__shadow___3GMdH-camelCase"></div>
                            <div class="styles__edge___3eWfq-camelCase" style="background-color: #2f2f2f;"></div>
                            <div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: #2f2f2f;">Close</div>
                        </div>
                    </div>
                </div>
            `);

            document.querySelector('.bb_customCSSTextarea').oninput = (e) => {
                document.querySelector('#bb_quickCSS').innerHTML = e.target.value;
                let storage = bb.storage.get('bb_pluginData', true);
                storage.quickcss = e.target.value;
                bb.storage.set('bb_pluginData', storage, true);
            };
        };

        (
            document.querySelector('.bb_customCSSBox') ||
            document.querySelector('.bb_customCSSCorner') ||
            document.querySelector('.bb_customCSSSmallBox')
        ).oncontextmenu = (r) => {
            r.preventDefault();
            bb.themes.reload();
        };
    }
});