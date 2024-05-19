/*import React, { useState, useEffect } from 'react';

const UserDropdown = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <select>
      {users.map(user => (
        <option key={user._id} value={user._id}>
          {user['name']}
        </option>
      ))}
    </select>
  );
};

export default UserDropdown;
*/