import fs from 'fs';

let plugins = [];

await Promise.all([...fs.readdirSync('./src/plugins')].map(async (file) => {
    let plugin = (await import(`../src/plugins/${file}/index.js`)).default();
    if (plugin.required || plugin.disabled) return;

    plugins.push({
        title: plugin.name,
        description: plugin.description,
        authors: plugin.authors,
        settings: plugin.settings,
        path: file
    });
}));

plugins.sort((a, b) => a.title.localeCompare(b.title));

fs.writeFileSync('./dist/pluginData.json', JSON.stringify(plugins));

console.log('Plugin list generated & added to dist!\n');