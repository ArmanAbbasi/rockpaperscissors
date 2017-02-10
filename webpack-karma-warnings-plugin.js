const RawSource = require('webpack-core/lib/RawSource');

function WebpackKarmaWarningsPlugin() {}

WebpackKarmaWarningsPlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', (compilation) => {
        compilation.plugin('failed-module', (module) => {
            const moduleErrorMessage = module.error.error.toString();
            const source = `throw new Error('${moduleErrorMessage}');`;
            module._source = new RawSource(source);
            module.error = null;
        });
    });
};

module.exports = WebpackKarmaWarningsPlugin;
