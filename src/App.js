import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/main/main";
import { DataState } from "./context/DataState";
import { DocPage } from "./pages/tablePage/docPage/docPage";

function App() {
  return (
    <DataState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="/table/:id" element={<DocPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataState>
  );
}

export default App;
