import React from 'react';

import './Term.css';

export function Term(props) {
    const { term } = props;
    return <>
        <dt>
            <span className="Term__mainName" id={term.id}>{term.name_en}</span>
        </dt>
        <dd className="Term__define" dangerouslySetInnerHTML={{ __html: term.define_ru }} />
    </>;
}
