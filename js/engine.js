let Engine = (function () {
    let player = Player(),
        allEnemies = [Enemy(), Enemy(), Enemy(), Enemy(), Enemy(), Enemy(), Enemy()],
        doc = document,
        win = this,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    document.addEventListener('keyup', function (e) {
        let allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        player.handleInput(allowedKeys[e.keyCode]);
    });

    main = function () {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        update(dt);
        render();
        lastTime = now;
        win.requestAnimationFrame(main);
    }

    init = function () {
        reset();
        lastTime = Date.now();
        main();
    }

    update = function (dt) {
        updateEntities(dt);
        checkCollisions();
    }

    updateEntities = function (dt) {
        allEnemies.forEach(function (enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    checkCollisions = function () {
        allEnemies.forEach(function (enemy) {
            if (
                (enemy.getX() > player.getX() - 78 && enemy.getX() < player.getX() + 50) &&
                (player.getY() - 10 === enemy.getY())
            ) {
                died();
            } else if (player.getY() === -10) {
                won();
            }
        });
    }

    died = function () {
        alert("lost!");
        reset();
    }

    won = function () {
        alert("win!");
        reset();
    }

    render = function () {
        var rowImages = [
                'images/water-block.png', // Top row is water
                'images/stone-block.png', // Row 1 of 3 of stone
                'images/stone-block.png', // Row 2 of 3 of stone
                'images/stone-block.png', // Row 3 of 3 of stone
                'images/grass-block.png', // Row 1 of 2 of grass
                'images/grass-block.png' // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
    }

    renderEntities = function () {
        allEnemies.forEach(function (enemy) {
            enemy.render();
        });
        player.render();
    }

    reset = function () {
        player.resetPosition();
    }
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    return Object.freeze({
        ctx
    })
}());
