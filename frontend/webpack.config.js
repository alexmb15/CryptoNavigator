module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|mjs)$/,
                enforce: 'pre',
                use: ['source-map-loader'],
                exclude: /node_modules/,
            },
        ],
    },
};
