const { vTranslit } = require('vtranslit');

const vtranslitRe = /^\/\/(.+?)\/\//s;

const locator = (value, fromIndex) => value.indexOf('//', fromIndex);

const clean = str => str.trim().replace(/\n/g, ' ');

const initInlineTokenizer = (vt, toSchemeCode) => (eat, value) => {

    const match = vtranslitRe.exec(value);

    if (match) {

        const content = clean(match[1]);

        if (content[0] === '/') {

            return eat('///')({
                type: 'escape',
                value: '//'
            });
    
        }

        const text = vt(content);

        return eat(match[0])({
            type: 'vtranslit',
            value: text,
            data: {
                hName: 'span',
                hProperties: {
                    className: `vtranslit vtranslit-scheme-${toSchemeCode.toLowerCase()}`,
                    lang: 'sa'
                },
                hChildren: [{
                    type: 'text',
                    value: text
                }]
            }
        })

    }

};

const remarkVtranslit = function ([fromScheme, toScheme]) {

    const vtranslit = vTranslit([
        fromScheme,
        toScheme
    ]);

    const fromSchemeCode = fromScheme.about.code;
    const toSchemeCode = toScheme.about.code;
    const vt = vtranslit.init(fromSchemeCode, toSchemeCode);

    const inlineTokenizer = initInlineTokenizer(vt, toSchemeCode);

    inlineTokenizer.locator = locator;

    // Inject inlineTokenizer
    const inlineTokenizers = this.Parser.prototype.inlineTokenizers;
    const inlineMethods = this.Parser.prototype.inlineMethods;

    inlineTokenizers.remarkVtranslit = inlineTokenizer;
    inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'remarkVtranslit')

};

module.exports = remarkVtranslit;