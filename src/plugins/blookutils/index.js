import axios from 'axios';
import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    name: 'Blook Utilities',
    description: 'enhances the blook manager experience.',
    authors: [{ name: 'Death', avatar: 'https://i.imgur.com/PrvNWub.png', url: 'https://villainsrule.xyz' }],
    patches: [
        {
            file: '/lib/js/blooks.js',
            replacement: [
                {
                    match: /\`\$\{blacket\.user\.blooks\[blook\]\.toLocaleString\(\)\} Owned\`/,
                    replace: `bb.plugins.blookutils ? bb.plugins.blookutils.blooks[blook].toLocaleString() + ' Owned' : \`\${blacket.user.blooks[blook].toLocaleString()} Owned\``
                },
                {
                    match: /let packBlooks/,
                    replace: 'window.packBlooks'
                },
                {
                    match: />List<\/div>/,
                    replace: `>Next</div>`
                },
                {
                    match: /blacket\.listBlook\(\$\(.*?\)\.val\(\)\);/,
                    replace: `
                        let amount = $('.styles__numRow___xh98F-camelCase > div:nth-child(1) > input:nth-child(1)').val();
                        $('.arts__modal___VpEAD-camelCase').remove();
                        document.querySelector('body').insertAdjacentHTML('beforeend', \`<div class='arts__modal___VpEAD-camelCase'>
                            <form class='styles__container___1BPm9-camelCase'>
                                <div class='styles__text___KSL4--camelCase'>List \${blacket.blooks.selected} Blook how many times?</div>
                                <div class='styles__holder___3CEfN-camelCase'>
                                    <div class='styles__numRow___xh98F-camelCase'>
                                        <div style='border: 0.156vw solid rgba(0, 0, 0, 0.17);border-radius: 0.313vw;width: 90%;height: 2.604vw;margin: 0.000vw;display: flex;flex-direction: row;align-items: center;'>
                                            <input style='  border: none;height: 2.083vw;line-height: 2.083vw;font-size: 1.458vw;text-align: center;font-weight: 700;font-family: Nunito, sans-serif;color: #ffffff;background-color: #3f3f3f;outline: none;width: 100%;' placeholder='Price' maxlength='3' value='1'>
                                        </div>
                                    </div>
                                    <div class='styles__buttonContainer___2EaVD-camelCase'>
                                        <div id='yesButton' class='styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase' role='button' tabindex='0'>
                                         <div class='styles__shadow___3GMdH-camelCase'></div>
                                            <div class='styles__edge___3eWfq-camelCase' style='background-color: #2f2f2f;'></div>
                                            <div class='styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase' style='background-color: #2f2f2f;'>List</div>
                                        </div>
                                        <div id='noButton' class='styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase' role='button' tabindex='0'>
                                            <div class='styles__shadow___3GMdH-camelCase'></div>
                                            <div class='styles__edge___3eWfq-camelCase' style='background-color: #2f2f2f;'></div>
                                            <div class='styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase' style='background-color: #2f2f2f;'>Cancel</div>
                                        </div>
                                    </div>
                                </div>
                                <input type='submit' style='opacity: 0; display: none;' />
                            </form>
                        </div>\`);
                        $('.styles__container___1BPm9-camelCase').submit((event) => {
                            event.preventDefault();
                            blacket.listBlook($('.styles__numRow___xh98F-camelCase > div:nth-child(1) > input:nth-child(1)').val());
                        });
                        $('.styles__numRow___xh98F-camelCase > div:nth-child(1) > input:nth-child(1)').focus();
                        $('#yesButton').click(async () => {
                            let times = parseInt($('.styles__numRow___xh98F-camelCase > div:nth-child(1) > input:nth-child(1)').val());
                            blacket.startLoading();
                            for (let i = 0; i < times; i++) {
                                blacket.listBlook(amount);
                                await new Promise(resolve => setTimeout(resolve, 500 * times));
                            };
                            blacket.stopLoading();
                        });
                        $('#noButton').click(() => {
                            $('.arts__modal___VpEAD-camelCase').remove();
                        });
                    `
                }
            ]
        }
    ],
    onStart: () => {
        if (!location.pathname.startsWith('/blooks')) return;

        blacket.listBlook = (price) => {
            if (price == `` || price == 0) return;
            $('.arts__modal___VpEAD-camelCase').remove();
            axios.post('/worker/bazaar/list', {
                item: blacket.blooks.selected,
                price
            }).then((list) => {
                if (list.data.error) {
                    blacket.createToast({
                        title: 'Error',
                        message: list.data.reason,
                        icon: '/content/blooks/Error.png',
                        time: 5000
                    });
                    return blacket.stopLoading();
                };

                blacket.user.blooks[blacket.blooks.selected] -= 1;
                if (blacket.user.blooks[blacket.blooks.selected] < 1) {
                    $(`#${blacket.blooks.selected.replaceAll(' ', '-').replaceAll('\'', '_')} > div:nth-child(2)`).remove();
                    $(`#${blacket.blooks.selected.replaceAll(' ', '-').replaceAll('\'', '_')}`).append(`<i class='fas fa-lock styles__blookLock___3Kgua-camelCase' aria-hidden='true'></i>`);
                    $(`#${blacket.blooks.selected.replaceAll(' ', '-').replaceAll('\'', '_')}`).attr('style', 'cursor: auto;');
                    $(`#${blacket.blooks.selected.replaceAll(' ', '-').replaceAll('\'', '_')} > div:nth-child(1)`).attr('class', 'styles__blookContainer___36LK2-camelCase styles__blook___bNr_t-camelCase styles__lockedBlook___3oGaX-camelCase');
                    delete blacket.user.blooks[blacket.blooks.selected];
                    blacket.blooks.selected = Object.keys(blacket.user.blooks)[Math.floor(Math.random() * Object.keys(blacket.user.blooks).length)];
                } else $(`#${blacket.blooks.selected.replaceAll(' ', '-').replaceAll('\'', '_')} > div:nth-child(2)`).html(blacket.user.blooks[blacket.blooks.selected].toLocaleString());

                blacket.selectBlook(blacket.blooks.selected);
            });
        };

        $(`<style>.styles__left___9beun-camelCase {
            height: calc(100% - 6.125vw);
            top: 4.563vw;
        }

        .bb_dupeManager {
            display: flex;
            justify-content: space-between;
            gap: 3vw;
            position: absolute;
            left: 2.5%;
            width: calc(95% - 22.396vw);
        }

        .bb_dupeManager > .styles__button___1_E-G-camelCase {
            width: 100%;
            margin-left: 0;
            text-align: center;
            top: 1vw;
        }
        
        .bb_userSelector {
            position: absolute;
            top: calc(50% + 15.417vw);
            right: 2.5%;
            width: 20.833vw;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;
        }
        
        .bb_userSelectBtn {
            margin: 0.521vw;
            width: 100%;
        }
        
        .bb_userSelectText {
            width: 80%;
            justify-content: space-between;
        }
        
        #bb_userSelectUsername {
            font-family: 'Titan One';
        }</style>

        <div class='bb_userSelector'>
            <div id='sellButton' class='styles__button___1_E-G-camelCase bb_userSelectBtn' role='button' tabindex='0'>
                <div class='styles__shadow___3GMdH-camelCase'></div>
                <div class='styles__edge___3eWfq-camelCase' style='background-color: #2f2f2f;'></div>
                <div class='styles__front___vcvuy-camelCase' style='background-color: #2f2f2f;'>
                    <div class='styles__rightButtonInside___14imT-camelCase bb_userSelectText'>
                        <span id='bb_userSelectUsername'>User: ${blacket.user.username}</span>
                        <i class='bb_userSelectIcon fas fa-caret-down'></i>
                    </div>
                </div>
            </div>
        </div>`).insertAfter($('.styles__rightButtonRow___3a0GF-camelCase'));

        document.querySelector('.bb_userSelectBtn').onclick = async () => {
            let modal = new bb.Modal({
                title: 'Blook Viewer',
                description: 'Enter a username to search their blooks.',
                inputs: [{ placeholder: 'Username' }],
                buttons: [{ text: 'Search' }, { text: 'Cancel' }]
            });

            let result = await modal.listen();

            if (result.button.toString() === '0') {
                axios.get('/worker2/user/' + result.inputs[0].value).then((u) => {
                    if (u.data.error) return new bb.Modal({
                        title: 'User not found.',
                        buttons: [{
                            text: 'Close'
                        }]
                    });

                    const lock = (blook) => {
                        let element = document.getElementById(blook.replaceAll('\'', '_').replaceAll(' ', '-'));
                        if (!element) return;
                        element.children[0].classList.add('styles__lockedBlook___3oGaX-camelCase');
                        element.children[1].outerHTML = `<i class='fas fa-lock styles__blookLock___3Kgua-camelCase' aria-hidden='true'></i>`;
                    };

                    const unlock = (blook, qty, rarity) => {
                        let element = document.getElementById(blook.replaceAll('\'', '_').replaceAll(' ', '-'));
                        if (!element) return;
                        element.children[0].classList.remove('styles__lockedBlook___3oGaX-camelCase');
                        element.children[1].outerHTML = `<div class='styles__blookText___3AMdK-camelCase' style='background-color: ${blacket.rarities[rarity].color};'>${qty}</div>`;
                    };

                    let blooks = [...document.querySelectorAll('.styles__blookContainer___3JrKb-camelCase')].map(a => a.id);
                    blooks.forEach(b => lock(b));

                    let containers = [...document.querySelectorAll('.styles__setBlooks___3xamH-camelCase')];
                    let miscList = containers[containers.length - 1];

                    miscList.replaceChildren();

                    let user = u.data.user;

                    bb.plugins.blookutils = {
                        viewingSelf: false,
                        blooks: user.blooks
                    };

                    document.querySelector('#bb_userSelectUsername').innerText = `User: ${user.username}`;

                    Object.entries(user.blooks).forEach(blook => {
                        if (packBlooks.includes(blook[0])) return unlock(blook[0], blook[1], blacket.blooks[blook[0]].rarity);
                        if (!blacket.blooks[blook[0]]) return;

                        let quantity;
                        if (blacket.rarities[blacket.blooks[blook[0]].rarity] && blacket.rarities[blacket.blooks[blook[0]].rarity].color == 'rainbow') quantity = `<div class='styles__blookText___3AMdK-camelCase' style='background-image: url('/content/rainbow.gif');'>${blook[1].toLocaleString()}</div></div>`;
                        else quantity = `<div class='styles__blookText___3AMdK-camelCase' style='background-color: ${blacket.rarities[blacket.blooks[blook[0]].rarity].color};'>${blook[1].toLocaleString()}</div></div>`;

                        miscList.insertAdjacentHTML('beforeend', `<div id='${blook[0].replaceAll(' ', '-').replaceAll('\'', '_')}' class='styles__blookContainer___3JrKb-camelCase' style='cursor: pointer' role='button' tabindex='0'><div class='styles__blookContainer___36LK2-camelCase styles__blook___bNr_t-camelCase'><img loading='lazy' src='${blacket.blooks[blook[0]].image}' draggable='false' class='styles__blook___1R6So-camelCase' /></div>${quantity}`);
                        document.getElementById(blook[0].replaceAll(' ', '-').replaceAll('\'', '_')).addEventListener('click', () => blacket.selectBlook(blook[0]));
                    });
                })

                modal.close();
            } else modal.close();
        };

        document.querySelector('.arts__profileBody___eNPbH-camelCase').insertAdjacentHTML('afterbegin', `
            <div class="bb_dupeManager">
                <div id='checkDupes' class='styles__button___1_E-G-camelCase' role='button' tabindex='0'>
                    <div class='styles__shadow___3GMdH-camelCase'></div>
                    <div class='styles__edge___3eWfq-camelCase' style='background-color: #2f2f2f;'></div>
                    <div class='styles__front___vcvuy-camelCase' style='background-color: #2f2f2f;'>
                        <div class='styles__rightButtonInside___14imT-camelCase'>Check Dupes</div>
                    </div>
                </div>
            </div>
        `);

        document.querySelector('#checkDupes').onclick = () => {
            new bb.Modal({
                title: 'Duplicate Blooks',
                description: Object.entries(blacket.user.blooks).filter(blook => blook[1] > 1).map(([blook, qty]) => `<span style="color: ${blacket.rarities[blacket.blooks[blook].rarity].color}">${blook}: ${qty.toLocaleString()}</span>`).join(' | '),
                buttons: [{ text: 'Close' }]
            });
        };
    }
});