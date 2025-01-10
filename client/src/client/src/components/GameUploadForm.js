import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { api } from '../utils/api';

function GameUploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gameUrl, setGameUrl] = useState('');
  const [error, setError] = useState('');
    const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
        const token = localStorage.getItem("token")
      await api.post(
        '/games',
        { title, description, gameUrl },
          {
             headers: {
             Authorization: `Bearer ${token}`
             },
        }
      );
        history.push('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload game.');
    }
  };

  return (
    <form className="game-upload-form" onSubmit={handleSubmit}>
      <h2>Upload Your Game</h2>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="gameUrl">Game URL:</label>
        <input
          type="url"
          id="gameUrl"
          value={gameUrl}
          onChange={(e) => setGameUrl(e.target.value)}
          required
        />
      </div>
      <button type="submit">Upload Game</button>
        {error && <div className="error-message">{error}</div>}
    </form>
  );
}

export default GameUploadForm;
