import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { deleteChore, getChores } from "../../managers/choreManager";
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

  return (
    <>
      <h2>Chores</h2>
      <Table>
        <thead>
          <tr>
            <th>Chore</th>
            <th>Frequency</th>
            <th>Difficulty</th>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
