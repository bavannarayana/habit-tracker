import { LinearProgress, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
// import { initialState } from "../store/habitSlice";

const HabitStats = () => {
  const { habits, isLoading, error } = useSelector((state) => state.habits);

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

  function longestStreak() {
    return Math.max(...habits.map(getStreak), 0);
  }

  function completedToday() {
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((habit) => habit.createdDates.includes(today)).length;
  }

  if (isLoading) {
    return <LinearProgress />;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Habit Statastics
      </Typography>
      <Typography variant="body1">Total Habits: {habits.length}</Typography>
      <Typography variant="body1">
        Completed Today: {completedToday()}
      </Typography>
      <Typography variant="body1">Longest Streak: {longestStreak()}</Typography>
    </Paper>
  );
};

export default HabitStats;
