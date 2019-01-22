
const env = process.env.BABEL_ENV || 'esm';

module.exports = {
    presets: [
        ['@babel/typescript', {
            allExtensions: true,
        }],
        ['@babel/env', {
            targets: {
                node: '6.9', // LTS (Boron)
            },
            
            // Whether to transpile modules
            modules: env === 'cjs' ? 'commonjs' : false,
            
            exclude: [
                // Do not transpile generators (saves us from needing a polyfill)
                'transform-regenerator',
            ],
        }],
    ],
    plugins: [
        // 'transform-runtime', // Needed to support generators
        
        ['@babel/proposal-decorators', {
            decoratorsBeforeExport: true,
        }],
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
        
        ['transform-builtin-extend', {
            // See: http://stackoverflow.com/questions/33870684/why-doesnt-instanceof-work
            globals: ['Error', 'String', 'Number', 'Array', 'Promise'],
        }],
    ],
};
