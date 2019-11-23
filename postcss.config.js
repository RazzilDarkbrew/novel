// module.exports = {
//     plugins: {
//         autoprefixer: {},
//         'postcss-pxtorem': {
//             rootValue: 100,
//             propWhiteList: [],
//             minPixelValue: 2
//         }
//     }
// };

module.exports = ({ file }) => {
    let remUnit;
    if (file && file.dirname && file.dirname.indexOf('mand-mobile') > -1) {
        remUnit = 100;
    } else if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
        remUnit = 50;
    } else {
        remUnit = 100;
    }
    return {
        plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
            require('postcss-pxtorem')({
                rootValue: remUnit,
                propWhiteList: [],
                minPixelValue: 2
            })
        ]
    };
};
