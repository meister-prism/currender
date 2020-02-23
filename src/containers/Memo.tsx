import * as React from 'react';
import axios from 'axios';
import { Memo as MemoComponent } from '../components/Memo';

interface State {
    drawing: boolean
}

class Canvas extends React.Component<{}, State> {
    static getContext2D() {
        const canvas : any = document.getElementById('canvas');
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        return ctx;
    }

    static clearCanvas() {
        const canvas: any = document.getElementById('canvas');
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    }

    static getNotes = async () => {
        const r = await axios.get('https://agile-river-42294.herokuapp.com/handwrittenImg/all')
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((error) => {
                console.log(error);
                return [];
            });
        return r;
    }

    static postNote() {
        const canvas: any = document.getElementById('canvas');
        const base64 = canvas.toDataURL('image/png');
        const bin = atob(base64.replace(/^.*,/, ''));
        const buffer = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i += 1) {
            buffer[i] = bin.charCodeAt(i);
        }
        const data = { handwrittenImg: new TextDecoder('utf-8').decode(buffer) };
        axios.post('https://agile-river-42294.herokuapp.com/handwrittenImg/add/', data)
            .then((res) => {
                console.log('ok', res);
            })
            .catch((error) => {
                console.log('error', error, data);
            });
    }

    static saveCanvas() {
        const canvas: any = document.getElementById('canvas');
        const a: any = document.getElementById('download');
        canvas.toBlob((blob: any) => {
            a.href = window.URL.createObjectURL(blob);
        });
    }

    constructor(props: any) {
        super(props);
        this.state = {
            drawing: false,
        };
        this.startDrawing = this.startDrawing.bind(this);
        this.draw = this.draw.bind(this);
    }

    endDrawing() {
        this.setState({ drawing: false });
    }

    draw(x: number, y: number) {
        const { drawing } = this.state;
        if (!drawing) {
            return;
        }
        const ctx = Canvas.getContext2D();
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    startDrawing(x: number, y: number) {
        this.setState({ drawing: true });
        const ctx = Canvas.getContext2D();
        // const canvas: any = document.getElementById('canvas');
        // const ctx = canvas.getContext('2d');
        ctx.moveTo(x, y);
    }

    render() {
        return (
            <MemoComponent
                onMouseDown={(e) => this.startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
                onMouseUp={() => this.endDrawing()}
                onMouseLeave={() => this.endDrawing()}
                onMouseMove={(e) => this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
                saveCanvas={Canvas.saveCanvas}
                clearCanvas={Canvas.clearCanvas}
                postNote={Canvas.postNote}
                getNotes={Canvas.getNotes}
            />
        );
    }
}
export default Canvas;
