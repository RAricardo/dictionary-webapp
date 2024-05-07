import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider, useThemeContext } from "./hooks/useThemeContext";
import Dictionary from "./modules/Dictionary/Dictionary";

function App() {
  return (
    <ThemeProvider>
      <DictionaryApp />
    </ThemeProvider>
  );
}

const DictionaryApp: React.FC = () => {
  const { theme, font } = useThemeContext();
  return (
    <div className={`main ${theme} ${font}`}>
      <div className="container">
        <Navbar></Navbar>
        <Dictionary />
      </div>
    </div>
  );
};

export default App;
