import React from 'react';
import axios, { AxiosResponse } from "axios";
import logo from './logo.svg';
// import './App.css';
import "bulma/css/bulma.css";
import Table from './Table';
import TopBar from './TopBar';

function getUsers(): Promise<[]> {
  return axios.get(process.env.REACT_APP_API_BASE_URL + "/users", {  }).then((res: AxiosResponse) => {
    return res.data.rows
  });
}

function addUser(user: any): Promise<boolean> {
  return axios.post(process.env.REACT_APP_API_BASE_URL + "/users", user).then((res: AxiosResponse) => res.data.success)
}

function deleteUser(id: number) {
  return axios.delete(process.env.REACT_APP_API_BASE_URL + "/users/" + id, {}).then((res: AxiosResponse) => res.data.success)
}

function App() {
  const [ users, setUsers ] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(false);

  React.useEffect(() => {
    getUsers().then((fetchedUsers: []) => {
      setUsers(fetchedUsers);
    });
  }, [ setUsers ]);

  const onUserAdd = React.useCallback(async (user: any) => {
    try {
      await addUser({ username: user })

      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    }catch(e) {
      console.error(e)
    }
  }, [ addUser ]);

  function deleteRow(id: number) {
    return async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
  
      await deleteUser(id);
  
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    }
  }

  function generateRowComponent({ id, username }: any) {
    return (
      <tr key={id}>
          <td>{username}</td>
          <td><button onClick={deleteRow(id)} className="button is-primary">Supprimer</button></td>
      </tr>
    )
  }

  return (
    <div className="App">
      <div className="content root">
        <div style={{ height: "100vh" }} className="columns is-desktop is-vcentered is-centered">
            <div style={{ height: "70vh" }}  className="box column is-four-fifths table-container">
              <TopBar onSubmit={onUserAdd} />
              <Table
                  isLoading={isLoading}
                  items={users}
                  render={generateRowComponent}
              />
            </div>
        </div>
    </div>
    </div>
  );
}

export default App;
