import { useEffect, useState } from "react";
import "./App.css";
import { startFakeApi } from "./fake-api";
import KanbanPage from "./pages/kanban";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const startApplication = async () => {
      await startFakeApi();
      setLoading(false);
    };
    startApplication();
  }, []);

  return loading ? null : (
    <div className="App">
      <KanbanPage />
    </div>
  );
}

export default App;
