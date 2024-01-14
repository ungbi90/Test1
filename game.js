// 게임 상태
let player = { x: 50, y: 50, width: 20, height: 20, color: "#00FF00" };
let enemies = [];
let bullets = [];

// 적 생성
function createEnemy() {
    let enemy = { x: Math.random() * 500, y: 0, width: 20, height: 20, color: "#FF0000" };
    enemies.push(enemy);
}

// 총알 생성
function createBullet() {
    let bullet = { x: player.x, y: player.y, width: 5, height: 5, color: "#0000FF" };
    bullets.push(bullet);
}

// 게임 로직
function updateGame() {
    // 플레이어 이동
    if (keyPressed['ArrowLeft']) player.x -= 5;
    if (keyPressed['ArrowRight']) player.x += 5;

    // 적 이동
    for (let enemy of enemies) {
        enemy.y += 1;
    }

    // 총알 이동
    for (let bullet of bullets) {
        bullet.y -= 5;
    }

    // 충돌 감지
    for (let i = 0; i < enemies.length; i++) {
        for (let j = 0; j < bullets.length; j++) {
            if (checkCollision(enemies[i], bullets[j])) {
                enemies.splice(i, 1);
                bullets.splice(j, 1);
                break;
            }
        }
    }
}

// 충돌 감지 함수
function checkCollision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}

// 게임 루프
function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

// 게임 시작
gameLoop();
setInterval(createEnemy, 1000);
window.addEventListener('keydown', (e) => { keyPressed[e.code] = true; });
window.addEventListener('keyup', (e) => { keyPressed[e.code] = false; });
window.addEventListener('click', createBullet);
