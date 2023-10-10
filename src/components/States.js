import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, API_KEY } from '../api';

const States = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStates = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/states?country=Canada&key=${API_KEY}`,
      );
      const data = await response.json();
      setStates(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="items">
          {Array.isArray(states) && states.length > 0 ? (
            states.map((state) => (
              <li key={state.state}>
                <Link to={`/${state.state}`} className="item-link">
                  {state.state}
                </Link>
              </li>
            ))
          ) : (
            <p>No states available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default States;
