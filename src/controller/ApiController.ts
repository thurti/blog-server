import { Request, Response } from "express";
import config from '../config';
import PostDirReader from "../lib/PostDirReader";
import Posts from "../model/Posts";

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
                  .json({error: "500 - can't read posts"});
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
                  .json({error: "500 - can't read posts"});
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