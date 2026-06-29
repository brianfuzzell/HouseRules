import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createChore } from "../../managers/choreManager";

export const CreateChore = () => {
  const [choreFrequencyDays, setChoreFrequencyDays] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newChore = {
      name,
      difficulty,
      choreFrequencyDays,
    };

    createChore(newChore).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        navigate("/chores");
      }
    });
  };

  const navigate = useNavigate();

  return (
    <>
      <div style={{ color: "red" }}>
        {Object.keys(errors).map((key) => (
          <p key={key}>{errors[key].join(",")}</p>
        ))}
      </div>
      <h2>Create a Chore</h2>
      <Form>
        <FormGroup>
          <Label>Chore</Label>
          <Input
            type="text"
            placeholder="Add a chore"
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
          <Label>Frequency in days</Label>
          <Input
            id="frequencyNum"
            type="number"
            name="frequencyNum"
            list="defaultNumbers"
            value={choreFrequencyDays}
            onChange={(e) => setChoreFrequencyDays(e.target.value)}
          />
          <span className="validity"></span>

          <datalist id="defaultNumbers">
            <option value="1"></option>
            <option value="3"></option>
            <option value="7"></option>
            <option value="10"></option>
            <option value="14"></option>
          </datalist>
        </FormGroup>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
};
