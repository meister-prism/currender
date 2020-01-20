import * as React from 'react';
import { Memo as MemoComponent } from '../components/Memo';


interface State {
    drawing: boolean
}

class Canvas extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            drawing: false,
        };
    }

    getContext2D() {
        const canvas : any = document.getElementById('canvas');
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        return ctx;
    }

    endDrawing() {
        this.setState({ drawing: false });
    }

    draw(x: number, y: number) {
        if (!this.state.drawing) {
            return;
        }
        const ctx = this.getContext2D();
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    startDrawing(x: number, y: number) {
        this.setState({ drawing: true });
        const ctx = this.getContext2D();
        // const canvas: any = document.getElementById('canvas');
        // const ctx = canvas.getContext('2d');
        ctx.moveTo(x, y);
    }

    saveCanvas() {
        const canvas: any = document.getElementById('canvas');
        const a: any = document.getElementById('download');
        canvas.toBlob((blob: any) => {
            a.href = window.URL.createObjectURL(blob);
        });
    }

    clearCanvas() {
        const canvas: any = document.getElementById('canvas');
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    render() {
        return (
            <MemoComponent
                onMouseDown={(e) => this.startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
                onMouseUp={() => this.endDrawing()}
                onMouseLeave={() => this.endDrawing()}
                onMouseMove={(e) => this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
                saveCanvas={this.saveCanvas}
                clearCanvas={this.clearCanvas}
            />
        );
    }
}
export default Canvas;
