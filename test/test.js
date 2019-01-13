const rehypeStringify = require('rehype-stringify');
const remarkParse = require('remark-parse');
const remarkRehype = require('remark-rehype');
const unified = require('unified');

const {readFileSync} = require('fs');

const { vTranslitSchemeItrn } = require('vtranslit-scheme-itrn');
const { vTranslitSchemeDeva } = require('vtranslit-scheme-deva');

const remarkVtranslit = require('..');

const md = readFileSync('./test/sample.md');

unified()
    .use(remarkParse)
    .use(remarkVtranslit, [
        vTranslitSchemeItrn,
        vTranslitSchemeDeva
    ])
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md, (err, file) => console.log(err || String(file)));
