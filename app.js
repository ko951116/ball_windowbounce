import {
    Ball
} from './ball.js';

import {
    Block
} from "./block.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas); //캔버스를 body의 자식 요소로 집어 넣음

        addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        addEventListener("mousedown", this.mousedown.bind(this), false);
        this.mousedown(event);

        this.block = new Block(600, 30, 300, 300); //block 생성
        this.blocksmall = new Block(300, 20, 800, 100); //block 생성

        requestAnimationFrame(this.animate.bind(this));
    }

    mousedown(event) {
        this.mouse = {
            x: undefined,
            y: undefined
        };
        this.mouse.x = event.x;
        this.mouse.y = event.y;
        console.log(this.mouse);

        this.ball = new Ball( this.mouse, 40, 5); //ball 생성
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight *2;
        this.ctx.scale(2,2);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0,0, this.stageWidth, this.stageHeight); //이걸 해줘야 공 잔상이 안남음

        this.block.draw(this.ctx);
        this.blocksmall.draw(this.ctx);

        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.blocksmall);

    }
}

window.onload = () => {
    new App();
};