class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - (width / 2)
        this.right = x + (width / 2)

        const infinity = 100000000;
        this.top = -infinity;
        this.bottom = infinity;
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        for (var i = 0; i <= this.laneCount; i++) {
            var position = lerp(this.left, this.right, i / this.laneCount);
            ctx.beginPath();
            ctx.moveTo(position, this.top);
            ctx.lineTo(position, this.bottom);
            ctx.stroke();
        }
    }
}
