import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const colors = {
    brand: {
        900: "#788bff",
        800: "#9bb1ff",
        700: "#bfd7ff",
        600: "#495867",
        500: "#bfd7ff"
    },
};

// 2. Add your color mode config
const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const fonts = {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
}

// 3. extend the theme
const theme = extendTheme({ config, fonts, colors })

export default theme