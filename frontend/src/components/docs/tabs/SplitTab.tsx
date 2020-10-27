import { H2 } from '@blueprintjs/core';
import * as React from 'react';
import { EditTabProps } from '../../../../types';
import { EditTab } from './EditTab';
import { PreviewTab } from './PreviewTab';
import './SplitTab.scss';

export const SplitTab = (props: EditTabProps): JSX.Element => {
    return (
        <section className="split-tab">
            <div>
                <H2>Edit Tab</H2>
                <EditTab {...props} />
            </div>
            <div>
                <H2>Preview Tab</H2>
                <PreviewTab {...props} />
            </div>
        </section>
    )

}