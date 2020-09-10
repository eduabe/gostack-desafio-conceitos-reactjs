import React, { useState, useEffect } from 'react';

import './styles.css';
import api from './services/api';

function App() {
  const [repositories, setRespositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRespositories(response.data);
      console.log(response);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: 'www.github.com',
      techs: ['Node', 'ReactJS'],
    });
    console.log(response);
    setRespositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    console.log(response);
    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );
    console.log(repositories);

    const updatedRepositories = [...repositories];
    updatedRepositories.splice(repositoryIndex, 1);
    setRespositories(updatedRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button
                type="button"
                onClick={() => handleRemoveRepository(repository.id)}
              >
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
