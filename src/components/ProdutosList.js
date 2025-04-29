import React, { useState, useEffect } from "react";
import "./ProdutosList.css";

const ProdutosList = () => {
  const [produtos, setProdutos] = useState({});

  const fetchProdutos = async () => {
    try {
      const res = await fetch("http://localhost:4000/produtos");
      const data = await res.json();
      setProdutos(data);
    } catch (error) {
      console.log("Erro ao buscar produtos: ", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const renderedProdutos = Object.values(produtos).map((produtos) => {
    return (
      <div className="produtos-card" key={produtos.id}>
        <h3>{produtos.nome}</h3>
        <p>{produtos.preco}</p>
      </div>
    );
  });

  return <div className="produtos-list">{renderedProdutos}</div>;
};

export default ProdutosList;
