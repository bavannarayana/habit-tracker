import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit, clearHabits } from "../store/habitSlice";

function FormHabits() {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    name !== "" && dispatch(addHabit({ name, frequency }));
    setName("");
  }

  const handleClear = () => {
    dispatch(clearHabits());
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Habit name"
        ></TextField>
        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add habit
        </Button>
        <Button color="secondary" variant="contained" onClick={handleClear}>
          Clear
        </Button>
      </Box>
    </form>
  );
}

export default FormHabits;
