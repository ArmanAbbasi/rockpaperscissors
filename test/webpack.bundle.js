const load = (modules) => modules.keys().forEach((path) => {
    modules(path);
});

load(require.context('./', true, /\.spec\.js$/));