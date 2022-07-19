import path from 'path';

export default {
    entry: './index.jsx',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['@babel/plugin-syntax-top-level-await'],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    mode: 'development',
    experiments: {
        topLevelAwait: true,
    },
};
