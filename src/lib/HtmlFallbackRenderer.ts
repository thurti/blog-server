import config from '../config';
import marked from 'marked';
import {readFileAsync} from '../lib/fsAsync';

const post_defaults = {
  title     : '',
  created_at: '',
  teaser    : '',
  slug      : '',
  content   : ''
};

/**
 * Returns HTML fallback for list view.
 * @param posts Array of post objects to render.
 * @returns Promise HTML string.
 */
export async function renderPostList(posts: Array<any>): Promise<string> {
  const template_list = await readFileAsync(`${config.TEMPLATES}/list.html`, {encoding: 'utf8'});
  const template_item = await readFileAsync(`${config.TEMPLATES}/list_item.html`, {encoding: 'utf8'});

  let content = '';

  posts.forEach(post => {
    const p = {...post_defaults, ...post};
    content += template_item.replace(/#title#/, p.title.replace(/<br>/, ''))
                            .replace(/#created_at#/, p.created_at)
                            .replace(/#teaser#/, marked(p.teaser))
                            .replace(/#link#/, p.slug);
  });

  return template_list.replace(/#content#/, content);
}

/**
 * Returns HTML fallback for single post view.
 * @param post Post object.
 * @returns Promise HTML string.
 */
export async function renderSinglePost(post: any): Promise<string> {
  const template = await readFileAsync(`${config.TEMPLATES}/single.html`, {encoding: 'utf8'});
  const p = {...post_defaults, ...post};
  
  return template.replace(/#title#/g, p.title.replace(/<br>/, ''))
                 .replace(/#created_at#/, p.created_at)
                 .replace(/#content#/, marked(p.content));
}