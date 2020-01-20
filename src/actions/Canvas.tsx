import React from 'react';

const style = {
    border: '1px solid gray',
    backgroundColor: 'white',
    width: '500px',
    height: '500px',
};

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
            <>
                <canvas
                    id="canvas"
                    onMouseDown={(e) => this.startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
                    onMouseUp={() => this.endDrawing()}
                    onMouseLeave={() => this.endDrawing()}
                    onMouseMove={(e) => this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
                    style={style}
                />
                <p>
                    <a onClick={this.saveCanvas} id="download" download="sample.jpg">
                        save
                    </a>
                    <button onClick={this.clearCanvas} type="button">clear</button>
                </p>
            </>
        );
    }
}
export default Canvas;
