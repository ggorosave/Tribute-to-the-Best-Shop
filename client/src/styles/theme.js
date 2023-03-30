import { extendTheme } from "@chakra-ui/react";

// Base color palette: https://designs.ai/colors/palette/858

const theme = extendTheme({
    colors: {
        // https://smart-swatch.netlify.app/#2a363b
        primary: 
        {
          50: '#eaf4f8',
          100: '#d2dbdf',
          200: '#b8c3c8',
          300: '#9cabb2',
          400: '#7f939c',
          500: '#657a82',
          600: '#4f5e65',
          700: '#384448',
          800: '#20292d',
          900: '#040f13',
        },
        // https://smart-swatch.netlify.app/#e84a5f
        secondary: 
        {
          50: '#ffe4ea',
          100: '#fbb9c2',
          200: '#f38d9a',
          300: '#ec6073',
          400: '#e5334b',
          500: '#cc1a32',
          600: '#9f1227',
          700: '#720a1b',
          800: '#47040e',
          900: '#1f0004',
        },
        // https://smart-swatch.netlify.app/#ff847b
        tertiary: 
        {
          50: '#ffe4e1',
          100: '#ffb7b2',
          200: '#ff8880',
          300: '#fe5a4e',
          400: '#fe2d1c',
          500: '#e51603',
          600: '#b20f01',
          700: '#800900',
          800: '#4e0300',
          900: '#1f0000',
        },
        // https://smart-swatch.netlify.app/#fecea8
        quaternary: 
        {
          50: '#fff0e1',
          100: '#fed4b3',
          200: '#fcb983',
          300: '#fb9d53',
          400: '#fa8124',
          500: '#e1680f',
          600: '#ae5009',
          700: '#7d3a04',
          800: '#4c2201',
          900: '#1c0a00',
        }
    }
})

export default theme;