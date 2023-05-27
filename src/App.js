import './App.css';
import CustomNavbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";



function App() {
  const routerMapping = [
    { path: "/", category: "" },
    { path: "/business", category: "business" },
    { path: "/entertainment", category: "entertainment" },
    { path: "/general", category: "general" },
    { path: "/health", category: "health" },
    { path: "/science", category: "science" },
    { path: "/sports", category: "sports" },
    { path: "/technology", category: "technology" }
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          {routerMapping.map((element) => (
            <Route path={element.path} element={<News Country="in" category={element.category} />} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
