/*
 *  util – Paged Markdown 3 PDF Renderer
 *  by Lesosoftware, 2022
 */

const hljs = require('highlight.js');

//

module.exports.highlight = (str, lang) =>
{
    if (lang == 'jsonc') lang = 'json';
    if (lang && hljs.getLanguage(lang))
    {
      try { return hljs.highlight(str, { language: lang }).value; }
      catch { }
    }
    return '';
};
