import { SvelteRenderResult } from '../types/SvelteRenderResult';

export default class SvelteRenderer {

  /**
   * Compiled svelte view.
   */
  view: any;

  /**
   * HTML template.  
   * The following placeholder will be replaced 
   * by result from rendered svelte compontent.
   * 
   * [HTML_COMMENT] SSR_HEAD [/HTML_COMMENT]  
   * [CSS_COMMENT] SSR_CSS [/CSS_COMMENT]  
   * [HTML_COMMENT] SSR_HTML [/HTML_COMMENT]
   */
  html: string;


  /**
   * Renders Svelte View to HTML.
   * Provided view must be a compiled commonjs module.
   * 
   * @param view Svelte view compiled to commonjs.
   * @param html_template HTML template with placeholders.
   */
  constructor(view: any, html_template: string) {
    this.view = view;
    this.html = html_template;
  }

  setHtmlTemplate(html_template: string): void {
    this.html = html_template;
  }

  /**
   * Renders svelte view and returns HTML.
   * Parameters are passed to svelte view.
   * 
   * @param view Name of view to render.
   * @param params View params (eg. {slug: '/slug'})
   * @param content Content to render in view.
   * @returns string
   */
  render(view: string, params: object, content?: object): string {
    const result = this.renderView(view, params, content ?? {});
    return this.replaceHtmlPlaceholder(result);
  }

  /**
   * Calls render function on svelte view with given parameters.
   * 
   * @param view 
   * @param params 
   * @param content 
   * @returns object {html, css, head}
   */
  renderView(view: string, params: object, content: object): SvelteRenderResult {
    return this.view.render({
      ssr: true,
      viewname: view,
      params: params,
      prepopulate_content: content
    });
  }

  /**
   * Replaces placeholder in html template with 
   * head, css, html from Svelte view render.
   * 
   * @param rendered {css, html, head}
   * @returns string
   */
  replaceHtmlPlaceholder(rendered: SvelteRenderResult): string {
    return this.html
      .replace("<!-- SSR_HEAD -->", rendered.head)
      .replace("/** SSR_CSS **/", rendered.css.code)
      .replace("<!-- SSR_HTML -->", rendered.html);
  }
}