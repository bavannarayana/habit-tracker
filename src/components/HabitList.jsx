import {
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  MenuItem,
  LinearProgress,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, Delete } from "@mui/icons-material";
import { removeHabit, toggleHabit } from "../store/habitSlice";

const HabitList = () => {
  const { habits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  const today = new Date().toISOString().split("T")[0];

  const getStreak = function (habit) {
    const currentDate = new Date();
    let Streak = 0;

    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (habit.createdDates.includes(dateString)) {
        Streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return Streak;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {habits.length > 0 &&
        habits.map((item) => {
          return (
            <Paper key={item.id} elevation={2} sx={{ p: 2 }}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.frequency}
                  </Typography>
                </Grid>
                <Grid>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                  >
                    <Button
                      variant="outlined"
                      color={
                        item.createdDates.includes(today)
                          ? "success"
                          : "primary"
                      }
                      startIcon={<CheckCircle />}
                      onClick={() =>
                        dispatch(toggleHabit({ id: item.id, date: today }))
                      }
                    >
                      {item.createdDates.includes(today)
                        ? "Completed"
                        : "Mark Complete"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => dispatch(removeHabit({ id: item.id }))}
                    >
                      Delete
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Current Streak: {getStreak(item)} days
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(getStreak(item) / 30) * 100}
                  sx={{ mt: 1 }}
                />
              </Box>
            </Paper>
          );
        })}
    </Box>
  );
};

export default HabitList;
