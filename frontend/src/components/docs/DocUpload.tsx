import * as React from 'react';
import { DocResponse } from '../../../types';
import { H3 } from '@blueprintjs/core';
import { default as remark2react } from 'remark-react';
import { default as remark } from 'remark';
import { DocImage } from './DocImage';

type Props = {
    doc: Pick<DocResponse, 'article' | 'article_name' | 'uploads'>;
    showUploads: boolean;
}

export const DocUpload = (props: Props): JSX.Element => {
    const { doc } = props;
    return (
        <div>
            <strong>{doc.article_name}</strong>
            {
                remark()
                    .use(remark2react)
                    .processSync(doc.article).result
            }
            {props.showUploads && (
                <div className="uploads">
                    <div className="uploads-container">
                        <H3>Uploads</H3>
                        {doc.uploads?.length && doc.uploads.map((u) => {
                            return (<DocImage key={u.name} upload={u} />)
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};