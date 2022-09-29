import { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/Layout'
import '../styles/globals.scss'
import Header from "../components/Header"
import Footer from "../components/Footer"

import usePageView from '../hooks/usePageView'

//BaseWeb関連インポート
import {Provider as StyletronProvider} from 'styletron-react'
import {LightTheme, BaseProvider} from 'baseui'
import {styletron} from '../styletron'

const _App = ({ Component, pageProps }: AppProps) => {
  usePageView()
  return (
    <>
    <Layout>
      <StyletronProvider value={styletron}>
        <BaseProvider theme={LightTheme}>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </BaseProvider>
      </StyletronProvider>
      </Layout>
    </>
  )
}
export default _App