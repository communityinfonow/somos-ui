module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,
                "targets": {
                    "browsers": ["> 1%", "last 2 versions"]
                },
                "include": [
                    "@babel/plugin-proposal-object-rest-spread",
                    "@babel/plugin-transform-spread"
                ]
            }
        ]
    ],
    "plugins": [
        "@babel/plugin-syntax-dynamic-import",
    ]
}