import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import { getChoreById } from "../../managers/choreManager";

export const ChoreDetails = () => {
  const { id } = useParams();
  const [chore, setChore] = useState(null);

  useEffect(() => {
    getChoreById(id).then(setChore);
  }, [id]);

  if (chore === null) return <p>Chore not found.</p>;

  const recentlyCompletedChore = chore.choreCompletions.sort(
    (a, b) => new Date(b.completedOn) - new Date(a.completedOn),
  )[0];
  console.log(recentlyCompletedChore.completedOn);

  return (
    <>
      <h2>Chore Details</h2>
      <Card>
        <CardBody>
          <CardTitle tag="h4">{chore.name}</CardTitle>
          <p>Frequency: {chore.choreFrequencyDays}</p>
          <p>Difficulty: {chore.difficulty}</p>
          <CardTitle tag="h6">Current Assignees</CardTitle>
          <ul>
            {chore.choreAssignments.map((assignment, index) => (
              <li key={index}>
                {`${assignment.userProfile.firstName} ${assignment.userProfile.lastName}`}
              </li>
            ))}
          </ul>
          <CardTitle tag="h6">Most Recent Completion</CardTitle>
          {recentlyCompletedChore ? (
            <p>
              Completed:{" "}
              {new Date(recentlyCompletedChore.completedOn).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
                timeZone: "UTC",
              })}{" "}
              by{" "}
              {`${recentlyCompletedChore.userProfile.firstName} ${recentlyCompletedChore.userProfile.lastName}`}
            </p>
          ) : (
            <p>No completed chores found.</p>
          )}
        </CardBody>
      </Card>
    </>
  );
};
