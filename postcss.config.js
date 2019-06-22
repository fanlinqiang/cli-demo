module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                "> 0.01%",
                "last 2 versions",
                "not ie <= 8"
            ]
        })
    ]
};
