import Link from "next/link"
import React from "react"
import Layout from "../components/Layout"
import { getPostsData } from "../lib/post"
import styles from "../styles/Home.module.css"
import utilStyles from "../styles/utils.module.css"
import { Post } from "../types/Post"

interface Props {
  posts: Post[]
}

// SSG
export const getStaticProps = async () => {
  const allPostsData = await getPostsData()
  return {
    props: {
      posts: allPostsData
    }
  }
}

// SSR
// export const getServerSideProps = async () => {
//   const allPostsData = await getPostsData()
//   return {
//     props: {
//       posts: allPostsData
//     }
//   }
// }

const Home = (props: Props) => {
  return (
    <Layout>
      <div>

        <section className={utilStyles.headingMd}>
          <p>ナオトくんが書いたブログです</p>
        </section>

        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2>📝エンジニアのブログ</h2>
          <div className={styles.grid}>
            {props.posts.map((post) => (
              <article key={post.id}>
                <Link href={`/posts/${post.id}`}>
                  <img className={styles.thumbnailImage} src={post.thumbnail}/>
                </Link>
                <Link href={`/posts/${post.id}`}>
                  <a className={utilStyles.boldText}>{post.title}</a>
                </Link>
                <br/>
                <small className={utilStyles.lightText}>
                  {post.date}
                </small>
              </article>
            ))}
          </div>
        </section>

      </div>
    </Layout>
  )
}

export default Home
