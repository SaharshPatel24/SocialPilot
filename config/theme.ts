import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

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
const theme = extendTheme({ config, fonts })

export default theme