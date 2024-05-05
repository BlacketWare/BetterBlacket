import axios from 'axios';

class Patcher {
    blacklistedKeywords = ['cdn-cgi', 'jquery', 'jscolor'];
    patched = [];
    observer;

    constructor() { };

    start() {
        console.log('Called Patcher.start()...');

        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(async (node) => {
                        if (
                            node.tagName === 'SCRIPT' &&
                            !this.blacklistedKeywords.some(k => node.src.includes(k)) &&
                            node.src.includes(location.host) &&
                            !this.patched.includes(node.src)
                        ) {
                            console.log('MutationObserver Blocked script', node.src);
                            this.patched.push(node.src);
                            node.removeAttribute('src');
                        };
                    });
                };
            });
        });

        this.observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

        [...document.querySelectorAll('script')].forEach((script) => {
            if (
                !this.blacklistedKeywords.some(k => script.src.includes(k)) &&
                script.src.includes(location.host) &&
                !this.patched.includes(script.src)
            ) {
                console.log('QuerySelector Blocked script', script.src);
                this.patched.push(script.src);
                script.removeAttribute('src');
            };
        });
    };

    async patch() {
        if (!window.$) {
            console.log('Called patch(), but jQuery was not detected. Waiting 100ms...');
            return setTimeout(() => this.patch(), 100);
        };

        console.log('Detected jQuery! Disconnecting Observer & Patching...');
        this.observer.disconnect();

        this.patched.forEach(async (script) => {
            try {
                if (script.includes('?')) script = script.split('?')[0];
                let { data } = await axios.get(script);

                let filePatches = bb.patches.filter((e) => script.replace(location.origin, '').startsWith(e.file));

                for (const patch of filePatches) for (const replacement of patch.replacement) {
                    if (replacement.setting && bb.plugins.settings[patch.plugin]?.[replacement.setting] === false) {
                        console.log('Setting', replacement.setting, 'is not active, ignoring...');
                        continue;
                    } else if (replacement.setting) console.log('Setting', replacement.setting, 'is active, applying...');

                    const matchRegex = new RegExp(replacement.match, 'gm');
                    if (!matchRegex.test(data)) {
                        console.log(`Patch did nothing! Plugin: ${patch.plugin}; Regex: \`${replacement.match}\`.`);
                        continue;
                    };

                    data = data.replaceAll(matchRegex, replacement.replace.replaceAll('$self', `bb.plugins.list.find(a => a.name === '${patch.plugin}')`));
                };

                const url = URL.createObjectURL(new Blob([
                    `// ${script.replace(location.origin, '')}${filePatches.map(p => p.replacement).flat().length >= 1 ? ` - Patched by ${filePatches.map(p => p.plugin).join(', ')}` : ``}\n`,
                    data
                ]));

                console.log(`Patched ${script.replace(location.origin, '')}!`);

                let newScript = document.createElement('script');
                newScript.src = url;
                newScript.setAttribute('__nopatch', true);
                newScript.setAttribute('__src', newScript);
                document.head.appendChild(newScript);
            } catch (error) {
                console.error(`Error patching ${script}, ignoring file.`, error);
            };
        });

        let activeStyles = Object.entries(bb.plugins.styles).filter((style) => bb.plugins.active.includes(style[0])).map(s => s[1]);
        document.head.insertAdjacentHTML('beforeend', `<style>${activeStyles.join('\n\n')}</style>`);

        console.log('Finished Patcher.start() & plugin style injection!')
    }
};

export default new Patcher();