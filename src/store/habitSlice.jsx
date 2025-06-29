import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHabits = createAsyncThunk("Habits/fetch", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const mockHabits = [
    {
      id: "1",
      name: "Read Book",
      frequency: "daily",
      createdDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Walk",
      frequency: "daily",
      createdDates: [],
      createdAt: new Date().toISOString(),
    },
  ];
  return mockHabits;
});

const habitSlice = createSlice({
  name: "Habits",
  initialState: {
    habits: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addHabit: (state, action) => {
      const newHabit = {
        id: Date.now(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        createdAt: new Date().toISOString(),
        createdDates: [],
      };
      state.habits.push(newHabit);
    },
    toggleHabit: (state, action) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);
      if (habit) {
        const index = habit.createdDates.indexOf(action.payload.date);
        if (index > -1) {
          habit.createdDates.splice(index, 1);
        } else {
          habit.createdDates.push(action.payload.date);
        }
      }
    },
    removeHabit: (state, action) => {
      const newHabits = state.habits.filter(
        (habit) => habit.id !== action.payload.id
      );
      state.habits = newHabits;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export const { addHabit, removeHabit, toggleHabit } = habitSlice.actions;

export default habitSlice.reducer;
