import React, { useState } from "react";
import "./App.css";
import ProdutosCreate from "./components/Produtos/ProdutosCreate";
import PedidosCreate from "./components/Pedidos/PedidosCreate";

function App() {
  const [telaAtiva, setTelaAtiva] = useState("produtos"); 
  
  return (
    <div className="App">
      <div className="menu">
        <button onClick={() => setTelaAtiva("produtos")}>Produtos</button>
        <button onClick={() => setTelaAtiva("pedidos")}>Pedidos</button>
      </div>

      <div className="conteudo">
        {telaAtiva === "produtos" && <ProdutosCreate />}
        {telaAtiva === "pedidos" && <PedidosCreate />}
      </div>
    </div>
  );
}

export default App;