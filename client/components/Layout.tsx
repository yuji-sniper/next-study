import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css"
import utilStyles from "../styles/utils.module.css"
import Link from "next/link";

export const siteTitle = "ナオトのブログ"

interface Props {
    children?: JSX.Element
    home?: boolean
}

const Layout = (props: Props) => {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <header className={styles.header}>
                {props.home ? (
                    <>
                        <Link href="/">
                            <img className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`} src="/images/profile.png"/>
                        </Link>
                        <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <img className={utilStyles.borderCircle} src="/images/profile.png"/>
                        </Link>
                        <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
                    </>
                )}
            </header>
            <main>{props.children}</main>
            {!props.home && (
                <div>
                    <Link href="/">← ホームへ戻る</Link>
                </div>
            )}
        </div>
    );
}

export default Layout;