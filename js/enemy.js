let Enemy = function () {
    let x = -101,
        y = Math.floor(Math.random() * 4) * 83 + 63,
        sprite = 'images/enemy-bug.png',
        speed = Math.random() * 350 + 100;
    getX = function () {
        return x;
    };
    getY = function () {
        return y;
    };
    update = function (dt) {
        if (x + speed * dt > 505) {
            x = -101;
            speed = Math.random() * 400 + 100;
            y = Math.floor(Math.random() * 4) * 83 + 63;
        }
        x += speed * dt;
        render();
    };
    render = function () {
        Engine.ctx.drawImage(Resources.get(sprite), x, y);
    };
    return Object.freeze({
        update,
        render,
        getX,
        getY
    })
};
