import patcher from './patcher.js';
import events from 'utils/events.js';
import storage from 'utils/storage.js';

export default async () => {
    console.log('Called loadPlugins()');

    let pluginData = storage.get('bb_pluginData', true);
    let contentLoaded = false;

    await Promise.all(Object.values(import.meta.glob('../@(plugins|userplugins)/*/index.js', { eager: true })).map(async (pluginFile) => {
        let plugin = pluginFile.default();
        bb.plugins.list.push(plugin);
        if (!!plugin.styles) bb.plugins.styles[plugin.name] = plugin.styles;
    }));

    bb.plugins.active = [...pluginData.active, ...bb.plugins.list.filter(p => p.required).map(p => p.name)];
    bb.plugins.settings = pluginData.settings;

    console.log(`Detected readyState ${document.readyState}. Running onLoad listeners...`);

    document.addEventListener('DOMContentLoaded', () => {
        if (contentLoaded) return;
        contentLoaded = true;

        bb.plugins.list.forEach((plugin) => {
            if (pluginData.active.includes(plugin.name) || plugin.required) plugin.onLoad?.();
        });
    });

    if (document.readyState !== 'loading' && !contentLoaded) {
        contentLoaded = true;

        bb.plugins.list.forEach((plugin) => {
            if (pluginData.active.includes(plugin.name) || plugin.required) plugin.onLoad?.();
        });
    };

    events.listen('pageInit', () => {
        console.log(`Plugins got pageInit. Starting plugins...`);
        bb.plugins.list.forEach((plugin) => {
            if (pluginData.active.includes(plugin.name) || plugin.required) plugin.onStart?.();
        });
    });

    bb.plugins.list.forEach((plugin) => {
        if (pluginData.active.includes(plugin.name) || plugin.required) plugin.patches.forEach((patch) => bb.patches.push({
            ...patch,
            plugin: plugin.name
        }));

        if (!bb.plugins.settings[plugin.name]) bb.plugins.settings[plugin.name] = {};

        plugin.settings.forEach((setting) => {
            if (!bb.plugins.settings[plugin.name][setting.name]) bb.plugins.settings[plugin.name][setting.name] = setting.default;
        });
    });

    console.log('Done with loadPlugins(), running Patcher.patch()...');
    patcher.patch();
}