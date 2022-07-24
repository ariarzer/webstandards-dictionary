import ReactDOM from 'react-dom';
import React from 'react';

import SearchList from './SearchList';

const md = require('markdown-it')();

const parse = require('@textlint/markdown-to-ast').parse;

(async function global() {
    const text = await fetch('https://raw.githubusercontent.com/web-standards-ru/dictionary/main/dictionary.md')
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            return data;
        });

    const resultTree = {};

    const resultTerList = {};

    const AST = parse(text);

    let termId;
    AST.children.forEach((child) => {
        if (child.type === 'Header' && child.depth === 3) {
            const nameEn = child.children[0].value || child.children[0].children[0].value;
            termId = nameEn.replace(' ', '-');
            resultTree[termId] = [nameEn];
            resultTerList[termId] = {
                name_en: nameEn,
                id: termId,
            };
        }

        if (!termId) {
            return;
        }

        if (child.type === 'Paragraph') {
            if (child.children[0].type === 'Strong') {
                let nameRu = child.children[0].children[0].value;
                if (nameRu[nameRu.length - 1] === ',') {
                    nameRu = nameRu.slice(0, -1);
                }
                resultTerList[termId].name_ru = nameRu;
                resultTree[termId].push(nameRu);
            }
            resultTerList[termId].define_ru = md.render(child.raw);
        }

        if (child.type === 'List') {
            child.children[0].children[0].children.forEach((item) => {
                if (item.type === 'Strong') {
                    let nameRu = item.children[0].value;
                    if (nameRu[nameRu.length - 1] === ',') {
                        nameRu = nameRu.slice(0, -1);
                    }
                    resultTree[termId].push(nameRu);
                    resultTerList[termId].name_ru = nameRu;
                }
            });
            resultTerList[termId].define_ru = md.render(child.raw);
        }
    });

    /* eslint-disable no-undef */
    const elem = document.getElementById('root');

    ReactDOM.render(<SearchList termsList={resultTerList} termsListTree={resultTree} />, elem);
}());
