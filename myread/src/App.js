import { Route, Router } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SearchBook from "./Pages/SearchBook/SearchBook";

const App = () => {
    <Router>
      <div className="app">
        <Route path="/" Component={HomePage}/>
        <Route path="/search" Component={SearchBook}/>
      </div>
    </Router>
}

export default App;
