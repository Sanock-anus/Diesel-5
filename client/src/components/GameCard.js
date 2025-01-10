import React from 'react';

function GameCard({ game }) {
  return (
    <div className="game-card">
      <h3>{game.title}</h3>
      <p>{game.description}</p>
        <p>Author: {game.author?.username || 'Unknown'}</p>
      <a href={game.gameUrl} target="_blank" rel="noopener noreferrer">
        Play Game
      </a>
    </div>
  );
}

export default GameCard;
