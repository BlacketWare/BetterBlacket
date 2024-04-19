import axios from 'axios';

export default () => {
    let blacklistedKeywords = ['cdn-cgi', 'jquery', 'jscolor'];
    let scripts = [...document.querySelectorAll('script')]
        .filter(script => !blacklistedKeywords.some(k => script.src.includes(k)))
        .filter(script => script.src.includes(location.host))
        .map(script => script.src);
    let patched = [];

    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(async (node) => {
                    if (node.tagName === 'SCRIPT' && scripts.includes(node.src) && !node.getAttribute('__nopatch') && !patched.includes(node.src)) {
                        let src = node.src;
                        patched.push(node.src);
                        node.removeAttribute('src');

                        try {
                            let { data } = await axios.get(src);

                            let filePatches = bb.patches.filter((e) => src.replace(location.origin, '').startsWith(e.file));

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


                                replacement.replace = replacement.replace.replace('$self', `bb.plugins.list.find(a => a.name === '${patch.plugin}')`);
                                data = data.replaceAll(matchRegex, replacement.replace);
                            };

                            const url = URL.createObjectURL(new Blob([
                                `// ${src.replace(location.origin, '')}${filePatches.map(p => p.replacement).flat().length >= 1 ? ` - Patched by ${filePatches.map(p => p.plugin).join(', ')}` : ``}\n`,
                                data
                            ]));

                            console.log(`Patched file! File:\n${src}\nPatched data:\n${url}`);

                            let script = document.createElement('script');
                            script.src = url;
                            script.setAttribute('__nopatch', true);
                            script.setAttribute('__src', src);
                            document.head.appendChild(script);
                        } catch (error) {
                            console.error(`Error patching ${node.src || src}, ignoring file.`, error);
                        };
                    };
                });
            }
        });
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    let activeStyles = Object.entries(bb.plugins.styles).filter((style) => bb.plugins.active.includes(style[0])).map(s => s[1]);
    document.head.insertAdjacentHTML('beforeend', `<style>${activeStyles.join('\n\n')}</style>`);

    /*
        Please do not remove this.
    
        Multiple mods often cause issues, often relating to hidden background scripts conflicting.
        In the case of Blacket++ and some other mods, we both directly modify the code of the game.
        This can cause conflicts and breakage, and neither mod will work.
    */

    setTimeout(() => {
        let mods = {
            'BetterBlacket v2': () => !!(window.pr || window.addCSS),
            'Flybird': () => !!window.gold,
            'Themeify': () => !!document.querySelector('#themifyButton'),
            'Blacket++': () => !!(window.BPP || window.bpp)
        };

        Object.entries(mods).forEach(mod => (mod[1]()) ? document.body.insertAdjacentHTML('beforeend', `
            <div class="arts__modal___VpEAD-camelCase" id="bigModal">
                <div class="bb_bigModal">
                    <div class="bb_bigModalTitle">External Mod Detected</div>
                    <div class="bb_bigModalDescription" style="padding-bottom: 1vw;">Our automated systems believe you are running the ${mod[0]} mod. We require that only BetterBlacket v3 is running. This prevents unneeded "IP abuse bans" from Blacket's systems.</div>
                </div>
            </div>
        `) : null);
    }, 5000);
};