/** MAIN
 * 画像が上に設定できるモードのRoot
 */
import * as React from 'react';
import styled from 'styled-components';

import { Day } from './Day';
import { Monthly } from './Monthly';

const Image = styled.div`
    height: 840px
    width: 100%
    background-color: #f4a460
`;

const Calendar = styled.div`
    height: 1080px
    width: 100%
    background-color: 00ff7f
`;

interface State {
    name: string
}

class Otaku extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: 'aaaaaa',
        };
    }

    change(item: string) {
        this.setState({
            name: item,
        });
    }

    render() {
        const test = [1, 2, 3, 4, 5];
        const { name } = this.state;
        return (
            <div>
                <Monthly />
            </div>
        );
    }
}
export default Otaku;
