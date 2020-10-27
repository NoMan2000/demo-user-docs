import * as React from 'react';

type Props = {
    default?: boolean;
}

export const NotFound = (props: Props) => {
    return (
        <section className="not-found">
            Not found.
        </section>
    )
}