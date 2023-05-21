const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,

    devServer: {
        proxy: {
            "/adminapi": {
                target: "http://43.136.115.67:27017",
                changeOrigin: true
            }
        }
    }

})
