[![npm version](https://img.shields.io/npm/v/paged-markdown-3-pdf)](https://www.npmjs.com/package/paged-markdown-3-pdf) [![Output Example](https://img.shields.io/static/v1?label=Output%20Example&message=PDF&color=blueviolet)](https://lesosoftware.com/paged-markdown-3-example.pdf)

## `pmd-pdf`

_A PDF-renderer for [Paged Markdown 3](https://github.com/leso-kn/paged-markdown-3)._

## Installation

The `pmd-pdf` utility is [available on npm](https://www.npmjs.com/package/paged-markdown-3-pdf) and can be installed using the following command (given that [npm](https://nodejs.org/en/download/) is installed on your system):

```bash
> npm install -g paged-markdown-3-pdf
```

## Basic Usage

Once `pmd-pdf` is installed, Paged Markdown 3 documents can be exported to PDF by running the following command:

```bash
> pmd-pdf <input.md> [output.pdf]
```

## Advanced Usage

```bash
> pmd-pdf [--head=<header.htm>] <input.md> [output.pdf]

           --head=<header.htm>  Instead of the default one, use a custom
                                html header to fine-tune PDF theming.
```

## License

This project is licensed under the MIT-license.

---

`pmd-pdf` – Lesosoftware, 2022
