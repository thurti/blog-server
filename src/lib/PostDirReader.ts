import fs, { FSWatcher } from 'fs';
import chokidar from 'chokidar';
import {readFileAsync, readdirAsync} from '../lib/fsAsync';
import fm from 'front-matter';

/**
 * Reads markdown files from directory and 
 * parses meta data with front matter.
 */
export default class PostDirReader {

    /**
     * Path to directory with markdown files.
     */
    private dir: string;

    /**
     * Parsed array of post objects.
     */
    private posts: Array<any>;

    /**
     * Watches for changes in directory.
     */
    private watcher: FSWatcher;


    /**
     * Reads markdown files form dir and parses front-matter.
     * @param dir Directory with markdown files.
     */
    constructor(dir: string) {
        this.dir = dir;
        this.posts = [];

        this.onDirUpdate = this.onDirUpdate.bind(this);
        this.watcher = chokidar.watch(this.dir.toString())
                                .on('add', this.onDirUpdate)
                                .on('change', this.onDirUpdate)
                                .on('unlink', this.onDirUpdate);
    }
    
    destroy() {
        this.watcher.close();
    }

    /**
     * Update posts when file in directory changes.
     * @param eventType 
     * @param filename 
     */
    onDirUpdate(eventType: string = '', filename: string = ''): void {
        this.updatePosts();
    }

    /**
     * Reads markdown files from directory and parses front-matter.
     * @returns Promise<Array> Array of post objects.
     */
    async updatePosts(): Promise<Array<any>> {
        const files = await this.readDir();
        const posts = files.filter(file => file.isFile() && file.name.endsWith('.md'))
                            .map(async file => await this.parseFile(file.name));
        
        return this.posts = posts;
    }

    /**
     * Reads files from directory.
     * @returns Promise Array with files from directory.
     */
    async readDir(): Promise<Array<fs.Dirent>> {
        return await readdirAsync(this.dir.toString(), {withFileTypes: true});
    }

    /**
     * Parses markdown file and resolves to object with meta and content.
     * @param file Path to markdown fiel.
     * @returns Promise<any> Post object.
     */
    async parseFile(file: string): Promise<any> {
        const file_path = `${this.dir}/${file}`;
        const file_content = await readFileAsync(file_path, {encoding: 'utf8'});
        const file_obj = fm(file_content);
        const attributes = <Object> file_obj.attributes;

        return {
            ...attributes,
            content: file_obj.body
        }
    }

    /**
     * Returns array of post objects.
     * @returns Promise<Array> Array of page objects. {...attributes, content: 'html content'}
     */
    async getPosts(): Promise<Array<any>> {
        const posts = (this.posts.length === 0) ? await this.updatePosts() : this.posts;
        return Promise.all(posts);
    }
}

