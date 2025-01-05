import "./App.css";
import QuestionForm from "./QuestionForm";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ paddingTop: "24px" }}
          className="no-print print-button"
        >
          OpenAI Quiz Generator
        </Typography>
        <QuestionForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
