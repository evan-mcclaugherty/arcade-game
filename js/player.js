let Player = function () {
    let sprite = 'images/char-boy.png',
        x = 202,
        y = 405,
        getX = function () {
            return x;
        },
        getY = function () {
            return y;
        },

        resetPosition = function () {
            x = 202;
            y = 405;
        },
        update = function (newX, newY) {
            if (x + newX >= 0 && x + newX <= 404) {
                x += newX;
            }
            if (y + newY >= -10 && y + newY <= 405) {
                y += newY;
            }
            render();
        },
        render = function () {
            Engine.ctx.drawImage(Resources.get(sprite), x, y);
        },
        handleInput = function (input) {
            if (input === 'left') {
                update(-101, 0);
            } else if (input === 'right') {
                update(101, 0);
            } else if (input === 'up') {
                update(0, -83);
            } else if (input === 'down') {
                update(0, 83);
            }
        };
    return Object.freeze({
        update,
        render,
        handleInput,
        getX,
        getY,
        resetPosition
    })
};
