import * as React from 'react';
import styled from 'styled-components';
import stackmemo from '../notes/memo1.jpg';
import clear from '../assets/clear.png';
import save from '../assets/save.png';

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
    margin-right: 5px
    width: 40px
    height: 40px
`;

const ClearButton = styled.input`
    width: 40px
    height: 40px
`;

const StackNotes = styled.div`
    text-align: left
`;

const NoteImg = styled.img`
    display: inline-block 
    width: 230px
    height: 230px
    margin-right: 20px
    background-color: #FFF5C2
    box-shadow: 2px 5px rgba(0,0,0,0.3)
`;

const NoteStyle = {
    backgroundColor: '#BCDEFE',
};

const canvasStyle = {
    boxShadow: '2px 5px rgba(240,230,140,1)',
    margin: '0 0 10px 10px',
    backgroundColor: '#FFF5C2',
};

const UrlList = ['../notes/memo1.jpg', '../notes/memo1.jpg'];

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
                {UrlList.map((url) => <NoteImg src={url} alt="" />)}
                <NoteImg src={stackmemo} alt="" />
                <NoteImg src={stackmemo} style={NoteStyle} alt="" />
            </StackNotes>
            <br />
            <div>
                <SaveButton onClick={saveCanvas} id="download" download="sample.jpg">
                    <img width="40px" src={save} alt="保存" />
                </SaveButton>
                <ClearButton onClick={clearCanvas} type="image" src={clear} name="clearButton" alt="取り消し" />
            </div>
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
        </Root>
    );
}
