import { useEffect, useState } from "react";
import { completeChore, getChores } from "../../managers/choreManager";
import { Button, Table } from "reactstrap";

export const MyChores = ({ loggedInUser }) => {
  const [chores, setChores] = useState([]);

  useEffect(() => {
    getChores().then(setChores);
  }, []);

  const handleCompleteChore = (id, userId) => {
    completeChore(id, userId).then(() => {
      getChores().then(setChores);
    });
  };

  const myOverdueChores = chores.filter(
    (chore) =>
      chore.choreAssignments.some((c) => c.userProfileId === loggedInUser.id) &&
      chore.isOverdue,
  );

  return (
    <>
      <h2>My Chores</h2>
      <Table>
        <tbody>
          {myOverdueChores.map((moc) => (
            <tr key={moc.id}>
              <td>{moc.name}</td>
              <td>
                <Button
                  onClick={() => handleCompleteChore(moc.id, loggedInUser.id)}
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
