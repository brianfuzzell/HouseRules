import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, Input, Label } from "reactstrap";
import {
  assignChore,
  getChoreById,
  unassignChore,
} from "../../managers/choreManager";
import { getUserProfilesWithRoles } from "../../managers/userProfileManager";

export const ChoreDetails = () => {
  const { id } = useParams();
  const [chore, setChore] = useState(null);
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    getChoreById(id).then(setChore);
  }, [id]);

  useEffect(() => {
    getUserProfilesWithRoles().then(setUserProfiles);
  }, []);

  if (chore === null) return <p>Chore not found.</p>;

  const recentlyCompletedChore = chore.choreCompletions.sort(
    (a, b) => new Date(b.completedOn) - new Date(a.completedOn),
  )[0];

  const handleAssignmentToggle = (e, up) => {
    if (e.target.checked) {
      assignChore(id, up.id).then(() => {
        getChoreById(id).then(setChore);
      });
    } else {
      unassignChore(id, up.id).then(() => {
        getChoreById(id).then(setChore);
      });
    }
  };

  return (
    <>
      <h2>Chore Details</h2>
      <Card>
        <CardBody>
          <CardTitle tag="h4">{chore.name}</CardTitle>
          <p>Frequency: {chore.choreFrequencyDays}</p>
          <p>Difficulty: {chore.difficulty}</p>
          <CardTitle tag="h6">Current Assignees</CardTitle>
          {userProfiles.map((up) => (
            <div key={up.id}>
              <Input
                type="checkbox"
                value={up.id}
                checked={chore.choreAssignments.some(
                  (c) => c.userProfileId === up.id,
                )}
                onChange={(e) => handleAssignmentToggle(e, up)}
              />
              <Label for="">
                {up.firstName} {up.lastName}
              </Label>
            </div>
          ))}
          <CardTitle tag="h6">Most Recent Completion</CardTitle>
          {recentlyCompletedChore ? (
            <p>
              Completed:{" "}
              {new Date(recentlyCompletedChore.completedOn).toLocaleDateString(
                "en-US",
                {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  timeZone: "UTC",
                },
              )}{" "}
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
