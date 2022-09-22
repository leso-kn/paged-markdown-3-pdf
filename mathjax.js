/*
 *  mathjax – Paged Markdown 3 PDF Renderer
 *  by Lesosoftware, 2022
 */

let mathjax = require('markdown-it-mathjax-chtml')({ });

//

module.exports = mathjax.plugin();

module.exports.style = () => '<style>' + mathjax.getCSS() + '</style>';
