import PostDirReader from "../lib/PostDirReader";

export default class Posts {

    private reader: PostDirReader;

    constructor(reader: PostDirReader) {
        this.reader = reader;
    }

    /**
     * Returns array of post objects with meta only.
     * @returns Promise<Array> Array of post objects.
     */
    async all(): Promise<Array<any>> {
        const posts = await this.reader.getPosts();
        return posts.filter(post => post.published)
                    .map(post => {return {...post, content: undefined}})
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    /**
     * Returns post by slug.
     * @param slug Post slug defined in posts markdown front matter.
     * @returns Promise<Object> Returns post with given slug.
     */
    async getBySlug(slug: string): Promise<object> {
        const posts = await this.reader.getPosts();
        const post = posts.find(post => post.slug === slug && post.published);

        return (post) ? post : Promise.reject(new Error('404'));
    }

}