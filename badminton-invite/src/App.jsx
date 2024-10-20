// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import PlayerCard from './components/PlayerCard';

const App = () => {
  const constants = [
    { name: 'Mervin', skill: 'Professional', stars: 5 },
    { name: 'Dilip', skill: 'Professional', stars: 5 },
    { name: 'Akshay', skill: 'Advanced', stars: 5 },
  ];

  const allPlayers = [
    { name: 'Isha', skill: 'Advanced', stars: 4 },
    { name: 'Vikas', skill: 'Beginner', stars: 1 },
    { name: 'Prateek', skill: 'Intermediate', stars: 3 },
    { name: 'Pradyumna', skill: 'Intermediate', stars: 3 },
    { name: 'Dhravya', skill: 'Beginner', stars: 1 },
    { name: 'Gayan', skill: 'Advanced', stars: 4 },
    { name: 'Kevin', skill: 'Intermediate', stars: 3 },
    { name: 'Child', skill: 'undefined', stars: 0 },
    { name: 'Dheeraj', skill: 'Intermediate', stars: 3 },
    { name: 'Aneesha', skill: 'Beginner', stars: 1 },
    { name: 'Abhimanyu', skill: 'Intermediate', stars: 3 },
  ];

  const venueOptions = [
    { name: 'E-Relax (JP Nagar)', price: 300 },
    { name: 'V5 (Begur)', price: 300 },
    { name: 'Level Pro (Kudlu)', price: 350 },
    { name: 'Arena 100 (E-City)', price: 350 },
  ];

  const [selectedPlayers, setSelectedPlayers] = useState(constants);
  const [selectedDuration, setSelectedDuration] = useState(2);
  const [selectedVenue, setSelectedVenue] = useState('');

  // Inviting new random players while keeping constants intact
  const handleInvite = () => {
    if (!selectedDuration || !selectedVenue) {
      alert('Please select both duration and venue before inviting players.');
      return;
    }

    const availablePlayers = allPlayers.filter(player => {
      // Avoid selecting Kevin and Child together
      const isKevinSelected = selectedPlayers.some(p => p.name === 'Kevin');
      const isChildSelected = selectedPlayers.some(p => p.name === 'Child');
      return (
        !selectedPlayers.includes(player) &&
        !(isKevinSelected && player.name === 'Child') &&
        !(isChildSelected && player.name === 'Kevin')
      );
    });

    const randomPlayers = [];
    while (randomPlayers.length < 5 && availablePlayers.length > 0) {
      const randomIndex = Math.floor(Math.random() * availablePlayers.length);
      const selectedPlayer = availablePlayers[randomIndex];
      if (!randomPlayers.includes(selectedPlayer)) {
        randomPlayers.push(selectedPlayer);
      }
    }

    // Keep constant players and add new random ones
    setSelectedPlayers([...constants, ...randomPlayers]);
  };

  // Reset to the initial state
  const handleReset = () => {
    setSelectedPlayers(constants);
    setSelectedDuration(2);
    setSelectedVenue('');
  };

  // Calculate total cost based on selected venue, duration, and number of courts needed
  const numberOfCourts = Math.ceil(selectedPlayers.length / 4); // 4 players per court
  const totalCost = selectedDuration * numberOfCourts * (venueOptions.find(venue => venue.name === selectedVenue)?.price || 0);

  // Calculate per person amount
  const amountPerPerson = selectedVenue && totalCost > 0 ? (totalCost / selectedPlayers.length).toFixed(2) : 0;

  return (
    <div className="container">
      <h1 id="racket">Racket Roulette</h1>

      {/* Duration and Venue Selection */}
      <div className="selection-container">
        <select 
          value={selectedDuration} 
          onChange={e => setSelectedDuration(Number(e.target.value))} 
          className="dropdown"
        >
          <option value={1}>1 hour</option>
          <option value={2}>2 hours</option>
          <option value={3}>3 hours</option>
          <option value={4}>4 hours</option>
          <option value={5}>5 hours</option>
          <option value={6}>6 hours</option>
          <option value={7}>7 hours</option>
          

        </select>

        <select 
          value={selectedVenue} 
          onChange={e => setSelectedVenue(e.target.value)} 
          className="dropdown"
        >
          <option value="" disabled>Select Venue</option>
          {venueOptions.map((venue, index) => (
            <option key={index} value={venue.name}>
              {venue.name}
            </option>
          ))}
        </select>
      </div>

      {/* Invite and Reset Buttons */}
      <div className="button-container">
        <button onClick={handleInvite} disabled={!selectedVenue || !selectedDuration}>
          Invite
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* Displaying Player Cards */}
      <div className="player-row">
        {selectedPlayers.map((player, index) => (
          <PlayerCard 
            key={index} 
            name={player.name} 
            skill={player.skill} 
            stars={player.stars} 
            amountPerPerson={amountPerPerson} 
          />
        ))}
      </div>
    </div>
  );
};

export default App;