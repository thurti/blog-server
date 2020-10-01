import { request, Request, Response } from "express";
import config from '../config';
import PostDirReader from "../lib/PostDirReader";
import Posts from "../model/Posts";
import { renderPostList, renderSinglePost } from "../lib/HtmlFallbackRenderer";

const reader = new PostDirReader(config.POSTS);
const posts = new Posts(reader);

/**
 * Returns array of posts meta data.
 * @param req 
 * @param res 
 * @returns Promise
 */
export async function getPosts(req: Request, res: Response): Promise<Response> {
    try {
        return res.json(await posts.all());
    } catch(error) {
        return res.status(500)
                  .json({error: "can't read posts"});
    }
}

/**
 * Returns array of posts meta data for given tag.
 * @param req 
 * @param res 
 * @returns Promise
 */
export async function getPostsByTag(req: Request, res: Response): Promise<Response> {
    try {
        return res.json(await posts.getByTag(req.params.tag));
    } catch(error) {
        return res.status(500)
                  .json({error: "can't read posts"});
    }
}

/**
 * Returns single post content.
 * @param req 
 * @param res 
 * @returns Promise
 */
export async function getSinglePost(req: Request, res: Response): Promise<Response> {
    try {
        return res.json(await posts.getBySlug(req.params.slug));
    } catch (error) {
        return res.status(404)
                  .json({error: "404 - page not found"});
    }
}

/**
 * Returns listing of posts as HTML.
 * @param req 
 * @param res 
 * @returns Promise
 */
export async function getPostsHtml(req: Request, res: Response): Promise<Response> {
    try {
        const posts_array = await posts.all();
        const html = await renderPostList(posts_array);
        return res.send(html);
    } catch(error) {
        return res.status(500)
                  .send("errrrrrrrro");
    }
}

/**
 * Returns single post content as HTML.
 * @param req 
 * @param res 
 * @returns Promise
 */
export async function getSinglePostHtml(req: Request, res: Response): Promise<Response> {
    try {
        const post_single = await posts.getBySlug(req.params.slug);
        const html = await renderSinglePost(post_single);
        return res.send(html);
    } catch (error) {
        return res.status(404)
                  .send("errrrrrrrro");
    }
}