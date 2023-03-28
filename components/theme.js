// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  useSystemColorMode: true,
}

const styles = {
  styles: {
    global: {
      textarea: {
        resize: "none",
        mb: "4",
        size: "lg",
      },
      input: {
        mb: "4",
      },
      button: {
        width: "full",
      },
      body: {
        padding: "2",
      }
    }
  }
}

// 3. extend the theme
const theme = extendTheme({ ...config, ...styles })

export default theme
