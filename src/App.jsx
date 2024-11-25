// Importing React library for building the user interface
import React from 'react'; 

// Importing the Gallery component from the local 'Gallery' file
import Gallery from './components/Gallery.jsx';

import './App.css';


// Defining the main App component
function App() {
  return (
    // Main container div with a className 'App' for styling purposes
    <div className="App">
      {/* Header section containing the application title */}
      <header>
        <h1> Tour Guide App </h1>
      </header>
      {/* Rendering the imported Gallery component */}
      <Gallery />
    </div>
  );
}

// Exporting the App component to be used in other parts of the application
export default App;

