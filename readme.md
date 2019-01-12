# remark-vtranslit

remark-vtranslit is a [remarkjs](https://remark.js.org/) plugin for [vtranslit](https://github.com/vipranarayan14/vtranslit).

## Setup

```bash
> npm i remark-vtranslit
```

## Usage

### Code

```js
const rehypeStringify = require('rehype-stringify');
const remarkParse = require('remark-parse');
const remarkRehype = require('remark-rehype');
const unified = require('unified');
const remarkVtranslit = require('remark-vtranslit');

const { vTranslitSchemeItrn } = require('vtranslit-scheme-itrn');
const { vTranslitSchemeDeva } = require('vtranslit-scheme-deva');

const markdownString = '# //namaskAra// 🙏 to Everyone!!!';

unified()
    .use(remarkParse)
    .use(remarkVtranslit, [
        vTranslitSchemeItrn,
        vTranslitSchemeDeva
    ])
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdownString, (err, file) => {
        
        console.log(err || String(file));
        
    });
```

### Output:

```html
<h1><span class="vtranslit vtranslit-scheme-deva">नमस्कार</span> 🙏 to Everyone!!!</h1>
```

### Escaping '//'

A double-slash ('//') can be escaped by wrting '///'. See [Sample](test/sample.md) for usage.

## License

[MIT](LICENSE) (c) [Prasanna Venkatesh T S](https://github.com/vipranarayan14)