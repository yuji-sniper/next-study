import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData, PostData } from "../../lib/post";
import { Post } from "../../types/Post";
import utilStyles from "../../styles/utils.module.css"
import Head from "next/head";

interface Props {
    post: PostData
}

interface Params extends ParsedUrlQuery {
    id: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }: any) => {
    const postData = await getPostData(params!.id)
    return {
        props: {
            post: postData
        }
    }
}

const PostShow = (props: Props) => {
    return (
        <Layout>
            <div>
                <Head>
                    <title>{props.post.title}</title>
                </Head>
                <article>
                    <h1 className={utilStyles.headingX1}>{props.post.title}</h1>
                    <div className={utilStyles.lightText}>{props.post.date}</div>
                    {/* 本来はサニタイズなどの対応が必要 */}
                    <div dangerouslySetInnerHTML={{ __html: props.post.blogContentHTML }}/>
                </article>
            </div>
        </Layout>
    );
}

export default PostShow;