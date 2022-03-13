const CracoLessPlugin = require('craco-less')

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            // Font
                            '@font-size-base': '14px',
                            '@font-size-lg':
                                '@font-size-base + 2px',
                            '@font-size-sm': '12px',
                            '@font-weight-base': '500',

                            //Heading
                            '@heading-1-size':
                                'ceil(@font-size-base * 2.71)',
                            '@heading-2-size':
                                'ceil(@font-size-base * 2.14)',
                            '@heading-3-size':
                                'ceil(@font-size-base * 1.71)',
                            '@heading-4-size':
                                'ceil(@font-size-base * 1.42)',
                            '@heading-5-size':
                                'ceil(@font-size-base * 1.14)',

                            // Line-height
                            '@line-height-base': 1.5715,

                            // Border-radius
                            '@border-radius-base': '4px',

                            // Color
                            '@primary-color': '#ffbd27',
                            '@black': '#000',
                            '@white': '#fff',
                            '@dark-blue': '#031424',

                            // Layout
                            '@margin-center': '0 auto',

                            // Width
                            '@width-xs': '480px',
                            '@width-sm': '576px',
                            '@width-md': '768px',
                            '@width-lg': '992px',
                            '@width-xl': '1200px',

                            // Screen
                            '@screen-xs': '480px',
                            '@screen-xs-min': '@screen-xs',
                            // 👆 Extra small screen / phone

                            // 👇 Small screen / tablet
                            '@screen-sm': '576px',
                            '@screen-sm-min': '@screen-sm',

                            // Medium screen / desktop
                            '@screen-md': '768px',
                            '@screen-md-min': '@screen-md',

                            // Large screen / wide desktop
                            '@screen-lg': '992px',
                            '@screen-lg-min': '@screen-lg',

                            // Extra large screen / full hd
                            '@screen-xl': '1200px',
                            '@screen-xl-min': '@screen-xl',

                            // Margin
                            '@margin-lg': '24px', // containers
                            '@margin-md': '16px', // small containers and buttons
                            '@margin-sm': '12px', // Form controls and items
                            '@margin-xs': '8px', // small items
                            '@margin-xss': '4px', // more small
                            '@margin-0': '0',

                            // Padding
                            '@padding-lg': '24px', // containers
                            '@padding-md': '16px', // small containers and buttons
                            '@padding-sm': '12px', // Form controls and items
                            '@padding-xs': '8px', // small items
                            '@padding-xss': '4px', // more small
                            '@padding-0': '0',

                            // height rules
                            '@height-base': '32px',
                            '@height-lg': '40px',
                            '@height-sm': '24px',

                            // Link
                            '@link-color': '#2f80ed',

                            // Border
                            '@border-none': 'none',
                            '@border-width-base': '2px',
                            '@border-style-base': 'solid',
                            '@border-color-base':
                                '@primary-color',
                            '@border-base':
                                '@border-width-base @border-style-base @border-color-base',

                            // Outline
                            '@outline-none': 'none',
                            '@outline-width-base': '2px',
                            '@outline-style-base': 'solid',
                            '@outline-color-base':
                                '@primary-color',
                            '@outline-base':
                                '@outline-width-base @outline-style-base @outline-color-base',

                            //Transition
                            '@transition-basic':
                                'all .3s ease-in-out',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
}
