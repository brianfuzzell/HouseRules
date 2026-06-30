import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {
  assignChore,
  getChoreById,
  unassignChore,
  updateChore,
} from "../../managers/choreManager";
import { getUserProfilesWithRoles } from "../../managers/userProfileManager";

export const ChoreDetails = () => {
  const { id } = useParams();
  const [chore, setChore] = useState(null);
  const [userProfiles, setUserProfiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    choreFrequencyDays: "",
    difficulty: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getChoreById(id).then((choreFromApi) => {
      setChore(choreFromApi);
      setFormData({
        name: choreFromApi.name,
        choreFrequencyDays: choreFromApi.choreFrequencyDays,
        difficulty: choreFromApi.difficulty,
      });
    });
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

  const handleEditChore = (event) => {
    event.preventDefault();

    const updatedChore = {
      ...formData,
      id,
    };

    updateChore(updatedChore).then(() => {
      navigate("/chores");
    });
  };

  return (
    <>
      <h2>Chore Details</h2>
      <Form onSubmit={handleEditChore}>
        <FormGroup>
          <Label for="name" tag="h5">
            Chore Name
          </Label>
          <Input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="frequency-btn" tag="h5">
            Frequency in days
          </Label>
          <Input
            id="frequency1"
            type="radio"
            value={1}
            name="frequency-btn"
            checked={formData.choreFrequencyDays === 1}
            onChange={(e) =>
              setFormData({
                ...formData,
                choreFrequencyDays: parseInt(e.target.value),
              })
            }
          />
          <Label for="frequency1">1</Label>
          <Input
            id="frequency3"
            type="radio"
            value={3}
            name="frequency-btn"
            checked={formData.choreFrequencyDays === 3}
            onChange={(e) =>
              setFormData({
                ...formData,
                choreFrequencyDays: parseInt(e.target.value),
              })
            }
          />
          <Label for="frequency1">3</Label>
          <Input
            id="frequency7"
            type="radio"
            value={7}
            name="frequency-btn"
            checked={formData.choreFrequencyDays === 7}
            onChange={(e) =>
              setFormData({
                ...formData,
                choreFrequencyDays: parseInt(e.target.value),
              })
            }
          />
          <Label for="frequency1">7</Label>
          <Input
            id="frequency10"
            type="radio"
            value={10}
            name="frequency-btn"
            checked={formData.choreFrequencyDays === 10}
            onChange={(e) =>
              setFormData({
                ...formData,
                choreFrequencyDays: parseInt(e.target.value),
              })
            }
          />
          <Label for="frequency1">10</Label>
          <Input
            id="frequency14"
            type="radio"
            value={14}
            name="frequency-btn"
            checked={formData.choreFrequencyDays === 14}
            onChange={(e) =>
              setFormData({
                ...formData,
                choreFrequencyDays: parseInt(e.target.value),
              })
            }
          />
          <Label for="frequency1">14</Label>
        </FormGroup>

        <FormGroup>
          <Label for="difficulty-btn" tag="h5">
            Difficulty
          </Label>
          <Input
            id="diff1"
            type="radio"
            value={1}
            name="difficulty-btn"
            checked={formData.difficulty === 1}
            onChange={(e) =>
              setFormData({ ...formData, difficulty: parseInt(e.target.value) })
            }
          />
          <Label for="diff1">1</Label>
          <Input
            id="diff2"
            type="radio"
            value={2}
            name="difficulty-btn"
            checked={formData.difficulty === 2}
            onChange={(e) =>
              setFormData({ ...formData, difficulty: parseInt(e.target.value) })
            }
          />
          <Label for="diff2">2</Label>
          <Input
            id="diff3"
            type="radio"
            value={3}
            name="difficulty-btn"
            checked={formData.difficulty === 3}
            onChange={(e) =>
              setFormData({ ...formData, difficulty: parseInt(e.target.value) })
            }
          />
          <Label for="diff3">3</Label>
          <Input
            id="diff4"
            type="radio"
            value={4}
            name="difficulty-btn"
            checked={formData.difficulty === 4}
            onChange={(e) =>
              setFormData({ ...formData, difficulty: parseInt(e.target.value) })
            }
          />
          <Label for="diff4">4</Label>
          <Input
            id="diff5"
            type="radio"
            value={5}
            name="difficulty-btn"
            checked={formData.difficulty === 5}
            onChange={(e) =>
              setFormData({ ...formData, difficulty: parseInt(e.target.value) })
            }
          />
          <Label for="diff5">5</Label>
        </FormGroup>

        <FormGroup>
          <Label tag="h5">Current Assignees</Label>
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
          <Label tag="h5">Most Recent Completion</Label>
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
        </FormGroup>
        <Button type="submit">Update</Button>
      </Form>
    </>
  );
};
