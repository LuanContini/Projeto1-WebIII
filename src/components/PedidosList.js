import React, { useState, useEffect } from "react";

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
    return (
      <div className="pedido-card" key={pedido.id}>
        <h3>Produto: {pedido.produto}</h3>
        <p>Quantidade: {pedido.quantidade}</p>
      </div>
    );
  });

  return <div className="pedidos-list">{renderedPedidos}</div>;
};

export default PedidosList;
