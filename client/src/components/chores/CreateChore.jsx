import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createChore } from "../../managers/choreManager";

export const CreateChore = () => {
  const [choreFrequencyDays, setChoreFrequencyDays] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newChore = {
      name,
      difficulty,
      choreFrequencyDays,
    };

    createChore(newChore).then(() => {
      navigate("/chores");
    });
  };

  const navigate = useNavigate();

  return (
    <>
      <h2>Create a Chore</h2>
      <Form>
        <FormGroup>
          <Label>Chore</Label>
          <Input
            type="text"
            placeholder="Enter a chore"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>
            <strong>Difficulty</strong>
          </Label>
          <Input
            id="diff1"
            type="radio"
            value={1}
            name="difficulty-btn"
            checked={difficulty === 1}
            onChange={(e) => setDifficulty(parseInt(e.target.value))}
          />
          <Label for="diff1">1</Label>
          <Input
            id="diff2"
            type="radio"
            value={2}
            name="difficulty-btn"
            checked={difficulty === 2}
            onChange={(e) => setDifficulty(parseInt(e.target.value))}
          />
          <Label for="diff2">2</Label>
          <Input
            id="diff3"
            type="radio"
            value={3}
            name="difficulty-btn"
            checked={difficulty === 3}
            onChange={(e) => setDifficulty(parseInt(e.target.value))}
          />
          <Label for="diff3">3</Label>
          <Input
            id="diff4"
            type="radio"
            value={4}
            name="difficulty-btn"
            checked={difficulty === 4}
            onChange={(e) => setDifficulty(parseInt(e.target.value))}
          />
          <Label for="diff4">4</Label>
          <Input
            id="diff5"
            type="radio"
            value={5}
            name="difficulty-btn"
            checked={difficulty === 5}
            onChange={(e) => setDifficulty(parseInt(e.target.value))}
          />
          <Label for="diff5">5</Label>
        </FormGroup>
        <FormGroup>
          <Label>Frequency</Label>
          <Input
            type="text"
            placeholder="In days"
            value={choreFrequencyDays}
            onChange={(e) => setChoreFrequencyDays(parseInt(e.target.value))}
          ></Input>
        </FormGroup>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
};
