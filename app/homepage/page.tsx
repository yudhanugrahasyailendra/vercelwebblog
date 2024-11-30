'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('goRestToken');
      if (token) {
        try {
          const response = await axios.get('https://gorest.co.in/public/v2/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsers(response.data); // Set data pengguna ke state
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to the Blog App</h1>
      <h2>List of Users</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email}) - {user.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
