import * as React from 'react';
import styled from 'styled-components';
import { AxiosResponse } from 'axios';
import stackmemo from '../notes/sample.jpg';
import stackmemo2 from '../notes/sample2.jpg';
import clear from '../assets/clear.png';
import save from '../assets/save.png';


interface Props {
    onMouseDown: (e: any) => void;
    onMouseUp: VoidFunction;
    onMouseLeave: VoidFunction;
    onMouseMove: (e: any) => void;
    saveCanvas: VoidFunction;
    clearCanvas: VoidFunction;
    getNotes: () => Promise<AxiosResponse<any> | never[]>;
    postNote: VoidFunction;
}

const Root = styled.div`
    padding: 20px
    text-align: right
`;

const ClearButton = styled.input`
    width: 40px
    height: 40px
`;

const StackNotes = styled.div`
    text-align: left
    margin-top: 50px
`;

const NoteImg = styled.img`
    display: inline-block 
    width: 230px
    height: 230px
    margin-right: 20px
    background-color: #FFF5C2
    box-shadow: 2px 5px rgba(0,0,0,0.3)
`;

const SaveButton = styled.a`
    margin-right: 5px
    width: 40px
    height: 40px
`;

const NoteStyle = {
    backgroundColor: '#BCDEFE',
};

const canvasStyle = {
    boxShadow: '2px 5px rgba(240,230,140,1)',
    margin: '0 0 10px 10px',
    backgroundColor: '#FFF5C2',
};


export function Memo(props: Props): JSX.Element {
    const {
        onMouseDown,
        onMouseUp,
        onMouseLeave,
        onMouseMove,
        saveCanvas,
        clearCanvas,
        getNotes,
        postNote,
    } = props;

    return (
        <Root>
            <StackNotes>
                {/* {[].map((note) => <NoteImg src={`data:image/jpeg;base64,${note}`} alt="" />)} */}
                <NoteImg src={stackmemo} alt="" />
                <NoteImg src={stackmemo2} style={NoteStyle} alt="" />
            </StackNotes>
            <br />
            <div>
                <ClearButton onClick={postNote} type="image" src={save} name="saveButton" alt="保存" />
                {/* <SaveButton onClick={saveCanvas} id="download" download="sample.jpg">
                    <img width="40px" src={save} alt="保存" />
                </SaveButton> */}
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
                onTouchStart={onMouseDown}
                onTouchEnd={onMouseLeave}
                onTouchCancel={onMouseLeave}
                onTouchMove={onMouseMove}
                style={canvasStyle}
                onDrag={onMouseMove}
            />
        </Root>
    );
}
