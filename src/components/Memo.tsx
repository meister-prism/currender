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
    
`;

const canvasStyle = {
    border: '1px solid gray',
    backgroundColor: 'white',
};

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
        <Root>
            <canvas
                width="500px"
                height="400px"
                id="canvas"
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                onMouseMove={onMouseMove}
                style={canvasStyle}
            />
            <p>
                <a onClick={saveCanvas} id="download" download="sample.jpg">
                    save
                </a>
                <button onClick={clearCanvas} type="button">clear</button>
            </p>
        </Root>
    );
}
