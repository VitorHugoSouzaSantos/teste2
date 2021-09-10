import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Home} from './pages/Home/';
import {VisualizarCliente} from './pages/Cliente/VisualizarCliente';
import { VisualizarServico } from './pages/Servico/VisualizarServico';
import { Menu } from './components/Menu';
import { Servico } from './pages/Servico/Servico';
import { Pedido } from './pages/Pedido/Pedido';
import { VisuzalizarPedido } from './pages/Pedido/VisualizarPedido';
import { Cliente } from './pages/Cliente/Cliente';
import { Cadastrar } from './pages/Servico/Cadastrar';
import { Editar } from './pages/Servico/Editar';
import { CadastarCliente } from './pages/Cliente/CadastrarCliente';

function App() {
  return (
    <div>
      <Menu/>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>

          <Route path="/cliente/:id" component={Cliente}/>
          <Route path="/visualizarcliente" component={VisualizarCliente}/>
          <Route path="/cadastrarcliente" component={CadastarCliente}/>
          

          <Route path="/servico/:id" component={Servico}/>
          <Route path="/visualizarservico" component={VisualizarServico}/>
          <Route path="/cadastrarservico" component={Cadastrar}/>
          <Route path="/editarservico/:id" component={Editar}/>


          <Route path="/pedido/:id" component={Pedido}/>
          <Route path="/visualizarpedido" component={VisuzalizarPedido}/>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
