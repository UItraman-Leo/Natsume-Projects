const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,

    devServer: {
        proxy: {
            "/adminapi": {
                target: "https://api.xia-mu.top:3000",
                changeOrigin: true,
            },
            "/web": {
                target: "https://api.xia-mu.top:3000",
                changeOrigin: true,
            }
        }

    }

})
