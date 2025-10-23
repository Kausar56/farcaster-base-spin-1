import React, { useEffect, useRef, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { Wallet, Trophy, Coins, Play, Pause, RotateCcw } from "lucide-react";

// Types
interface GameState {
  score: number;
  lives: number;
  level: number;
  isPlaying: boolean;
  isPaused: boolean;
  gameOver: boolean;
}

// Mock MON token contract ABI
const MON_TOKEN_ABI = [
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const MonadArcadeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    level: 1,
    isPlaying: false,
    isPaused: false,
    gameOver: false,
  });

  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  // Game variables
  const gameVars = useRef({
    player: { x: 200, y: 250, width: 20, height: 15 },
    enemies: [] as Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      vx: number;
    }>,
    bullets: [] as Array<{
      x: number;
      y: number;
      width: number;
      height: number;
    }>,
    enemyBullets: [] as Array<{
      x: number;
      y: number;
      width: number;
      height: number;
    }>,
    stars: [] as Array<{ x: number; y: number }>,
    keys: {} as Record<string, boolean>,
    lastEnemyShot: 0,
    lastPlayerShot: 0,
  });

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    // Initialize stars
    gameVars.current.stars = [];
    for (let i = 0; i < 50; i++) {
      gameVars.current.stars.push({
        x: Math.random() * 400,
        y: Math.random() * 300,
      });
    }

    // Initialize enemies
    const createEnemies = () => {
      gameVars.current.enemies = [];
      const rows = 3 + gameState.level;
      const cols = 6;
      for (let row = 0; row < Math.min(rows, 5); row++) {
        for (let col = 0; col < cols; col++) {
          gameVars.current.enemies.push({
            x: 60 + col * 50,
            y: 30 + row * 25,
            width: 18,
            height: 12,
            vx: (Math.random() > 0.5 ? 1 : -1) * (50 + gameState.level * 10),
          });
        }
      }
    };

    createEnemies();

    // Event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      gameVars.current.keys[e.code] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      gameVars.current.keys[e.code] = false;
    };

    const handleCanvasClick = () => {
      if (gameState.isPlaying && !gameState.isPaused) {
        const now = Date.now();
        if (now - gameVars.current.lastPlayerShot > 200) {
          gameVars.current.bullets.push({
            x: gameVars.current.player.x,
            y: gameVars.current.player.y - 10,
            width: 3,
            height: 6,
          });
          gameVars.current.lastPlayerShot = now;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("click", handleCanvasClick);

    // Game loop
    const gameLoop = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear screen
      ctx.fillStyle = "#000011";
      ctx.fillRect(0, 0, 400, 300);

      // Draw stars
      ctx.fillStyle = "#ffffff";
      gameVars.current.stars.forEach((star) => {
        ctx.fillRect(star.x, star.y, 1, 1);
        star.y += 0.5;
        if (star.y > 300) {
          star.y = 0;
          star.x = Math.random() * 400;
        }
      });

      if (gameState.isPlaying && !gameState.isPaused && !gameState.gameOver) {
        const now = Date.now();

        // Player movement
        const player = gameVars.current.player;
        if (
          gameVars.current.keys["ArrowLeft"] ||
          gameVars.current.keys["KeyA"]
        ) {
          player.x = Math.max(10, player.x - 3);
        }
        if (
          gameVars.current.keys["ArrowRight"] ||
          gameVars.current.keys["KeyD"]
        ) {
          player.x = Math.min(390, player.x + 3);
        }
        if (gameVars.current.keys["ArrowUp"] || gameVars.current.keys["KeyW"]) {
          player.y = Math.max(10, player.y - 3);
        }
        if (
          gameVars.current.keys["ArrowDown"] ||
          gameVars.current.keys["KeyS"]
        ) {
          player.y = Math.min(290, player.y + 3);
        }

        // Player shooting
        if (gameVars.current.keys["Space"]) {
          if (now - gameVars.current.lastPlayerShot > 200) {
            gameVars.current.bullets.push({
              x: player.x,
              y: player.y - 10,
              width: 3,
              height: 6,
            });
            gameVars.current.lastPlayerShot = now;
          }
        }

        // Update bullets
        gameVars.current.bullets = gameVars.current.bullets.filter((bullet) => {
          bullet.y -= 5;
          return bullet.y > 0;
        });

        // Update enemy bullets
        gameVars.current.enemyBullets = gameVars.current.enemyBullets.filter(
          (bullet) => {
            bullet.y += 3;
            return bullet.y < 300;
          }
        );

        // Update enemies
        gameVars.current.enemies.forEach((enemy) => {
          enemy.x += enemy.vx * 0.016;
          if (enemy.x <= 0 || enemy.x >= 380) {
            enemy.vx *= -1;
          }
        });

        // Enemy shooting
        if (
          now - gameVars.current.lastEnemyShot > 1500 &&
          gameVars.current.enemies.length > 0
        ) {
          const enemy =
            gameVars.current.enemies[
              Math.floor(Math.random() * gameVars.current.enemies.length)
            ];
          gameVars.current.enemyBullets.push({
            x: enemy.x + enemy.width / 2,
            y: enemy.y + enemy.height,
            width: 3,
            height: 6,
          });
          gameVars.current.lastEnemyShot = now;
        }

        // Collision: bullets vs enemies
        gameVars.current.bullets.forEach((bullet, bIndex) => {
          gameVars.current.enemies.forEach((enemy, eIndex) => {
            if (
              bullet.x < enemy.x + enemy.width &&
              bullet.x + bullet.width > enemy.x &&
              bullet.y < enemy.y + enemy.height &&
              bullet.y + bullet.height > enemy.y
            ) {
              gameVars.current.bullets.splice(bIndex, 1);
              gameVars.current.enemies.splice(eIndex, 1);
              setGameState((prev) => ({ ...prev, score: prev.score + 10 }));
            }
          });
        });

        // Collision: player vs enemies
        gameVars.current.enemies.forEach((enemy, index) => {
          if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
          ) {
            gameVars.current.enemies.splice(index, 1);
            setGameState((prev) => {
              const newLives = prev.lives - 1;
              return {
                ...prev,
                lives: newLives,
                gameOver: newLives <= 0,
                isPlaying: newLives > 0,
              };
            });
          }
        });

        // Collision: player vs enemy bullets
        gameVars.current.enemyBullets.forEach((bullet, index) => {
          if (
            player.x < bullet.x + bullet.width &&
            player.x + player.width > bullet.x &&
            player.y < bullet.y + bullet.height &&
            player.y + player.height > bullet.y
          ) {
            gameVars.current.enemyBullets.splice(index, 1);
            setGameState((prev) => {
              const newLives = prev.lives - 1;
              return {
                ...prev,
                lives: newLives,
                gameOver: newLives <= 0,
                isPlaying: newLives > 0,
              };
            });
          }
        });

        // Next level
        if (gameVars.current.enemies.length === 0) {
          setGameState((prev) => ({ ...prev, level: prev.level + 1 }));
          createEnemies();
        }
      }

      // Draw player
      ctx.fillStyle = "#00ff00";
      ctx.fillRect(
        gameVars.current.player.x - gameVars.current.player.width / 2,
        gameVars.current.player.y - gameVars.current.player.height / 2,
        gameVars.current.player.width,
        gameVars.current.player.height
      );

      // Draw enemies
      ctx.fillStyle = "#ff0000";
      gameVars.current.enemies.forEach((enemy) => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      });

      // Draw bullets
      ctx.fillStyle = "#ffff00";
      gameVars.current.bullets.forEach((bullet) => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      });

      // Draw enemy bullets
      ctx.fillStyle = "#ff8800";
      gameVars.current.enemyBullets.forEach((bullet) => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      });

      // Draw UI
      ctx.fillStyle = "#ffffff";
      ctx.font = "14px Arial";
      ctx.fillText(`Score: ${gameState.score}`, 8, 20);
      ctx.fillText(`Lives: ${gameState.lives}`, 8, 36);
      ctx.fillText(`Level: ${gameState.level}`, 8, 52);

      // Show start message
      if (!gameState.isPlaying && !gameState.gameOver) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Click START to Play!", 200, 150);
        ctx.textAlign = "left";
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("click", handleCanvasClick);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [
    gameState.isPlaying,
    gameState.isPaused,
    gameState.level,
    gameState.score,
    gameState.lives,
    gameState.gameOver,
  ]);

  const startGame = () => {
    // Reset player position
    gameVars.current.player = { x: 200, y: 250, width: 20, height: 15 };
    // Clear bullets
    gameVars.current.bullets = [];
    gameVars.current.enemyBullets = [];
    // Reset keys
    gameVars.current.keys = {};

    setGameState({
      score: 0,
      lives: 3,
      level: 1,
      isPlaying: true,
      isPaused: false,
      gameOver: false,
    });
  };

  const pauseGame = () => {
    setGameState((prev) => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  };

  const resetGame = () => {
    // Reset player position
    gameVars.current.player = { x: 200, y: 250, width: 20, height: 15 };
    // Clear bullets
    gameVars.current.bullets = [];
    gameVars.current.enemyBullets = [];
    // Reset keys
    gameVars.current.keys = {};

    setGameState({
      score: 0,
      lives: 3,
      level: 1,
      isPlaying: false,
      isPaused: false,
      gameOver: false,
    });
  };

  const claimReward = async () => {
    if (!isConnected || !address) return;

    const rewardAmount = BigInt(gameState.score * 10);

    try {
      writeContract({
        address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
        abi: MON_TOKEN_ABI,
        functionName: "mint",
        args: [address, rewardAmount],
      });
    } catch (error) {
      console.error("Failed to claim reward:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white">
      <div className="container mx-auto px-2 py-4 max-w-md">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            🚀 MONAD ARCADE
          </h1>
          <p className="text-sm text-gray-300">Destroy enemies, earn MON!</p>
        </div>

        {/* Wallet Connection */}
        <div className="flex justify-center items-center mb-4">
          {!isConnected ? (
            <button
              onClick={() => connect({ connector: injected() })}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded text-sm font-semibold transition-all"
            >
              <Wallet size={16} />
              Connect
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-center">
                <p className="text-xs text-gray-400">Connected</p>
                <p className="font-mono text-xs">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
              </div>
              <button
                onClick={() => disconnect()}
                className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition-all"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-black/50 backdrop-blur border border-purple-500/30 rounded p-2 text-center">
            <Trophy className="mx-auto mb-1 text-yellow-400" size={16} />
            <p className="text-xs text-gray-400">Score</p>
            <p className="text-sm font-bold">
              {gameState.score.toLocaleString()}
            </p>
          </div>
          <div className="bg-black/50 backdrop-blur border border-purple-500/30 rounded p-2 text-center">
            <div className="mx-auto mb-1 text-red-400 text-sm">❤️</div>
            <p className="text-xs text-gray-400">Lives</p>
            <p className="text-sm font-bold">{gameState.lives}</p>
          </div>
          <div className="bg-black/50 backdrop-blur border border-purple-500/30 rounded p-2 text-center">
            <div className="mx-auto mb-1 text-blue-400 text-sm">🎯</div>
            <p className="text-xs text-gray-400">Level</p>
            <p className="text-sm font-bold">{gameState.level}</p>
          </div>
          <div className="bg-black/50 backdrop-blur border border-purple-500/30 rounded p-2 text-center">
            <Coins className="mx-auto mb-1 text-green-400" size={16} />
            <p className="text-xs text-gray-400">MON</p>
            <p className="text-sm font-bold">{gameState.score * 10}</p>
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center gap-2 mb-4">
          {!gameState.isPlaying || gameState.gameOver ? (
            <button
              onClick={startGame}
              className="flex items-center gap-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-4 py-2 rounded text-sm font-semibold transition-all"
            >
              <Play size={16} />
              {gameState.gameOver ? "Play Again" : "Start"}
            </button>
          ) : (
            <button
              onClick={pauseGame}
              className="flex items-center gap-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-4 py-2 rounded text-sm font-semibold transition-all"
            >
              <Pause size={16} />
              {gameState.isPaused ? "Resume" : "Pause"}
            </button>
          )}

          <button
            onClick={resetGame}
            className="flex items-center gap-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 px-4 py-2 rounded text-sm font-semibold transition-all"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          {gameState.gameOver && gameState.score > 0 && isConnected && (
            <button
              onClick={claimReward}
              disabled={isConfirming}
              className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 px-4 py-2 rounded text-sm font-semibold transition-all"
            >
              <Coins size={16} />
              {isConfirming ? "Claiming..." : "Claim"}
            </button>
          )}
        </div>

        {/* Game Canvas */}
        <div className="flex justify-center mb-4">
          <div className="relative border-2 border-purple-500/30 rounded overflow-hidden bg-black/50 backdrop-blur">
            <canvas
              ref={canvasRef}
              className="block cursor-crosshair"
              style={{ maxWidth: "100%", height: "auto" }}
            />

            {gameState.isPaused && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">PAUSED</h3>
                  <p className="text-gray-300 text-sm">
                    Click Resume to continue
                  </p>
                </div>
              </div>
            )}

            {gameState.gameOver && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2 text-red-400">
                    GAME OVER
                  </h3>
                  <p className="text-lg mb-1">
                    Score: {gameState.score.toLocaleString()}
                  </p>
                  <p className="text-gray-300 mb-2 text-sm">
                    Level: {gameState.level}
                  </p>
                  {isConnected && (
                    <p className="text-green-400 text-sm">
                      Earned: {gameState.score * 10} MON!
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-black/30 backdrop-blur border border-purple-500/30 rounded p-3">
          <h3 className="text-sm font-bold mb-2 text-purple-400">
            🎮 Controls
          </h3>
          <div className="text-xs text-gray-300 space-y-1">
            <p>• Arrow keys/WASD: Move ship</p>
            <p>• SPACE or Click: Shoot</p>
            <p>• Destroy all enemies to advance!</p>
            <p>• Connect wallet to claim MON rewards!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonadArcadeGame;
