import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    name: 'Internals',
    description: 'the internals of BetterBlacket.',
    authors: [{ name: 'Internal' }],
    required: true,
    patches: [
        {
            file: '/lib/js/home.js',
            replacement: [
                {
                    match: /blacket\.stopLoading\(\);/,
                    replace: 'blacket.stopLoading();bb.events.dispatch(\'pageInit\');'
                },
                {
                    match: /if \(blacket\.config\)/,
                    replace: 'if (window?.blacket?.config)'
                }
            ]
        },
        {
            file: '/lib/js/auth.js',
            replacement: [
                {
                    match: /blacket\.htmlEncode\s*=\s*\(\s*s\s*\)\s*=>\s*{/,
                    replace: 'bb.events.dispatch(\'pageInit\');blacket.htmlEncode = (s) => {'
                },
                {
                    match: /blacket\.config/,
                    replace: 'window?.blacket?.config'
                }
            ]
        },
        {
            file: '/lib/js/terms.js',
            replacement: [
                {
                    match: /blacket\.stopLoading\(\);/,
                    replace: 'blacket.stopLoading();bb.events.dispatch(\'pageInit\');'
                },
                {
                    match: /blacket\.config/,
                    replace: 'window?.blacket?.config'
                }
            ]
        },
        {
            file: '/lib/js/stats.js',
            replacement: [
                {
                    match: /blacket\.setUser\(blacket\.user\)\;/,
                    replace: 'blacket.setUser(blacket.user);bb.events.dispatch(\'pageInit\');'
                },
                {
                    match: /blacket\.user\s*&&\s*blacket\.friends/,
                    replace: 'window?.blacket?.user && window?.blacket?.friends'
                }
            ]
        },
        {
            file: '/lib/js/leaderboard.js',
            replacement: [
                {
                    match: /blacket\.stopLoading\(\);/,
                    replace: 'blacket.stopLoading();bb.events.dispatch(\'pageInit\');'
                },
                {
                    match: /if \(blacket\.user\) \{/,
                    replace: 'if (window?.blacket?.user) {'
                }
            ]
        },
        {
            file: '/lib/js/clans/my-clan.js',
            replacement: [
                {
                    match: /\$\("#clanInvestmentsButton"\)\.click\(\(\) \=\> \{/,
                    replace: 'bb.events.dispatch(\'pageInit\');$("#clanInvestmentsButton").click(() => {'
                },
                {
                    match: /if \(blacket\.user\) \{/,
                    replace: 'if (window?.blacket?.user) {'
                },
                {
                    match: /item.user\).avatar/,
                    replace: `item.user\)?.avatar || '/content/blooks/Error.png'`
                }
            ]
        },
        {
            file: '/lib/js/clans/discover.js',
            replacement: [
                {
                    match: /blacket\.stopLoading\(\)\;/,
                    replace: 'blacket.stopLoading();bb.events.dispatch(\'pageInit\');'
                },
                {
                    match: /if \(blacket\.user\) \{/,
                    replace: 'if (window?.blacket?.user) {'
                }
            ]
        },
        {
            file: '/lib/js/market.js',
            replacement: [
                {
                    match: /blacket\.showBuyItemModal =/,
                    replace: 'bb.events.dispatch(\'pageInit\');blacket.showBuyItemModal ='
                },
                {
                    match: /if \(blacket\.user\) \{/,
                    replace: 'if (window?.blacket?.user) {'
                }
            ]
        },
        {
            file: '/lib/js/blooks.js',
            replacement: [
                {
                    match: /blacket\.appendBlooks\(\)\;/,
                    replace: 'blacket.appendBlooks();bb.events.dispatch(\'pageInit\');'
                },
                {
                    match: /if \(blacket\.user\) \{/,
                    replace: 'if (window?.blacket?.user) {'
                }
            ]
        },
        {
            file: '/lib/js/bazaar.js',
            replacement: [
                {
                    match: /\}\);\s*blacket\.getBazaar\(\);/,
                    replace: '});blacket.getBazaar();bb.events.dispatch(\'pageInit\');'
                },
                {
                    match: /if \(blacket\.user\) \{/,
                    replace: 'if (window?.blacket?.user) {'
                }
            ]
        },
        {
            file: '/lib/js/inventory.js',
            replacement: [
                {
                    match: /blacket\.stopLoading\(\);\s*\}\s*else\s*setTimeout\(reset,\s*1\);/,
                    replace: 'blacket.stopLoading();bb.events.dispatch(\'pageInit\');} else setTimeout(reset, 1);'
                },
                {
                    match: /if \(blacket\.user\) \{/,
                    replace: 'if (window?.blacket?.user) {'
                }
            ]
        },
        {
            file: '/lib/js/settings.js',
            replacement: [
                {
                    match: /\$\(\"#tradeRequestsButton\"\).click\(\(\) \=\> \{/,
                    replace: 'bb.events.dispatch(\'pageInit\');$("#tradeRequestsButton").click(() => {'
                },
                {
                    match: /if \(blacket\.user\) \{/,
                    replace: 'if (window?.blacket?.user) {'
                }
            ]
        },
        {
            file: '/lib/js/store.js',
            replacement: [
                {
                    match: /\$\("#buy1hBoosterButton"\)\.click\(\(\) => \{/,
                    replace: 'bb.events.dispatch(\'pageInit\');$("#buy1hBoosterButton").click(() => {'
                },
                {
                    match: /if \(blacket\.user\) \{/,
                    replace: 'if (window?.blacket?.user) {'
                }
            ]
        },
        {
            file: '/lib/js/credits.js',
            replacement: [
                {
                    match: /blacket\.stopLoading\(\)\;/,
                    replace: 'blacket.stopLoading();bb.events.dispatch(\'pageInit\');'
                },
                {
                    match: /blacket\.config/,
                    replace: 'window?.blacket?.config'
                }
            ]
        },
        {
            file: '/lib/js/trade.js',
            replacement: [
                {
                    match: /blacket\.appendBlooks\(\)\;/,
                    replace: 'blacket.appendBlooks();bb.events.dispatch(\'pageInit\');'
                },
                {
                    match: /blacket\.user\s*&&\s*blacket\.trade/,
                    replace: 'window?.blacket?.user && window?.blacket?.trade'
                }
            ]
        },
        {
            file: '/lib/js/all.js',
            replacement: [
                {
                    match: /blacket\s*=\s*{/,
                    replace: 'window.blacket = {'
                },
                {
                    match: /mutation\.type === "childList" \? replace/,
                    replace: 'false ? '
                }
            ]
        },
        {
            file: '/lib/js/game.js',
            replacement: [
                {
                    match: /blacket\.config\s*&&\s*blacket\.socket/,
                    replace: 'window?.blacket?.config && window?.blacket?.socket'
                },
                {
                    match: /data\.author\.badges = \[/,
                    replace: `if (typeof data.author.badges !== 'object' && !data?.author?.badges?.length) data.author.badges = [`
                },
                {
                    match: /data\.friends/,
                    replace: `data.friends.filter(f => f.username !== '£')`
                }
            ]
        }
    ],
    styles: `
        .bb_topLeftRow {
            position: absolute;
            top: 0;
            left: 11.5vw;
            display: flex;
            flex-direction: row;
            z-index: 14;
            margin: 0.5vw;
            gap: 0.5vw;
        }

        .bb_backButtonContainer {
            position: relative;
            cursor: pointer;
            outline: none;
            user-select: none;
            text-decoration: none;
            transition: filter 0.25s;
            margin-left: 0.521vw;
            margin: auto;
        }

        .bb_settingsContainer {
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
            margin: 0.260vw calc(5% - 0.625vw);
            width: calc(90% - 1.250vw);
            max-width: 62.500vw;
        }

        .bb_pluginContainer {
            border-radius: 0.365vw;
            background-color: #2f2f2f;
            padding: 0.781vw 1.042vw 1.146vw;
            box-shadow: inset 0 -0.365vw rgba(0, 0, 0, 0.2), 0 0 0.208vw rgba(0, 0, 0, 0.15);
            margin: 0.625vw;
            min-width: 23.958vw;
            display: flex;
            flex-direction: column;
            color: #ffffff;
            width: 27.5vw;
        }

        .bb_pluginHeader {
            display: flex;
            align-items: center;
            gap: 1vw;
        }

        .bb_pluginTitle {
            width: 100%;
        }

        .bb_pluginDescription {
            margin-top: 0.7vh;
            font-size: 2.3vh;
        }

        .switch {
            position: relative;
            display: inline-block;
            min-width: 30px;
            max-width: 30px;
            height: 17px;
        }

        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 34px;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 13px;
            min-width: 13px;
            max-width: 13px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
            border-radius: 50%;
        }

        input:checked + .slider {
            background-color: #2196F3;
        }

        input:focus + .slider {
            box-shadow: 0 0 1px #2196F3;
        }

        input:checked + .slider:before {
            transform: translateX(13px);
        }
        
        .bb_requiredPluginSlider {
            background-color: #075c9f;
            cursor: not-allowed;
        }

        .bb_pluginIcon {
            cursor: pointer;
        }

        .bb_pluginAuthors {
            display: flex;
            justify-content: center;
            cursor: pointer;
            margin-top: 1vw;
            margin-right: 6px;
            font-weight: bold;
        }

        .bb_pluginAuthor {
            height: 22px;
            border-radius: 50%;
            margin-right: -6px;
            border: 2px solid #3f3f3f;
        }

        .bb_themeInfo {
            font-family: Nunito, sans-serif;
            line-height: 1.823vw;
            margin: 1.5vh 0 5px 0;
            color: #ffffff;
            font-size: 1.6vw;
        }

        .bb_themeHeader {
            font-family: Nunito, sans-serif;
            line-height: 1.823vw;
            margin: 3.5vw 0 5px 0;
            color: #ffffff;
            font-size: 2.75vw;
        }

        .bb_themeTextarea {
            min-height: 30vh;
            height: auto;
            width: 100%;
            background: #2f2f2f;
            border: 2px solid #1f1f1f;
            border-radius: 3px;
            color: white;
            padding: 10px;
            margin-top: 2.5vh;
            outline: none;
            resize: none;
        }

        .styles__container___1BPm9-camelCase {
            width: 25vw;
        }

        .bb_bigModal {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50%;
            background-color: #3f3f3f;
            border-radius: 0.365vw;
            text-align: center;
            box-sizing: border-box;
            padding-bottom: 0.365vw;
            box-shadow: inset 0 -0.365vw rgba(0, 0, 0, 0.2), 0 0 0.208vw rgba(0, 0, 0, 0.15);
        }

        .bb_bigModalTitle {
            font-family: Nunito, sans-serif;
            font-size: 2.8vw;
            line-height: 1.823vw;
            font-weight: 700;
            margin: 2vw 1.563vw;
            color: #ffffff;
        }

        .bb_bigModalDescription {
            font-family: Nunito, sans-serif;
            line-height: 1.823vw;
            font-weight: 700;
            margin: -3px 0 5px 0;
            color: #ffffff;
            font-size: 1.6vw;
        }

        .bb_bigModalDivider {
            height: 1.5px;
            border-top: 1px solid var(--ss-white);
            border-radius: 10px;
            width: 90%;
            margin: 2vh 5%;
        }

        .bb_bigModalHeader {
            font-family: Nunito, sans-serif;
            font-size: 2vw;
            line-height: 1.823vw;
            font-weight: 700;
            margin: 1.8vw 1.3vw;
            color: #ffffff;
        }

        .bb_modalDescription {
            font-family: Nunito, sans-serif;
            line-height: 1.823vw;
            font-weight: 700;
            margin: -7px 0 5px 0;
            color: #ffffff;
            font-size: 1vw;
            padding: 0 1vw;
        }

        .bb_modalOuterInput {
            border: 0.156vw solid rgba(0, 0, 0, 0.17);
            border-radius: 0.313vw;
            width: 90%;
            height: 2.604vw;
            margin: 0.000vw;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    
        .bb_modalInput {
            border: none;
            height: 2.083vw;
            line-height: 2.083vw;
            font-size: 1.458vw;
            text-align: center;
            font-weight: 700;
            font-family: Nunito, sans-serif;
            color: #ffffff;
            background-color: #3f3f3f;
            outline: none;
            width: 100%;
        }

        .bb_pluginSettings {
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 1vh;
        }

        .bb_pluginSetting {
            display: flex;
            align-items: center;
            gap: 1.5vw;
        }

        .bb_settingName {
            color: white;
            font-size: 1.8vw;
        }
    `,
    onStart: () => {
        if (!location.pathname.startsWith('/settings')) return;

        console.log('Internals started! Patching settings...');

        document.querySelector('.styles__mainContainer___4TLvi-camelCase').id = 'settings-main';

        $(`
            <div class="styles__infoContainer___2uI-S-camelCase">
                <div class="styles__headerRow___1tdPa-camelCase">
                    <i class="fas fa-code styles__headerIcon___1ykdN-camelCase" aria-hidden="true"></i>
                    <div class="styles__infoHeader___1lsZY-camelCase">BetterBlacket</div>
                </div>
                <div><a id="pluginsButton" class="styles__link___5UR6_-camelCase">Manage Plugins</a></div>
                <div><a id="themesButton" class="styles__link___5UR6_-camelCase">Manage Themes</a></div>
                <div><a id="resetDataButton" class="styles__link___5UR6_-camelCase">Reset Data</a></div>
            </div>
        `).insertBefore($('.styles__infoContainer___2uI-S-camelCase')[0]);

        document.querySelector('#app > div > div').insertAdjacentHTML('beforeend', `
            <div class="bb_topLeftRow">
                <div class="bb_backButtonContainer" style="display: none;">
                    <div class="styles__shadow___3GMdH-camelCase"></div>
                    <div class="styles__edge___3eWfq-camelCase" style="background-color: #2f2f2f;"></div>
                    <div class="styles__front___vcvuy-camelCase styles__buttonInsideNoMinWidth___39vdp-camelCase" style="background-color: #2f2f2f;">
                        <i class="fas fa-reply" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        `);

        $('#resetDataButton').click(async () => {
            Object.keys(localStorage).forEach(key => localStorage.removeItem(key));
            location.reload();
        });

        $('#pluginsButton').click(() => {
            document.querySelector('#settings-main').style.display = 'none';
            document.querySelector('#plugins-main').style.display = '';
            document.querySelector('.styles__header___WE435-camelCase').innerHTML = 'Settings | Plugins';
            document.querySelector('.styles__header___WE435-camelCase').style.textAlign = 'center';
            document.querySelector('.bb_backButtonContainer').style.display = '';
        });

        $('#themesButton').click(() => {
            document.querySelector('#settings-main').style.display = 'none';
            document.querySelector('#themes-main').style.display = '';
            document.querySelector('.styles__header___WE435-camelCase').innerHTML = 'Settings | Themes';
            document.querySelector('.styles__header___WE435-camelCase').style.textAlign = 'center';
            document.querySelector('.bb_backButtonContainer').style.display = '';
        });

        $('.bb_backButtonContainer').click(() => {
            document.querySelector('#settings-main').style.display = '';
            document.querySelector('#plugins-main').style.display = 'none';
            document.querySelector('#themes-main').style.display = 'none';
            document.querySelector('.styles__header___WE435-camelCase').innerHTML = 'Settings';
            document.querySelector('.styles__header___WE435-camelCase').style.textAlign = '';
            document.querySelector('.bb_backButtonContainer').style.display = 'none';
        });

        let activePlugins = bb.storage.get('bb_pluginData', true).active;
        let themeData = bb.storage.get('bb_themeData', true);

        $('.arts__profileBody___eNPbH-camelCase').append(`
            <div class="bb_settingsContainer" id="plugins-main" style="display: none;">
                ${bb.plugins.list.filter(p => !p.required && !p.disabled).map(p => `
                    <div class="bb_pluginContainer">
                        <div class="bb_pluginHeader">
                            <div class="bb_pluginTitle">${p.name}</div>
                            ${p.settings.length ? `<i id="bb_pluginIcon_${p.name.replaceAll(' ', '-')}" class="fas fa-gear bb_pluginIcon" aria-hidden="true"></i>` : `<i id="bb_pluginIcon_${p.name.replaceAll(' ', '-')}" class="far fa-circle-info bb_pluginIcon" aria-hidden="true"></i>`}
                            <label class="switch">
                                <input type="checkbox" ${activePlugins.includes(p.name) || p.required ? 'checked' : ''} id="bb_pluginCheckbox_${p.name.replaceAll(' ', '-')}">
                                <span class="${p.required ? 'slider bb_requiredPluginSlider' : 'slider'}"></span>
                            </label>
                        </div>
                        <div class="bb_pluginDescription">${p.description}</div>
                    </div>
                `).join('')}
            </div>

            <div class="bb_settingsContainer" id="themes-main" style="display: none;">
                <div class="bb_themeInfo"><b>Paste CSS file links here.</b><br>    - Paste one link per line.<br>    - Use raw CSS files, like from "raw.githubusercontent.com" or "github.io".<br>    - Put "//" in front of a theme link to ignore it.</div>
                <textarea class="bb_themeTextarea">${themeData?.textarea ? themeData.textarea : 'https://blacket.org/lib/css/all.css\nhttps://blacket.org/lib/css/game.css'}</textarea>
                <div class="bb_themeHeader">Theme Checker</div>
                <div class="bb_themeValidation">
                    ${bb.themes.list.map(t => `<div class="bb_themeInfo" style="color: green;">${t.name} | ${t.url}</div>`).join('')}
                    ${bb.themes.broken.map(t => `<div class="bb_themeInfo" style="color: red;">${t.url} - ${t.reason}</div>`).join('')}
                </div>
            </div>
        `);

        document.querySelector('.bb_themeTextarea').oninput = (ev) => {
            bb.storage.set('bb_themeData', {
                active: ev.target.value.split('\\n').filter(a => !a.startsWith('//')),
                textarea: ev.target.value
            }, true);

            bb.themes.reload();
        };

        bb.events.subscribe('themeUpdate', () => {
            document.querySelector('.bb_themeValidation').innerHTML = `
                ${bb.themes.list.map(t => `<div class="bb_themeInfo" style="color: green;">${t.name} | ${t.url}</div>`).join('')}
                ${bb.themes.broken.map(t => `<div class="bb_themeInfo" style="color: red;">${t.url} - ${t.reason}</div>`).join('')}
            `;
        });

        let storedPluginData = bb.storage.get('bb_pluginData', true);

        bb.plugins.list.forEach(p => {
            if (p.required || p.disabled) return;

            document.querySelector(`#bb_pluginCheckbox_${p.name.replaceAll(' ', '-')}`).onchange = (ev) => {
                if (p.required) return ev.target.checked = true;

                const inform = () => blacket.createToast({
                    title: 'Pending Changes',
                    message: 'You have changes in your plugins you have not applied. Reload to apply.',
                    time: 5000
                });
                inform();
                setInterval(() => inform(), 10000);
                bb.plugins.pendingChanges = true;

                if (storedPluginData.active.includes(p.name)) storedPluginData.active.splice(storedPluginData.active.indexOf(p.name), 1);
                else storedPluginData.active.push(p.name);

                bb.storage.set('bb_pluginData', storedPluginData, true);
            };

            document.querySelector(`#bb_pluginIcon_${p.name.replaceAll(' ', '-')}`).onclick = () => {
                document.body.insertAdjacentHTML('beforeend', `
                    <div class="arts__modal___VpEAD-camelCase" id="bigModal">
                        <div class="bb_bigModal">
                            <div class="bb_bigModalTitle">${p.name}</div>
                            <div class="bb_bigModalDescription">${p.description}</div>
                            <div class="bb_pluginAuthors">${p.authors.map((a) => `<img src="${a.avatar}" onclick="window.open('${a.url}', '_blank')" class="bb_pluginAuthor" />`).join('')}</div>
                            <hr class="bb_bigModalDivider" />
                            <div class="bb_bigModalHeader">Settings</div>
                            ${p.settings.length ? `<div class="bb_pluginSettings">
                                ${p.settings.map((set) => `
                                    <div class="bb_pluginSetting">
                                        <div class="bb_settingName">${set.name}</div>
                                        <label class="switch">
                                            <input type="checkbox" ${typeof storedPluginData.settings?.[p.name]?.[set.name] === 'boolean' ? storedPluginData.settings?.[p.name]?.[set.name] ? 'checked' : '' : set.default ? 'checked' : ''} id="bb_settingCheck_${p.name.replaceAll(' ', '-')}_${set.name.replaceAll(' ', '-')}">
                                            <span class="slider"></span>
                                        </label>
                                    </div>
                                `).join('')}
                            </div>` : `<div class="bb_modalDescription">This plugin has no settings.</div>`}
                            <hr class="bb_bigModalDivider" />
                            <div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0" onclick="document.getElementById('bigModal').remove()" style="width: 30%;margin-bottom: 1.5vh;">
                                <div class="styles__shadow___3GMdH-camelCase"></div>
                                <div class="styles__edge___3eWfq-camelCase" style="background-color: #2f2f2f;"></div>
                                <div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: #2f2f2f;">Close</div>
                            </div>
                        </div>
                    </div>
                `);

                p.settings.forEach((setting) => {
                    document.querySelector(`#bb_settingCheck_${p.name.replaceAll(' ', '-')}_${setting.name.replaceAll(' ', '-')}`).onchange = (ev) => {
                        if (!storedPluginData.settings) storedPluginData.settings = {};
                        if (!storedPluginData.settings[p.name]) storedPluginData.settings[p.name] = {};
                        storedPluginData.settings[p.name][setting.name] = ev.target.checked;

                        bb.plugins.settings[p.name][setting.name] = ev.target.checked;

                        bb.storage.set('bb_pluginData', storedPluginData, true);
                    };
                });
            };
        });
    }
});