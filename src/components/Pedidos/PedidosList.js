import React, { useState, useEffect } from "react";
import './PedidosList.css';

const PedidosList = () => {
  const [pedidos, setPedidos] = useState({});

  const fetchPedidos = async () => {
    try {
      const res = await fetch("http://localhost:4001/pedidos");
      const data = await res.json();
      setPedidos(data);
    } catch (error) {
      console.log("Erro ao buscar pedidos: ", error);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const renderedPedidos = Object.values(pedidos).map((pedido) => {
    const dataFormatada = new Date(pedido.dataAtual).toLocaleString("pt-BR");
    return (
      <div className="pedido-card" key={pedido.id}>
        <h3>Produto: {pedido.nome.nome}</h3>
        <p>ID Produto: {pedido.id}</p>
        <p>Quantidade: {pedido.quantidade}</p>
        <p>Data Venda: {dataFormatada}</p>
      </div>
    );
  });

  return (
    <div className="pedidos-list">
      {renderedPedidos}
    </div>
  );
};

export default PedidosList;
