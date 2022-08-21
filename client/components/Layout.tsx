import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css"
import utilStyles from "../styles/utils.module.css"

export const siteTitle = "ナオトのブログ"

interface Props {
    children?: JSX.Element
}

const Layout = ({ children }: Props) => {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <header className={styles.header}>
                <img className={utilStyles.borderCircle} src="/images/profile.png"/>
                <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
            </header>
            <main>{children}</main>
        </div>
    );
}

export default Layout;