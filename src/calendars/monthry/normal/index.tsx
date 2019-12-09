/** MAIN
 * 画像が上に設定できるモードのRoot
 */
import * as React from 'react';
import styled from 'styled-components';

import { Day } from './Day';

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

class Otaku extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <Image />
                <Calendar>
                    <Day />
                </Calendar>
            </div>
        );
    }
}
export default Otaku;
