// pages/_document.js

import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Main, NextScript } from 'next/document'
import theme from '../components/theme'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
