import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import { Post } from "../types/Post";

const postsDirectory = path.join(process.cwd(), "posts")

export const getPostsData = () => {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const matterResult = matter(fileContents)

        return {
            id,
            ...matterResult.data
        }
    })
    return allPostsData
}

export const getAllPostIds = () => {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, "")
            }
        }
    })
}

export type PostData = Post & {blogContentHTML: string}

export const getPostData = async (id: string): Promise<PostData> => {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContent = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContent)

    const blogContent = await remark()
        .use(html)
        .process(matterResult.content)
    
    const blogContentHTML = blogContent.toString()

    const metaData = matterResult.data

    return {
        id,
        blogContentHTML,
        title: metaData.title,
        date: metaData.date,
        thumbnail: metaData.thumbnail,
    }
}
