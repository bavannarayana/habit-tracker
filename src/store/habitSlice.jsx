import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHabits = createAsyncThunk("Habits/fetch", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const mockHabits = [];
  return mockHabits;
});

function addToLocalStorage(state) {
  try {
    const serialized = JSON.stringify(state.habits);
    localStorage.setItem("habit", serialized);
  } catch (error) {
    console.warn("Unable to add the habit!" + error);
  }
}

function loadFromLocalStorage() {
  try {
    const serialized = JSON.stringify(localStorage.getItem("habit"));
    if (serialized === null) return [];
    return JSON.parse(serialized);
  } catch (error) {
    console.log("Unable to load habit" + error);
  }
}

const initialState = {
  habits: JSON.parse(loadFromLocalStorage()) || [],
  isLoading: false,
  error: null,
};

const habitSlice = createSlice({
  name: "Habits",
  initialState,
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
      addToLocalStorage(state);
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
      addToLocalStorage(state);
    },
    removeHabit: (state, action) => {
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload.id
      );
      addToLocalStorage(state);
    },
    clearHabits: (state) => {
      state.habits = [];
      addToLocalStorage(state);
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
        addToLocalStorage(state);
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export const { addHabit, removeHabit, toggleHabit, clearHabits } =
  habitSlice.actions;

export default habitSlice.reducer;
