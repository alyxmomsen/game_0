/* // Конечно! Вот полный финальный код, который включает все предыдущие изменения:
document.onkeydown = (e) => {
    e
}
// javascript
class KeysManager {
    keys:{[key:string]:boolean};
    constructor() {
        this.keys = {};
        document.addEventListener('keydown', this.keyDownHandler.bind(this));
        document.addEventListener('keyup', this.keyUpHandler.bind(this));
    }

    

    keyDownHandler(event:KeyboardEvent) {
        this.keys[event.key] = true ;
    }

    keyUpHandler(event:KeyboardEvent) {
        this.keys[event.key] = false;
    }
}

class GameObject {
    isDestroyed:boolean ;
    constructor() {
        this.isDestroyed = false; // Флаг, указывающий на уничтожение объекта
    }

    update() {
        // Здесь можно добавить код для обновления объекта игры
    }

    destroy() {
        this.isDestroyed = true;
    }
}

class Enemy extends GameObject {

    constructor() {
        super();
        this.speed = 1; // Скорость передвижения врага
        this.position = { x: 0, y: 0 }; // Начальная позиция врага
        this.lastMoveTime = 0; // Последнее время передвижения врага
        this.health = 3; // Здоровье врага
    }

    update(currentTime) {
        super.update();
        if (currentTime - this.lastMoveTime >= 1000) {
            this.moveRandomly();
            this.lastMoveTime = currentTime;
        }
        // Здесь можно добавить код обновления врага
    }

    moveRandomly() {
        const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];

        if (randomDirection === 'ArrowUp') {
            this.position.y -= this.speed;
        } else if (randomDirection === 'ArrowDown') {
            this.position.y += this.speed;
        } else if (randomDirection === 'ArrowLeft') {
            this.position.x -= this.speed;
        } else if (randomDirection === 'ArrowRight') {
            this.position.x += this.speed;
        }
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.destroy();
        }
    }

    destroy() {
        // Освобождаем ресурсы или выполняем другие действия при уничтожении врага
    }
}

class Player extends GameObject {
    constructor() {
        super();
        this.speed = 1; // Скорость передвижения игрока
        this.position = { x: 0, y: 0 }; // Начальная позиция игрока
        this.lastMoveTime = 0; // Последнее время передвижения игрока
        this.fireRate = 500; // Частота выстрелов (в миллисекундах)
        this.canFire = true; // Может ли игрок произвести выстрел
        this.bullets = []; // Массив для хранения пуль, выпущенных игроком
        this.health = 10; // Здоровье игрока
    }

    update(currentTime) {
        super.update();
        if (currentTime - this.lastMoveTime >= 1000) {
            this.handleMovement();
            this.lastMoveTime = currentTime;
        }
        if (keysManager.keys[' ']) {
            this.fireBullet();
        }
        // Здесь можно добавить код обновления игрока
    }

    handleMoveme
nt() {
        if (keysManager.keys['ArrowUp']) {
            this.position.y -= this.speed;
        }
        if (keysManager.keys['ArrowDown']) {
            this.position.y += this.speed;
        }
        if (keysManager.keys['ArrowLeft']) {
            this.position.x -= this.speed;
        }
        if (keysManager.keys['ArrowRight']) {
            this.position.x += this.speed;
        }
    }

    fireBullet() {
        if (!this.canFire) {
            return;
        }

        const bullet = new Bullet(this.position.x, this.position.y);
        bullet.direction = { x: 1, y: 0 }; // Например, пуля движется вправо
        this.bullets.push(bullet); // Добавляем пулю в массив пуль игрока

        this.canFire = false;
        setTimeout(() => {
            this.canFire = true;
        }, this.fireRate);
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.destroy();
        }
    }

    destroy() {
        // Освобождение ресурсов или другие действия при уничтожении игрока
    }
}

class Bullet extends GameObject {
    constructor(x, y) {
        super();
        this.speed = 1; // Скорость передвижения пули
        this.position = { x, y }; // Позиция пули
        this.direction = { x: 0, y: 0 }; // Направление движения пули
        this.damage = 1; // Урон пули
        this.interval = 1000; // Интервал передвижения пули (в миллисекундах)
        this.lastMoveTime = 0; // Последнее время передвижения пули
    }

    update(currentTime) {
        super.update();

        if (currentTime - this.lastMoveTime >= this.interval) {
            this.move();
            this.lastMoveTime = currentTime;
        }
        // Здесь можно добавить код обновления пули
    }

    move() {
        this.position.x += this.direction.x * this.speed;
        this.position.y += this.direction.y * this.speed;
    }

    destroy() {
        // Освобождаем ресурсы или выполняем другие действия при уничтожении пули
    }
}

class Game {
    constructor() {
        this.player = new Player();
        this.enemies = Array.from({ length: 5 }, () => new Enemy());
        this.keysManager = new KeysManager();
    }

    update(currentTime) {
        this.player.update(currentTime);
        this.enemies.forEach(enemy => {
            enemy.update(currentTime);

            // Проверка на столкновение пуль игрока с врагами
            this.player.bullets.forEach(bullet => {
                if (this.checkCollision(bullet, enemy)) {
                    enemy.takeDamage(bullet.damage);
                    bullet.destroy();
                }
            });

            // Удаление "убитых" врагов
            this.enemies = this.enemies.filter(enemy => !enemy.isDestroyed);
        });
        // Здесь можно добавить код для обновления игры в целом

        this.player.bullets = this.player.bullets.filter(bullet => {
            // Отфильтровываем пули, оставляя только те, которые еще существуют
            return bu
llet.position.x >= 0 && bullet.position.x <= GAME_WIDTH &&
                bullet.position.y >= 0 && bullet.position.y <= GAME_HEIGHT;
        });
    }

    checkCollision(object1, object2) {
        // Здесь должна быть логика проверки столкновения между двумя объектами
        // Верните true, если столкновение произошло, иначе верните false
    }
}

const GAME_WIDTH = 800; // Ширина игрового поля
const GAME_HEIGHT = 600; // Высота игрового поля

const game = new Game();

function gameLoop(currentTime) {
    game.update(currentTime);
    // Здесь можно добавить код для отображения игры и обработки ввода

    requestAnimationFrame(gameLoop);
}

gameLoop(performance.now());


// Это полный финальный код, который включает все предыдущие изменения, такие как флаг `isDestroyed` для отслеживания удаления объектов и логика удаления "убитых" врагов из массива. Он также содержит все остальные части игрового движка, включая классы `KeysManager`, `GameObject`, `Enemy`, `Player`, `Bullet` и `Game`.

// Пожалуйста, дайте мне знать, если у вас возникнут дополнительные вопросы! */