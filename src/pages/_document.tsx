import * as React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"
import { existsGaId, GA_ID } from '../lib/gtag'

//BaseWeb関連インポート
import {Provider as StyletronProvider} from "styletron-react"
import {Server, Sheet} from "styletron-engine-atomic"
import {styletron} from "../styletron"

class MyDocument extends Document<{stylesheets: Sheet[]}> {
  static getInitialProps(props: any) {
    // eslint-disable-next-line react/display-name
    const page = props.renderPage((App: any) => (props: any) => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ));
    const stylesheets = (styletron as Server).getStylesheets() || [];
    return {...page, stylesheets};
  }
  render() {
    const name = process.env.serviceName
    const nameplain = process.env.serviceNamePlain
    const domain = process.env.serviceDomain
    const description = process.env.serviceDescription
    const icon = process.env.serviceIcon
    return (
      <Html>
        <Head>
        <link rel="alternate" hrefLang="ja" href="https://buzzcore.pro/"/>
        <link rel="alternate" hrefLang="en" href="https://buzzcore.pro/en/"/>
        <meta name="robots" content="index, follow" />
        <meta name="description" content={description}/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="format-detection" content="telephone=no"/>

        <link rel="icon" href={icon} />

        <meta property="og:title" content={name}/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={"https://" + domain + "/"}/>
        <meta property="og:site_name" content={name}/>
        <meta property="og:image" content={"https://" + domain + "/img/ogp.png"}/>
        <meta property="og:description" content={description}/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content=""/>

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2294423007562937" crossOrigin="anonymous"></script>

        {/* Google Analytics */}
        {existsGaId && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
                }}
              />
            </>
          )}

        {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{__html: sheet.css}}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}
      </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument