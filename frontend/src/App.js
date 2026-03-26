import "./App.css";
import PortfolioPage from "./pages/PortfolioPage";
import EducationPage from "./pages/EducationPage";
import ExperiencePage from "./pages/ExperiencePage";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Portfolio Dashboard</h1>
      <PortfolioPage />
      <hr />
      <EducationPage />
      <hr />
      <ExperiencePage />
    </div>
  );
}

export default App;