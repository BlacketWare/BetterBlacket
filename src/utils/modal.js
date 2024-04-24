export default class Modal {
    element;
    autoClose;
    listening;

    constructor({
        title,
        description,
        inputs,
        buttons,
        autoClose = true
    }) {
        if (document.querySelector('#modal')) return console.error('Cannot open more than one modal at once.');

        document.body.insertAdjacentHTML('beforeend', `
            <div class="arts__modal___VpEAD-camelCase" id="modal">
                <form class="styles__container___1BPm9-camelCase">
                    <div class="styles__text___KSL4--camelCase">${title}</div>
                    ${description ? `<div class="bb_modalDescription">${description}</div>` : ''}
                    <div class="styles__holder___3CEfN-camelCase">
                        ${inputs ? `<div style="flex-direction: column;" class="styles__numRow___xh98F-camelCase">
                            ${inputs.map(({ placeholder }, i) => `
                                <div class="bb_modalOuterInput">
                                    <input class="bb_modalInput" placeholder="${placeholder}" type="text" value="" id="${'bb_modalInput-' + i}" />
                                </div>
                            `).join('<br>')}
                        </div>` : ''}
                        ${buttons ? `<div class="styles__buttonContainer___2EaVD-camelCase">
                            ${buttons.map(({ text }, i) => `
                                <div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0">
                                    <div class="styles__shadow___3GMdH-camelCase"></div>
                                    <div class="styles__edge___3eWfq-camelCase" style="background-color: #2f2f2f;"></div>
                                    <div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: #2f2f2f;" id="${'bb_modalButton-' + i}">${text}</div>
                                </div>
                            `).join('')}
                        </div>` : ''}
                    </div>
                </form>
            </div>
        `);

        this.element = document.querySelector('#modal');
        this.autoClose = autoClose;

        [...document.querySelectorAll('[id*="bb_modalButton-"]')].forEach(b => b.addEventListener('click', () => (!this.listening) ? this.close() : null));
    };

    listen = async () => {
        this.listening = true;

        return new Promise(resolve => {
            [...document.querySelectorAll('[id*="bb_modalButton-"]')].forEach(button => {
                button.addEventListener('click', () => {
                    resolve({
                        button: button.id.split('bb_modalButton-')[1],
                        inputs: [...document.querySelectorAll('[id*="bb_modalInput-"]')].map(a => {
                            return {
                                name: a.placeholder,
                                value: a.value
                            }
                        })
                    });

                    if (this.autoClose) this.close();
                });
            });
        });
    };

    close = () => this.element.remove();
};