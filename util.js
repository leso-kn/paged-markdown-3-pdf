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

module.exports.slugify = (headline) =>
{
    // From https://github.com/microsoft/vscode-markdown-languageservice/blob/98443ad57d76ed1e56ed4fa80097441864500cb3/src/slugify.ts#L20
    return encodeURI(
        headline.trim()
                .toLowerCase()
                .replace(/\s+/g, '-') // Replace whitespace with -

                 // allow-any-unicode-next-line
                .replace(/[\]\[\!\/\'\"\#\$\%\&\(\)\*\+\,\.\/\:\;\<\=\>\?\@\\\^\{\|\}\~\`。，、；：？！…—·ˉ¨‘’“”々～‖∶＂＇｀｜〃〔〕〈〉《》「」『』．〖〗【】（）［］｛｝]/g, '') // Remove known punctuators
                .replace(/^-+/, '') // Remove leading -
                .replace(/-+$/, ''));
};
