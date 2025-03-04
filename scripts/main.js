document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded and DOM content fully loaded');
    const canvas = document.getElementById('gameCanvas');
    console.log('Canvas:', canvas);
    const ctx = canvas.getContext('2d');
    console.log('Context:', ctx);
    const playButton = document.getElementById('playButton');
    console.log('Play Button:', playButton);
    const instructionsButton = document.getElementById('instructionsButton');
    console.log('Instructions Button:', instructionsButton);
    const creditsButton = document.getElementById('creditsButton');
    console.log('Credits Button:', creditsButton);
    const restartButton = document.getElementById('restartButton');
    console.log('Restart Button:', restartButton);

    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.6;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Game variables
    const paddleWidth = 10;
    const paddleHeight = 100;
    const ballSize = 10;
    let player1Y = (canvas.height - paddleHeight) / 2;
    let player2Y = (canvas.height - paddleHeight) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = 5;
    let ballSpeedY = 5;
    let player1Score = 0;
    let player2Score = 0;
    let gameOver = false;

    // Event listeners for buttons
    playButton.addEventListener('click', () => {
        console.log('Play button clicked');
        startGame();
    });
    instructionsButton.addEventListener('click', () => {
        console.log('Instructions button clicked');
        showInstructions();
    });
    creditsButton.addEventListener('click', () => {
        console.log('Credits button clicked');
        showCredits();
    });
    restartButton.addEventListener('click', () => {
        console.log('Restart button clicked');
        startGame();
    });

    // Paddle controls
    document.addEventListener('keydown', (e) => {
        if (gameOver) return;
        switch (e.key) {
            case 'w':
                player1Y = Math.max(player1Y - 20, 0);
                break;
            case 's':
                player1Y = Math.min(player1Y + 20, canvas.height - paddleHeight);
                break;
            case 'ArrowUp':
                player2Y = Math.max(player2Y - 20, 0);
                break;
            case 'ArrowDown':
                player2Y = Math.min(player2Y + 20, canvas.height - paddleHeight);
                break;
        }
    });

    function startGame() {
        // Initialize game
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 5;
        ballSpeedY = 5;
        player1Score = 0;
        player2Score = 0;
        gameOver = false;
        document.getElementById('menu').style.display = 'none';
        document.getElementById('gameOverScreen').style.display = 'none';
        requestAnimationFrame(gameLoop);
    }

    function showInstructions() {
        alert('Use W/S and Arrow Up/Down to control the paddles.');
    }

    function showCredits() {
        alert('RAFAPONG created by Rafael Castro.');
    }

    function endGame() {
        gameOver = true;
        document.getElementById('gameOverScreen').style.display = 'flex';
    }

    // Game loop
    function gameLoop() {
        if (gameOver) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw paddles
        ctx.fillStyle = 'white';
        ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
        ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);

        // Draw ball
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
        ctx.fill();

        // Move ball
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Ball collision with top and bottom walls
        if (ballY <= 0 || ballY >= canvas.height) {
            ballSpeedY = -ballSpeedY;
        }

        // Ball collision with paddles
        if (ballX <= paddleWidth && ballY >= player1Y && ballY <= player1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        }
        if (ballX >= canvas.width - paddleWidth && ballY >= player2Y && ballY <= player2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        }

        // Ball out of bounds
        if (ballX <= 0) {
            player2Score++;
            if (player2Score >= 10) {
                endGame();
            } else {
                ballX = canvas.width / 2;
                ballY = canvas.height / 2;
            }
        }
        if (ballX >= canvas.width) {
            player1Score++;
            if (player1Score >= 10) {
                endGame();
            } else {
                ballX = canvas.width / 2;
                ballY = canvas.height / 2;
            }
        }

        // Display scores
        ctx.font = '20px Arial';
        ctx.fillText(`Player 1: ${player1Score}`, 20, 20);
        ctx.fillText(`Player 2: ${player2Score}`, canvas.width - 120, 20);

        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();
});