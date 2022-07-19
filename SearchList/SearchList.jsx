import React, { useState } from 'react';
import PrefixTree from 'prefix-tree';

import Term from './Term';

import './SearchList.css';

export function SearchList(props) {
    const { termsList, termsListTree, searhPrace: initialSearhPrace } = props;
    const prefixTree = new PrefixTree(termsListTree);

    const [searhPrace, setSearhPrace] = useState(initialSearhPrace || '');

    const handleChange = (event) => {
        setSearhPrace(event.target.value);
    };

    const searchedTermsIdsList = prefixTree.find(searhPrace);
    const searchedTermsList = searchedTermsIdsList.map((termId) => {
        const term = termsList[termId];
        return <Term key={termId} term={term} />;
    });

    return <main>
        <input onChange={handleChange} className="SearchList__input" placeholder="что ищем?..." />
        <dl>
            {searchedTermsList}
        </dl>
    </main>;
}
