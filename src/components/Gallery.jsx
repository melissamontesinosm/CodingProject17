import React, { useState, useEffect } from 'react';
import './Gallery.css';

function Gallery() {
  // State to store the list of tours
  const [tours, setTours] = useState([]);
  // State to track the loading status of the data fetch
  const [loading, setLoading] = useState(true);
  // State to store any error message that occurs during data fetching
  const [error, setError] = useState('');

  // Fetch tour data from the API when the component mounts
  useEffect(() => {
    const fetchTours = async () => {
      console.log("Starting fetch...");
      setLoading(true); // Set loading to true while fetching data
      try {
        // Make a request to the API
        const response = await fetch('/api/react-tours-project');
        console.log("Fetch Response: ", response);

        // Check if the response is not OK (e.g., 404 or 500 errors)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response data as JSON
        const data = await response.json();
        console.log("Fetched Data: ", data);

        // Add 'showMore' property to each tour object and update state
        setTours(
          data.map((tour) => ({
            ...tour,
            showMore: false, // 'showMore' is initially set to false
          }))
        );
      } catch (err) {
        // Log any fetch errors and display an error message
        console.error("Fetch Error: ", err);
        setError(`Error: ${err.message}`);
      } finally {
        // Set loading to false after the fetch operation completes
        setLoading(false);
      }
    };

    fetchTours(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures this runs only once on mount

  // Remove a tour from the list based on its ID
  const handleRemoveTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id)); // Filter out the tour with the specified ID
  };

  // Toggle the 'showMore' state for a specific tour to show more or less of the description
  const toggleReadMore = (id) => {
    setTours(
      tours.map((tour) =>
        tour.id === id
          ? { ...tour, showMore: !tour.showMore } // Toggle the 'showMore' property
          : tour
      )
    );
  };

  // If the data is still loading, display a loading message
  if (loading) return <div className="loading">Loading...</div>;

  // If there's an error during the fetch operation, display the error message
  if (error) return <div className="error">{error}</div>;

  // Render the tour cards once the data has loaded
  return (
    <div className="gallery">
      {tours.map((tour) => (
        <div key={tour.id} className="tour-card">
          <img src={tour.image} alt={tour.name} className="tour-image" />
          <div className="tour-info">
            <h2>{tour.name}</h2>
            <h4>${tour.price}</h4>
            <p>
              {/* Show either the full description or a truncated version based on 'showMore' */}
              {tour.showMore ? tour.info : `${tour.info.substring(0, 100)}...`}
              <button
                className="toggle-btn"
                onClick={() => toggleReadMore(tour.id)} // Toggle between 'Read More' and 'Show Less'
              >
                {tour.showMore ? 'Show Less' : 'Read More'}
              </button>
            </p>
            {/* Button to remove the tour */}
            <button
              className="remove-btn"
              onClick={() => handleRemoveTour(tour.id)} // Remove the current tour
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
