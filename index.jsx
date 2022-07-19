import ReactDOM from 'react-dom';
import React from 'react';

import SearchList from './SearchList';

const md = require('markdown-it')();

const text = await fetch('https://raw.githubusercontent.com/web-standards-ru/dictionary/main/dictionary.md')
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        return data;
    });

const md2json = require('md-2-json');

const parsedDictionary = Object.values(md2json.parse(text))[0];

const resultTree = {};

const resultTerList = {};

Object.keys(parsedDictionary).forEach((key) => {
    if (key ==='raw') return;
    const section = parsedDictionary[key]
    Object.keys(section).forEach((term) => {
        resultTree[term] = [term];
        const finderArray = md.render(section[term].raw).match(/(?<=\<strong>)[а-яА-Я 1-9A-Z\-(),́]*(?=<\/strong>)/g);
        finderArray ? finderArray.map((item) => {
            if (item[item.length -1] === ',') {
                resultTree[term].push(item.slice(0, -1));
            } else {
                resultTree[term].push(item);
            }
        }) : '';
        if (md.render(section[term].raw).includes('<li>')) {
            const finderArray2 = md.render(section[term].raw).match(/(?<=\<strong>)[а-яА-Я ()]*,?(?=<\/strong>)/g);
            finderArray2 ? finderArray2.map((item) => {
                if (item[item.length -1] === ',') {
                    resultTree[term].push(item.slice(0, -1));
                } else {
                    resultTree[term].push(item);
                }
            }) : '';
        }

        resultTerList[term] = {
            name_ru: finderArray ? finderArray[0] : '',
            name_en: term,
            define_ru: md.render(section[term].raw),
        };
    })
})

/* eslint-disable no-undef */
const elem = document.getElementById('root');

ReactDOM.render(<SearchList termsList={resultTerList} termsListTree={resultTree}/>, elem);
