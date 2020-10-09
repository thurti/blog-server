import { request, Request, Response } from "express";
import config from '../config';
import PostDirReader from "../lib/PostDirReader";
import Posts from "../model/Posts";
import { renderPostList, renderSinglePost } from "../lib/HtmlFallbackRenderer";

const reader = new PostDirReader(config.POSTS);
const posts = new Posts(reader);

/**
 * Returns listing of posts as HTML.
 * @param req 
 * @param res 
 * @returns Promise
 */
export async function getPosts(req: Request, res: Response): Promise<Response> {
    try {
        const posts_array = await posts.all();
        const html = await renderPostList(posts_array);
        return res.send(html);
    } catch(error) {
        return res.status(500)
                  .send("errrrrrrrro - 500 server says no");
    }
}

/**
 * Returns listing of posts by tag as HTML.
 * @param req 
 * @param res 
 * @returns Promise
 */
export async function getPostsByTag(req: Request, res: Response): Promise<Response> {
    try {
        const posts_array = await posts.getByTag(req.params.tag);
        const html = await renderPostList(posts_array);
        return res.send(html);
    } catch(error) {
        return res.status(500)
                  .send("errrrrrrrro - 500 server says no");
    }
}

/**
 * Returns single post content as HTML.
 * @param req 
 * @param res 
 * @returns Promise
 */
export async function getSinglePost(req: Request, res: Response): Promise<Response> {
    try {
        const post_single = await posts.getBySlug(req.params.slug);
        const html = await renderSinglePost(post_single);
        return res.send(html);
    } catch (error) {
        return res.status(404)
                  .send("errrrrrrrro - 404 page not found");
    }
}