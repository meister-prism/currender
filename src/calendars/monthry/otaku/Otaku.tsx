/** MAIN
 * 画像が上に設定できるモードのRoot
 */
import * as React from 'react';
import styled from 'styled-components';

const Image = styled.div`
    height: 50%
    width: 100%
    background-color: #f4a460
`;

const Calendar = styled.div`
    height: 50%
    width: 100%
    background-color: 00ff7f
`;

class Otaku extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <Image />
                <Calendar />
            </div>
        );
    }
}
export default Otaku;
