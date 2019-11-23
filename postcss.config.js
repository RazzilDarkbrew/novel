module.exports = {
    plugins: [
        // require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-pxtorem')({
            rootValue: 37.5,
            propWhiteList: [],
            minPixelValue: 2
        })
    ]
};
