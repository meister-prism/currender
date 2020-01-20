import * as React from 'react';
import { Memo as MemoComponent } from '../components/Memo';


interface State {
    drawing: boolean
}

class Canvas extends React.Component<{}, State> {
    static saveCanvas() {
        const canvas: any = document.getElementById('canvas');
        const a: any = document.getElementById('download');
        canvas.toBlob((blob: any) => {
            a.href = window.URL.createObjectURL(blob);
        });
    }

    static getContext2D() {
        const canvas : any = document.getElementById('canvas');
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        return ctx;
    }

    static clearCanvas() {
        const canvas: any = document.getElementById('canvas');
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    constructor(props: any) {
        super(props);
        this.state = {
            drawing: false,
        };
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
            />
        );
    }
}
export default Canvas;
