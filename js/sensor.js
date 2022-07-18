class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 30;
        this.rayLength = 100;
        this.raySpread = Math.PI / 2; // 45 degree

        this.rays = [];
        this.rayReadings = [];
        this.logs = new Logs();
    }

    update(rowBorders) {
        this.#castRays();

        // get ray readings from car to borders
        this.rayReadings = [];
        for (let i = 0; i < this.rays.length; i++) {
            this.rayReadings.push(
                this.#getIntersectionReadings(this.rays[i], rowBorders)
            );
        }
    }

    // getIntersectionReadings gets the nearest borders being touched by the drawn rays
    #getIntersectionReadings(ray, borders) {
        let touches = [];
        for (let i = 0; i < borders.length; i++) {
            const touch = getIntersection(
                ray[0],
                ray[1],
                borders[i][0],
                borders[i][1],
            );
            if (touch) {
                touches.push(touch);
            }
        }

        if (touches.length == 0) {
            return null;
        } else {
            const offsets = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(e => e.offset == minOffset);
        }
    }

    #castRays() {
        this.rays = []
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                this.rayCount == 0 ? 0.5 : i / (this.rayCount - 1)
            ) + this.car.angle;
            const start = { x: this.car.x, y: this.car.y };
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            };
            this.rays.push([start, end]);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.rayCount; i++) {

            let end = this.rays[i][1];
            this.logs.write({ "i": i, "rays": this.rays[i] })

            // since rayReadings stop at the boarder of intersect, 
            //we'll use that to make the ray not exceed the border
            if (this.rayReadings[i]) {
                end = this.rayReadings[i];
            }
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y)
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            // visualise the rays that crosses a border
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y)
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

        }
    }
}