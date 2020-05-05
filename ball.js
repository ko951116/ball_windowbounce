export class Ball {
    constructor(mouse, radius, speed) {
        this.x = mouse.x;
        this.y = mouse.y;
        this.radius = radius;
        this.vx = speed;
        this.vy = speed;

        console.log(this.x, this.y);
    }

    draw(ctx, stageWidth, stageHeight, block) {
        this.x += this.vx;
        this.y += this.vy;

        this.bounceWindow(stageWidth, stageHeight);

        this.bounceBlock(block);

        ctx.fillStyle = '#fdd700';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    bounceWindow(stageWidth, stageHeight) { //스테이지에 닿았는지 확인하는 함수
        const minX = this.radius;
        const maxX = stageWidth - this.radius;
        const minY = this.radius;
        const maxY = stageHeight - this.radius;

        if (this.x <= minX || this.x >= maxX) {
            this.vx *= (-1);
            this.x += this.vx;
        } else if (this.y <= minY || this.y >= maxY) {
            this.vy *= (-1);
            this.y += this.vy;
        }
    }

    bounceBlock(block) {
        const minX = block.x - this.radius;
        const maxX = block.maxX + this.radius;
        const minY = block.y - this.radius;
        const maxY = block.maxY + this.radius;

        if(this.x > minX && this.x < maxX && this.y >minY && this.y < maxY) {
            const x1 = Math.abs(minX - this.x);
            const x2 = Math.abs(maxX - this.x);
            const y1 = Math.abs(minY - this.y);
            const y2 = Math.abs(maxY - this.y);
            const min1 = Math.min(x1, x2);
            const min2 = Math.min(y1, y2);
            const min = Math.min(min1, min2);

            if(min === min1) {
                this.vx *= (-1);
            } else if(min === min2) {
                this.vy *= (-1);
            }
        }
    }
}