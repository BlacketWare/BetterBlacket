import createPlugin from '#utils/createPlugin';

export default () => createPlugin({
    name: 'Better Notifications',
    description: 'a new and improved notification system.',
    authors: [{ name: 'Death', avatar: 'https://i.imgur.com/PrvNWub.png', url: 'https://villainsrule.xyz' }],
    patches: [
        {
            file: '/lib/js/all.js',
            replacement: [
                {
                    match: /\.styles__toastContainer___o4pCa-camelCase/,
                    replace: `.toastMessage`
                },
                {
                    match: /\$\("body"\)\.append\(`<div class="s.*?<\/div><\/div>`\)/,
                    replace: 'bb.plugins.notifications(toast.title, toast.message, toast.audio);return;'
                }
            ]
        },
        {
            file: '/lib/js/game.js',
            replacement: [
                {
                    match: /Notification\.permission == "granted"/,
                    replace: 'false',
                    setting: 'Disable Desktop'
                },
                {
                    match: /Notification\.permission !== "granted" && Notification\.permission !== "denied"/,
                    replace: 'false',
                    setting: 'Disable Desktop'
                },
                {
                    match: /3500/,
                    replace: '1000',
                },
                {
                    match: /flyOut 0\.35s ease-in-out/,
                    replace: `styles__oldGrowOut___3FTko-camelCase 0.5s linear`
                },
                {
                    match: /flyIn 0.35s ease-in-out/,
                    replace: `styles__oldGrowIn___3FTko-camelCase 0.5s linear`
                }
            ]
        }
    ],
    styles: `
        .toastMessage {
            animation: styles__oldGrowIn___3FTko-camelCase 0.5s linear forwards;
            background-color: #1f1f1f;
            border-radius: 5px;
            left: 0;
            right: 0;
            text-align: center;
            top: 20px;
            display: flex;
            flex-direction: column;
            padding: 5px 20px 10px 20px;
            position: absolute;
            margin: 0 auto;
            height: fit-content;
            cursor: pointer;
        }
    `,
    onLoad: () => {
        bb.plugins.notifications = (title, message, audio = true) => {
            let id = Math.random().toString(36).substring(2, 15);

            $('#app').append(`
                <div id='${id}' class='toastMessage'>
                    ${title ? `<text style='color: white; font-size:25px;'>${title}</text>` : ''}
                    ${message ? `<text style='color: white; font-size:20px;'>${message}</text>` : ''}
                </div>
            `);

            if (audio) new Audio('/content/notification.ogg').play();

            let timeout = setTimeout(() => {
                document.getElementById(id).onclick = null;
                $(`#${id}`).attr('style', 'animation: styles__oldGrowOut___3FTko-camelCase 0.5s linear forwards;');

                setTimeout(() => {
                    $(`#${id}`).remove();
                    blacket.toasts.shift();
                    if (blacket.toasts.length > 0) blacket.createToast(blacket.toasts[0], true);
                }, 1000);
            }, 5000);

            document.getElementById(id).onclick = () => {
                clearTimeout(timeout);

                $(`#${id}`).remove();
                blacket.toasts.shift();
                if (blacket.toasts.length > 0) blacket.createToast(blacket.toasts[0], true);
            };
        };
    },
    settings: [{
        name: 'Disable Desktop',
        default: false
    }]
});