import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, CarFront } from 'lucide-react';

export default function RacingGame() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('START');
  const [score, setScore] = useState(0);
  const gameRef = useRef({
    carX: 175,
    carY: 500,
    obstacles: [],
    frameId: null,
    lastTime: 0,
    speed: 6,
    keys: {},
    isPlaying: false
  });

  const startGame = () => {
    gameRef.current.isPlaying = true;
    setGameState('PLAYING');
    setScore(0);
    gameRef.current.carX = 175;
    gameRef.current.carY = 500;
    gameRef.current.obstacles = [];
    gameRef.current.speed = 6;
    gameRef.current.lastTime = performance.now();
    
    if (gameRef.current.frameId) cancelAnimationFrame(gameRef.current.frameId);
    gameRef.current.frameId = requestAnimationFrame(update);
  };

  const update = (time) => {
    if (!gameRef.current.isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Realistic Asphalt Background
    ctx.fillStyle = '#2d2d2d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle road texture (noise-like)
    for(let i=0; i<30; i++) {
        ctx.fillStyle = 'rgba(255,255,255,0.02)';
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }

    // Road Markings (Animated Center Dashed Line)
    ctx.strokeStyle = '#ffffff';
    ctx.setLineDash([30, 40]);
    ctx.lineDashOffset = -(time * 0.3) % 70;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Side lines (Solid Yellow)
    ctx.setLineDash([]);
    ctx.strokeStyle = '#eab308'; // Yellow
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(10, canvas.height);
    ctx.moveTo(canvas.width - 10, 0);
    ctx.lineTo(canvas.width - 10, canvas.height);
    ctx.stroke();

    // Controls
    if (gameRef.current.keys['a'] || gameRef.current.keys['ArrowLeft']) gameRef.current.carX -= 7;
    if (gameRef.current.keys['d'] || gameRef.current.keys['ArrowRight']) gameRef.current.carX += 7;

    // Boundary Lock
    if (gameRef.current.carX < 20) gameRef.current.carX = 20;
    if (gameRef.current.carX > canvas.width - 70) gameRef.current.carX = canvas.width - 70;

    // Draw Player Car (Silver/Grey)
    drawRealisticCar(ctx, gameRef.current.carX, gameRef.current.carY, '#94a3b8');

    // Obstacle Logic
    if (Math.random() < 0.02 + (score / 40000)) {
      const colors = ['#dc2626', '#1d4ed8', '#16a34a', '#000000', '#f59e0b']; // Realistic car colors
      gameRef.current.obstacles.push({
        x: Math.random() * (canvas.width - 100) + 50,
        y: -150,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    for (let i = gameRef.current.obstacles.length - 1; i >= 0; i--) {
      const obs = gameRef.current.obstacles[i];
      obs.y += gameRef.current.speed;
      
      drawRealisticCar(ctx, obs.x, obs.y, obs.color);

      // Collision Detection
      if (
        obs.x < gameRef.current.carX + 45 &&
        obs.x + 45 > gameRef.current.carX &&
        obs.y < gameRef.current.carY + 80 &&
        obs.y + 80 > gameRef.current.carY
      ) {
        gameRef.current.isPlaying = false;
        setGameState('GAMEOVER');
        return;
      }

      if (obs.y > canvas.height) {
        gameRef.current.obstacles.splice(i, 1);
        setScore(s => s + 100);
        gameRef.current.speed += 0.03;
      }
    }

    gameRef.current.frameId = requestAnimationFrame(update);
  };

  const drawRealisticCar = (ctx, x, y, color) => {
    ctx.save();
    ctx.translate(x, y);
    
    // Tires
    ctx.fillStyle = '#111111';
    ctx.fillRect(-6, 12, 10, 20); // Front Left
    ctx.fillRect(46, 12, 10, 20); // Front Right
    ctx.fillRect(-6, 60, 10, 22); // Rear Left
    ctx.fillRect(46, 60, 10, 22); // Rear Right

    // Main Body
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(0, 0, 50, 90, 8); // Curved rectangle
    ctx.fill();

    // Windshield (Dark tint)
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(5, 25, 40, 15, 3);
    ctx.fill();
    
    // Rear window
    ctx.beginPath();
    ctx.roundRect(10, 70, 30, 10, 2);
    ctx.fill();

    // Headlights
    ctx.fillStyle = '#fef08a'; // Yellowish white
    ctx.fillRect(5, 2, 8, 4);
    ctx.fillRect(37, 2, 8, 4);
    
    // Taillights
    ctx.fillStyle = '#ef4444'; // Red
    ctx.fillRect(5, 86, 10, 4);
    ctx.fillRect(35, 86, 10, 4);

    ctx.restore();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      gameRef.current.keys[e.key] = true;
      if (e.code === 'Space' && !gameRef.current.isPlaying) {
        setTimeout(() => {
            startGame();
        }, 100);
      }
    };
    const handleKeyUp = (e) => (gameRef.current.keys[e.key] = false);
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameRef.current.frameId) cancelAnimationFrame(gameRef.current.frameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-[400px] h-[600px] border-[6px] border-slate-300 dark:border-slate-700 rounded-3xl overflow-hidden shadow-2xl bg-slate-900 mx-auto transition-colors duration-300">
      <canvas ref={canvasRef} width={400} height={600} className="w-full h-full block" />
      
      {gameState === 'START' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm p-8 text-center z-20">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <CarFront className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Highway Drive</h3>
          <p className="text-sm text-slate-300 mb-8 font-medium">Use Left/Right arrows or A/D to steer</p>
          <button 
            onClick={startGame}
            className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <Play className="w-5 h-5" /> Start Driving
          </button>
        </div>
      )}

      {gameState === 'GAMEOVER' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 p-8 text-center z-20">
          <h3 className="text-3xl font-bold text-red-500 mb-2">Crash!</h3>
          <p className="text-xl font-medium text-white mb-8">Score: {score}</p>
          <button 
            onClick={startGame}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" /> Play Again
          </button>
          <p className="mt-6 text-xs text-slate-400 font-medium">Press SPACE to restart</p>
        </div>
      )}

      <div className="absolute top-4 left-4 bg-slate-900/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700 z-10">
        <span className="text-lg font-bold text-white tabular-nums tracking-widest">{score.toString().padStart(5, '0')}</span>
      </div>
    </div>
  );
}

