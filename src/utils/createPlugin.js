export default ({
    name,
    description,
    authors,
    patches,
    settings,
    styles,
    onLoad,
    onStart,
    required,
    disabled
}) => {
    if (!name || !authors?.length || (!onLoad && !onStart && !patches && !styles)) return console.error(`ERROR: Plugin does not have a title, authors, or executable functions.`);
    
    let plugin = {
        name,
        description: description || 'No description.',
        authors,
        patches: patches || [],
        settings: settings || [],
        styles: styles || ``,
        onLoad: onLoad || (() => { }),
        onStart: onStart || (() => { }),
        required: required || false,
        disabled: disabled || false
    };

    return plugin;
};