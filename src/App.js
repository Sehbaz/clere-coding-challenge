import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AddData from "./components/AddData/AddData";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/addData" exact>
            <AddData />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
