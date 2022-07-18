class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - (width / 2)
        this.right = x + (width / 2)

        const infinity = 100000;
        this.top = -infinity;
        this.bottom = infinity;

        this.topLeft = { x: this.left, y: this.top };
        this.topRight = { x: this.right, y: this.top };
        this.bottomLeft = { x: this.left, y: this.bottom };
        this.bottomRight = { x: this.right, y: this.bottom };
        this.borders = [
            [this.topLeft, this.bottomLeft],
            [this.topRight, this.bottomRight],
        ];
    }

    getLaneCenter(index) {
        const laneWidth = this.width / this.laneCount;
        return this.left + laneWidth / 2 + laneWidth * Math.min(index, this.laneCount)
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        // for (let i = 0; i <= this.laneCount; i++) {
        //     const position = lerp(this.left, this.right, i / this.laneCount);
        //     ctx.beginPath();
        //     if (i > 0 && i < this.laneCount) {
        //         ctx.setLineDash([20, 20]);
        //     } else {
        //         ctx.setLineDash([]);
        //     }
        //     ctx.moveTo(position, this.top);
        //     ctx.lineTo(position, this.bottom);
        //     ctx.stroke();
        // }
        for (let i = 1; i < this.laneCount; i++) {
            const position = lerp(this.left, this.right, i / this.laneCount);
            ctx.beginPath();
            ctx.setLineDash([20, 20]);
            ctx.moveTo(position, this.top);
            ctx.lineTo(position, this.bottom);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.setLineDash([])
        this.borders.forEach(entry => {
            ctx.moveTo(entry[0].x, entry[0].y);
            ctx.lineTo(entry[1].x, entry[1].y);
            ctx.stroke();
        })
    }
}
