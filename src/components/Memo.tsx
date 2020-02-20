import * as React from 'react';
import styled from 'styled-components';
import stackmemo from './logo512.png';

interface Props {
    onMouseDown: (e: any) => void;
    onMouseUp: VoidFunction;
    onMouseLeave: VoidFunction;
    onMouseMove: (e: any) => void;
    saveCanvas: VoidFunction;
    clearCanvas: VoidFunction;
}

const Root = styled.div`
    padding: 20px
    text-align: right
`;

const SaveButton = styled.a`
    font-size: 10px
    padding: 4px
    margin-right: 3px
    border: solid 1px grey
    border-radius: 0.2em
    background-color: white
`;

const ClearButton = styled.button`
    font-size: 10px
    border: solid 1px grey
    border-radius: 0.2em
`;

const StackNotes = styled.div`
    text-align: left
`;

const Notes = styled.div`
    display: inline-block 
    width: 230px
    height: 230px
    margin-right: 5px
    background-size: cover
    // background-image: url("./logo512.png")
    background-color: #FFFFCC
    border-radius: 0.2em
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2)
`;

const canvasStyle = {
    boxShadow: '5px 5px 5px rgba(240,230,140,1)',
    marginLeft: '10px',
    backgroundColor: '#FFFFCC',
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
            <StackNotes>
                <Notes />
                <Notes />
                <Notes />
            </StackNotes>
            <br />
            <canvas
                width="250px"
                height="250px"
                id="canvas"
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                onMouseMove={onMouseMove}
                style={canvasStyle}
            />
            <div>
                <SaveButton onClick={saveCanvas} id="download" download="sample.jpg">
                    決定
                </SaveButton>
                <ClearButton onClick={clearCanvas} type="button">取り消し</ClearButton>
            </div>
        </Root>
    );
}
