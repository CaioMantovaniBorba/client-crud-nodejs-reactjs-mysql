import { useState } from 'react';
import Axios from 'axios';

import './App.css';

function App() {
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');
  const [users, setUsers] = useState([]);

  const createUser = () => {
    Axios.post('http://localhost:3333/create', {
      name: name,
    }).then(() => {
      setUsers([
        ...users,
        {
          name: name,
        },
      ]);
    });
  };

  const listUsers = () => {
    Axios.get('http://localhost:3333/list').then((response) => {
      setUsers(response.data);
    });
  };

  const updateUser = (id) => {
    Axios.put('http://localhost:3333/update', {
      id: id,
      name: newName,
    }).then(() => {
      setUsers(
        users.map((user) => {
          return user.id === id ? { id: user.id, name: newName } : user;
        })
      );
    });
  };

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3333/delete/${id}`).then(() => {
      setUsers(
        users.filter((user) => {
          return user.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          onChange={(event) => setName(event.target.value)}
          autoComplete="off"
        />
        <button type="button" onClick={createUser}>
          Submit
        </button>

        <button type="button" onClick={listUsers}>
          List users
        </button>
      </form>

      {users.map((user) => (
        <ul>
          <li key={user.id}>{user.name}</li>
          <form>
            <input
              type="text"
              placeholder="Your new name"
              onChange={(event) => setNewName(event.target.value)}
            />
            <button type="button" onClick={() => updateUser(user.id)}>
              Update
            </button>

            <button type="button" onClick={() => deleteUser(user.id)}>
              Delete
            </button>
          </form>
        </ul>
      ))}
    </div>
  );
}

export default App;
