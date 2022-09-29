import * as React from "react"
import Link from 'next/link'
import { CSSProperties, FunctionComponent } from 'react'

import * as gtag from '../lib/gtag'

import styles from "../styles/components/Footer.module.scss"


const Footer: FunctionComponent = () => {
    const ClickEvent = () => {
            gtag.event({
            action: 'click_event',
            category: 'link_button',
            label: 'event',
        })
    }
    return (
    <div>
    <footer className={styles.footer}>
        <div>
            <small>© 2022 Go5 lab.</small>
        </div>
        <div>
            <Link href="https://go5.run/">
                <a className={styles.link} onClick={ClickEvent}>Our Team</a>
            </Link>
            <Link href="/privacy/">
                <a className={styles.link} onClick={ClickEvent}>PrivacyPolicy</a>
            </Link>
            <Link href="/terms/">
                <a className={styles.link} onClick={ClickEvent}>Terms</a>
            </Link>
        </div>
    </footer>
    </div>
  )
}
export default Footer