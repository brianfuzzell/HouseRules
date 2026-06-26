import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import {
  completeChore,
  deleteChore,
  getChores,
} from "../../managers/choreManager";
import { Link } from "react-router-dom";

export const ChoresList = ({ loggedInUser }) => {
  const [chores, setChores] = useState([]);

  useEffect(() => {
    getChores().then(setChores);
  }, []);

  const handleDeleteChore = (id) => {
    deleteChore(id).then(() => {
      getChores().then(setChores);
    });
  };

  const handleCompleteChore = (id, userId) => {
    completeChore(id, userId).then(() => {
      getChores().then(setChores);
    });
  };

  return (
    <>
      <h2>Chores</h2>
      {loggedInUser.roles.includes("Admin") ? (
        <Link to="/chores/create">Create a Chore</Link>
      ) : (
        ""
      )}
      <Table>
        <thead>
          <tr>
            <th>Chore</th>
            <th>Frequency</th>
            <th>Difficulty</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {chores.map((c) => (
            <tr key={c.id}>
              <th scope="row">{c.name}</th>
              <td>{c.choreFrequencyDays}</td>
              <td>{c.difficulty}</td>
              <td>
                {loggedInUser.roles.includes("Admin") ? (
                  <Link to={`/chores/${c.id}`}>Details</Link>
                ) : (
                  ""
                )}
              </td>
              <td>
                {loggedInUser.roles.includes("Admin") ? (
                  <Button
                    onClick={() => handleDeleteChore(c.id)}
                    color="danger"
                  >
                    Delete
                  </Button>
                ) : (
                  ""
                )}
              </td>
              <td>
                <Button
                  onClick={() => handleCompleteChore(c.id, loggedInUser.id)}
                  color="success"
                >
                  Complete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
