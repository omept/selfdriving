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
    }

    getLaneCenter(index) {
        const laneWidth = this.width / this.laneCount;
        return this.left + laneWidth / 2 + laneWidth * Math.min(index, this.laneCount)
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for (let i = 0; i <= this.laneCount; i++) {
            const position = lerp(this.left, this.right, i / this.laneCount);
            ctx.beginPath();
            if (i > 0 && i < this.laneCount) {
                ctx.setLineDash([20, 20]);
            } else {
                ctx.setLineDash([]);
            }
            ctx.moveTo(position, this.top);
            ctx.lineTo(position, this.bottom);
            ctx.stroke();
        }
    }
}
