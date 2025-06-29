import { Container, Typography } from "@mui/material";
import store from "./store/store";
import { Provider } from "react-redux";
import FormHabits from "./components/formHabits";
import HabitList from "./components/HabitList";
import HabitStats from "./components/habitStats";

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography component="h1" variant="h2" align="center">
          Habit Tracker
        </Typography>
        <FormHabits />
        <HabitList />
        <HabitStats />
      </Container>
    </Provider>
  );
}

export default App;
