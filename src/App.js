import './App.css';
import CustomNavbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";



function App() {

  const routerMapping = [
    { path: "/", category: "general" },
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
            <Route exact path={element.path} key={element.path} element={<News Country="us" category={element.category} routerMapping={routerMapping} endpoint="top-headlines"/>} />
          ))}
          <Route exact path={"/:q"} element={<News  endpoint="everything" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
