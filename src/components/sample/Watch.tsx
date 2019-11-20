import * as React from 'react';

interface Props {
    Date: string,
    Time: string,
}

export default function Watch(props: Props): JSX.Element {
    const { Date, Time } = props;
    return (
        <div>
            <p>{Date}</p>
            <p>{Time}</p>
        </div>
    );
}
