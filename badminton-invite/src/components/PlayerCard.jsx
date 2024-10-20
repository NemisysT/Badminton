// src/components/PlayerCard.jsx
import React from 'react';
import './PlayerCard.css'; // Assuming you have a separate CSS file for PlayerCard
import maleImage from '../assets/male.jpg'; // Import the male profile image
import femaleImage from '../assets/female.jpg'; // Import the female profile image

const PlayerCard = ({ name, skill, stars, amountPerPerson }) => {
  // Determine the class based on skill
  const skillClass = skill === 'undefined' ? 'undefined' : skill.toLowerCase(); // Convert skill to lowercase for class matching

  // List of female names
  const femaleNames = ['Isha', 'Aneesha', 'Child', 'Dhravya'];

  // Determine the profile image based on gender
  const isMale = !femaleNames.includes(name); // If the name is not in the female names list, it's male
  const profileImage = isMale ? maleImage : femaleImage; // Use the imported image based on gender

  return (
        
    <div className={`player-card ${skillClass}`}>
      <img src={profileImage} alt={`${name}'s profile`} className="profile-image" />
      <h3>{name}</h3>
      <p>{skill === 'undefined' ? 'Undefined' : skill}</p> {/* Show 'Undefined' if skill is undefined */}
      <div className="stars">{'★'.repeat(stars)}</div>
      <p>Payable: ₹{amountPerPerson}</p>
    </div>
    
  );
};

export default PlayerCard;
