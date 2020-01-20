import * as React from 'react';
import styled from 'styled-components';

interface Props {
    onMouseDown: (e: any) => void;
    onMouseUp: VoidFunction;
    onMouseLeave: VoidFunction;
    onMouseMove: (e: any) => void;
    saveCanvas: VoidFunction;
    clearCanvas: VoidFunction;
}

const Root = styled.div`
    width: 500px
    height: 500px
    border: 1px solid gray
    backgroundColor: white
`;


export function Memo(props: Props): JSX.Element {
    const {
        onMouseDown,
        onMouseUp,
        onMouseLeave,
        onMouseMove,
        saveCanvas,
        clearCanvas,
    } = props;
    return (
        <Root id="canvas">
            {onMouseDown}
            {onMouseUp}
            {onMouseLeave}
            {onMouseMove}
            <p>
                <a onClick={saveCanvas} id="download" download="sample.jpg">
                    save
                </a>
                <button onClick={clearCanvas} type="button">clear</button>
            </p>
        </Root>
    );
}
