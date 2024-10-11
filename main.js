// main.js

'use strict';


// Плеер plyr
const audioPlayer = new Plyr('#audioPlyr', {captions: {active: true}});
const videoPlayer = new Plyr('#videoPlyr', {captions: {active: true}});

window.audioPlayer = audioPlayer;
window.videoPlayer = videoPlayer;


// Графика и Анимация
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Массив для кружков
const bubbles = [];
const numBubbles = 10; // Количество кружков

// Массив цветов
const colors = [
    'rgba(255, 99, 132, 0.7)',  // Розовый
    'rgba(54, 162, 235, 0.7)',  // Голубой
    'rgba(255, 206, 86, 0.7)',  // Желтый
    'rgba(75, 192, 192, 0.7)',  // Бирюзовый
    'rgba(153, 102, 255, 0.7)',  // Фиолетовый
    'rgba(255, 159, 64, 0.7)',  // Оранжевый
    'rgba(255, 99, 132, 0.7)',  // Красный
    'rgba(255, 205, 86, 0.7)',  // Светло-желтый
    'rgba(75, 192, 192, 0.7)',  // Светло-бирюзовый
    'rgba(153, 102, 255, 0.7)'  // Светло-фиолетовый
];

// Функция для создания кружков
function createBubbles() {
    for (let i = 0; i < numBubbles; i++) {
        const radius = Math.random() * 15 + 10;  // Случайный радиус
        const x = Math.random() * (canvas.width - radius * 2) + radius;  // Случайная позиция X
        const y = Math.random() * (canvas.height - radius * 2) + radius;  // Случайная позиция Y
        const dx = (Math.random() - 0.5) * 2;  // Случайное изменение X
        const dy = (Math.random() - 0.5) * 2;  // Случайное изменение Y
        const color = colors[Math.floor(Math.random() * colors.length)];  // Случайный цвет

        bubbles.push({ x, y, radius, dx, dy, color });  // Добавляем цвет к кружку
    }
}

// Функция для отрисовки кружков
function drawBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Очищаем канвас

    for (const bubble of bubbles) {
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);  // Рисуем круг
        ctx.fillStyle = bubble.color;  // Используем цвет кружка
        ctx.fill();
        ctx.closePath();

        // Обновляем позиции кружков
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;

        // Отскакивание от краёв
        if (bubble.x + bubble.radius > canvas.width || bubble.x - bubble.radius < 0) {
            bubble.dx *= -1;  // Изменяем направление по X
        }
        if (bubble.y + bubble.radius > canvas.height || bubble.y - bubble.radius < 0) {
            bubble.dy *= -1;  // Изменяем направление по Y
        }
    }
}

// Запускаем анимацию
function animate() {
    drawBubbles();
    requestAnimationFrame(animate);  // Запускаем следующую итерацию анимации
}

createBubbles();  // Создаём кружки
animate();  // Запускаем анимацию


// Работа с Изображениями
const imageLoader = document.getElementById('imageLoader');
const imageCanvas = document.getElementById('imageCanvas');
const ctxImg = imageCanvas.getContext('2d');

imageLoader.addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            ctxImg.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});

document.getElementById('saveButton').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = imageCanvas.toDataURL('image/png');
    link.click();
});
