import './App.css';
import Home from "./componentes/Home/Home";
import Landing from "./componentes/Landing/Landing";
import Detalle from "./componentes/Detalle/Detalle";
import Formulario from "./componentes/Formulario/Formulario";
import {Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Landing/>
      </Route>

      <Route exact path="/home">
        <Home/>
      </Route>

      <Route exact path="/home/:id" component={Detalle}>  
      </Route>

      <Route exact path="/formulario" component={Formulario}>
      </Route>
    </div>
  );
}

export default App;
