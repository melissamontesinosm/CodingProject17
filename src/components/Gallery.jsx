// Import necessary React hooks for state and side-effects
import React, { useState, useEffect } from 'react';

// Import external CSS for styling the Gallery component
import './Gallery.css';

function Gallery() {
  // State to store tour data
  const [tours, setTours] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to store any error messages
  const [error, setError] = useState('');

  // useEffect to fetch tour data when the component mounts
  useEffect(() => {
    const fetchTours = async () => {
      console.log("Starting fetch...");
      setLoading(true); // Set loading state before fetching data

      try {
        const response = await fetch('/api/react-tours-project'); // Fetch data from the API endpoint
        console.log("Fetch Response: ", response);

        // Check if the response is not OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); // Handle HTTP errors
        }

        const data = await response.json(); // Parse response JSON
        console.log("Fetched Data: ", data);

        // Set the fetched data into the state with an added 'showMore' property
        setTours(
          data.map((tour) => ({
            ...tour,
            showMore: false, // Initial value for showMore is false
          }))
        );
      } catch (err) {
        console.error("Fetch Error: ", err); // Log errors for debugging
        setError(`Error: ${err.message}`); // Update error state with the error message
      } finally {
        setLoading(false); // Set loading state to false after fetching is complete
      }
    };

    fetchTours(); // Invoke the function
  }, []); // Empty dependency array ensures this effect runs only once

  // Function to remove a tour from the list by its ID
  const handleRemoveTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id)); // Filter out the tour with the matching ID
  };

  // Function to toggle the 'showMore' property of a specific tour
  const toggleReadMore = (id) => {
    setTours(
      tours.map((tour) =>
        tour.id === id
          ? { ...tour, showMore: !tour.showMore } // Toggle 'showMore' property
          : tour
      )
    );
  };

  // Render a loading message if data is still being fetched
  if (loading) return <div className="loading">Loading...</div>;

  // Render an error message if an error occurred during the fetch
  if (error) return <div className="error">{error}</div>;

  // Main component render
  return (
    <div className="gallery">
      {/* Iterate through the tours array and render a card for each tour */}
      {tours.map((tour) => (
        <div key={tour.id} className="tour-card">
          {/* Render the tour image */}
          <img src={tour.image} alt={tour.name} className="tour-image" />
          {/* Tour information */}
          <div className="tour-info">
            <h2>{tour.name}</h2>
            <h4>${tour.price}</h4>
            {/* Show truncated or full description based on 'showMore' */}
            <p>
              {tour.showMore ? tour.info : `${tour.info.substring(0, 100)}...`}
              <button
                className="toggle-btn"
                onClick={() => toggleReadMore(tour.id)}
              >
                {tour.showMore ? 'Show Less' : 'Read More'}
              </button>
            </p>
            {/* Button to remove the tour */}
            <button
              className="remove-btn"
              onClick={() => handleRemoveTour(tour.id)}
            >
              Not Interested
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
