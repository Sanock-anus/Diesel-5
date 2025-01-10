import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import { api } from '../utils/api'

function GameList({ user }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
        try{
          const response = await api.get('/games');
          setGames(response.data);
          console.log(response.data)
        } catch(error){
             console.log("Error fetching games:", error);
        }
    };
    fetchGames();
  }, []);

  return (
    <div className="game-list">
      {games.map((game) => (
        <GameCard key={game._id} game={game} />
      ))}
    </div>
  );
}

export default GameList;
