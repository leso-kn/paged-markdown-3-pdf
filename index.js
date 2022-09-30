#!/usr/bin/env node

/*
 *  Paged Markdown 3 PDF Renderer
 *  Lesosoftware 2022
 */

const { readFileSync, existsSync } = require('fs');

//

let htmlHeader = __dirname + '/head.htm';

// Process argv early for fast usage guide
if (process.argv.length > 2 && process.argv[2].startsWith('--head='))
{
    htmlHeader = process.argv[2].substring(7);
    process.argv.splice(2, 1);
}

let filename = process.argv[2];
if (process.argv.length <= 2 || !existsSync(filename))
{
    let binName = require('./package.json').bin;
    console.log(`Usage: ${binName} [--head=<header.htm>] <input.md> [output.pdf]

       --head=<header.htm>  Instead of the default one, use a custom
                            html header to fine-tune PDF theming.\n`);
    return;
}

//

const { dirname, basename, parse, resolve } = require('path');
let output = dirname(filename) + '/' + basename(filename).replace(/\.[^\.]+$/, '') + '.pdf';

if (process.argv.length > 3) {
    // Optional output-file argument given
    output = process.argv[3];
}

filename = resolve(filename);

//

const which = require('which');
const puppeteer = require('puppeteer-core');

const http = require('http');
const hangersteak = require('hangersteak');

const { highlight, slugify } = require('./util');

const md = require("markdown-it")
({
    html: true,
    linkify: true,
    highlight: highlight
});

let mathjax = require('./mathjax');
md.use(mathjax);
md.use(require('markdown-it-anchor'), { tabIndex: false, slugify: slugify });

//

(async () =>
{
    // Render
    let source = readFileSync(filename).toString();
    if (source.startsWith('---'))
    {
        source = source.substring(source.indexOf('\n---\n', 1) + 4);
    }
    else { source = '\n' + source; }

    source = readFileSync(htmlHeader) + source;
    let htm = md.render(source);
    htm += mathjax.style();

    // Serve
    let server = http.createServer((req, res) => {
        if (req.url == '/' + filename)
        {
            res.setHeader('Content-Type', 'text/html');
            res.write(htm);
            res.end();
            return;
        }
        hangersteak(req, res, {
            dir: parse(filename).root
        });
    });
    let listening = new Promise(r => server.once('listening', r));

    server.listen(null, '127.0.0.1');
    await listening;

    // Print
    const engine = await puppeteer.launch({ executablePath: await which('chromium'), headless: true })
    let page = await engine.newPage();

    await page.goto(`http://localhost:${server.address().port}/${filename}`);

    await new Promise(r => page.once('console', r));
    //await new Promise(r => setTimeout(r, 1000));
    await page.pdf({ path: output, preferCSSPageSize: true });

    server.close();
    await engine.close();
})();
