import React from 'react';

import './Term.css';

export function Term(props) {
    const { term } = props;
    return <>
        <dt>
            <span className="Term__mainName">{term.name_ru}</span>
            {' '}
            <span className="Term__sideName">
                {'(англ. '}
                <a href={term.link} target="_blank" rel="noreferrer">
                    {term.name_en}
                </a>
                )
            </span>
        </dt>
        <dd className="Term__define" dangerouslySetInnerHTML={{ __html: term.define_ru}} />
    </>;
}
