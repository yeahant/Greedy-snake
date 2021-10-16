var count = 0,snake = new snake(),food = new food(),timer,pause = false,direct = new Array(),n;

window.onload = function() {
    snake.display();
    food.display();
    document.onkeydown = function(event) {
        var code;
        if (window.event) {
            code = window.event.keyCode;
        } else {
            code = event.keyCode;
        }
        if (code === 80) {
            pause = !pause
            if(pause){
                clearTimeout(timer);
            } else {
                timer = setInterval('snake.move()', 100);
            }
            /**
             * 这里加上什么能让游戏暂停呢...?
             * What fuck?
             * The answer is your answer.
             */
        }
        snake.setKey(code);
    }
    timer = setInterval('snake.move()', 100);
}

function food() {
    var foodcell;
    this.x = null;
    this.y = null;
    this.display = function() {
        document.getElementById("count").innerHTML = count.toString();
        //随机生成食物
        this.x = Math.floor(Math.random() * 39);
        this.y = Math.floor(Math.random() * 29);
        foodcell = document.createElement("div");
        foodcell.style.width = 10 + "px";
        foodcell.style.height = 10 + "px";
        foodcell.style.backgroundColor = "#ffff00";
        foodcell.style.position = "absolute";
        foodcell.style.left = this.x * 10 + "px";
        foodcell.style.top = this.y * 10 + "px";
        document.getElementById("map").appendChild(foodcell);
        /**
         * 这里加上什么能使分数增加呢...?
         * I can't understand your code,
         * But that doesn't prevent me from copying yours.
         */
        count += 1;  //Lead to a bug in (alert => count)
        if(count>1 && count <9){
            clearInterval(timer);
            timer = setInterval('snake.move()', 100 - count*10);
        }

    }
}

function snake() {
    this.setKey = function(code) {
        switch (code) {
            case 37:
                this.direct = 'left';
                break;
            case 38:
                this.direct = 'top';
                break;
            case 39:
                this.direct = 'right';
                break;
            case 40:
                this.direct = 'bottom';
                break;
            /**
             * 这里加上什么能让小蛇受WASD控制呢?
             * I don't know Hotkey,
             * But I can baidu.
             */
            case 65: //A
                this.direct = 'left';
                break;
            case 68: //D
                this.direct = 'right';
                break;
            case 83: //S
                this.direct = 'bottom';
                break;
            case 87: //W
                this.direct = 'top';
                break;

            default:
                break;
        }
    }
    //随机生成地方以及方向
    this.x = Math.floor(Math.random() * 26);
    this.y = Math.floor(Math.random() * 20);
    this.body = [
        [this.x+8, this.y+5, '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)],
        [this.x+7, this.y+5, '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)],
        [this.x+6, this.y+5, '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)],
        [this.x+5, this.y+5, '#000000']
    ];
    direct = ['right','top','bottom']
    n = Math.floor(Math.random() * direct.length + 1)-1;
    this.direct = direct[n];  // Start with direction

    this.display = function() {
        for (var i = 0; i < this.body.length; i++) {
            var bodycell;
            bodycell = document.createElement("div");
            bodycell.style.width = 10 + "px";
            bodycell.style.height = 10 + "px";
            bodycell.style.backgroundColor = this.body[i][2];
            bodycell.style.position = "absolute";
            bodycell.style.left = this.body[i][0] * 10 + "px";
            bodycell.style.top = this.body[i][1] * 10 + "px";
            document.getElementById("map").appendChild(bodycell);
        }
    }
    this.move = function() {
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i][0] = this.body[i - 1][0];
            this.body[i][1] = this.body[i - 1][1];
        }
        switch (this.direct) {
            case 'left':
                this.body[0][0]--;
                break;
            case 'top':
                this.body[0][1]--;
                break;
            case 'right':
                this.body[0][0]++;
                break;
            case 'bottom':
                this.body[0][1]++;
                break;
        }
        if (this.body[0][0] === food.x && this.body[0][1] === food.y) {
            var x = this.body[this.body.length - 1][0];
            var y = this.body[this.body.length - 1][1];
            /**
             * 这里加上什么能让小蛇吃到食物后长度增加呢...?
             * Fuck you!!!
             * That's a crazy question,
             * It took me a long time to understand this array.
             * console.log(this.body) => Key to problem solving
             */
            this.body.push([x,y,'#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)])

            // Food disappear
            this.body[this.body.length - 1][2] = "#000000";
            this.body[this.body.length - 2][2] = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)];
            food.display();
        }
        if (this.body[0][0] === 40 || this.body[0][0] === -1 ||
            this.body[0][1] === -1 || this.body[0][1] === 30) {
            alert("Game Over，" + "积分：" + (count - 1));
            /**
             * 这里加上什么能让游戏重新开始呢...?
             */
            clearTimeout(timer);
            this.start();

        }
        //小蛇倒退游戏结束
        for (var i = 1; i < this.body.length - 1; i++) {
            if (this.body[0][0] === this.body[i][0] &&
                this.body[0][1] === this.body[i][1]) {
                alert("Game Over，" + "积分：" + (count - 1));
                /**
                 * 这里加上什么能让游戏重新开始呢...?
                 */
                clearTimeout(timer);
                this.start();


            }
        }
        this.display();
    };
    this.start = function (){
        document.getElementById("map").innerHTML = '';
        count = 0;
        this.body = [
            [this.x+8, this.y+5, '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)],
            [this.x+7, this.y+5, '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)],
            [this.x+6, this.y+5, '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)],
            [this.x+5, this.y+5, '#000000']
        ];
        direct = ['bottom','top','right','top','bottom'];
        n = Math.floor(Math.random() * direct.length + 1)-1;
        this.direct = direct[n];  // Start with direction
        snake.display();
        food.display();
        timer = setInterval('snake.move()', 100);
    }
}
