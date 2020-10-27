import * as React from 'react';
import { EditTabProps } from '../../../../types';
import { DocUpload } from '../DocUpload';
import './PreviewTab.scss';

export const PreviewTab = (props: EditTabProps): JSX.Element => {
    const { article, articleName, uploads } = props;
    const doc = {article_name: articleName, article, uploads };

    return (
        <section className="preview-tab">
            <DocUpload showUploads={false} doc={doc} />
        </section>
    );

}