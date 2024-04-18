import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    name: 'No Devtools Warning',
    description: 'disables the warning in the console.',
    authors: [{ name: 'Death', avatar: 'https://i.imgur.com/PrvNWub.png', url: 'https://villainsrule.xyz' }],
    patches: [
        {
            file: '/lib/js/all.js',
            replacement: [
                {
                    match: /console\.log\(`%cWARNING!`, `font-size: 35px;`\);\s*console\.log\(`%cThis is a browser feature intended for developers\. If someone told you to copy and paste something here to enable a \${blacket\.config\.name} feature or "hack" someone else's account, it is most likely a scam and will give them access to your account\.`, `font-size: 20px;`\);\s*console\.log\(`%cIf you ignore this message and the script does work, PLEASE contact a \${blacket\.config\.name} developer immediately\.`, `font-size: 20px;`\);\s*/s,
                    replace: ''
                }
            ]
        }
    ]
});