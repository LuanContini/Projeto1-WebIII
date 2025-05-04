import React, { useState, useEffect } from "react";
import PedidosList from "./PedidosList";

const PedidosCreate = () => {
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [produtos, setProdutos] = useState([]);

  const fetchProdutos = async () => {
    try {
      const res = await fetch("http://localhost:4000/produtos");
      const data = await res.json();
      setProdutos(Object.values(data));
    } catch (error) {
      console.log("Erro ao buscar produtos: ", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4001/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ produto, quantidade }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar pedido: ", response.status);
      }

      const data = await response.json();
      console.log("Pedido criado com sucesso: ", data);

      setProduto("");
      setQuantidade("");
    } catch (error) {
      console.log("Erro ao enviar o formulário: ", error);
    }
  };

  return (
    <div className="pedidos-create">
      <h1 className="pedidos-title">Pedidos Create</h1>

      <form className="pedidos-form" onSubmit={onSubmit}>
        <label className="pedidos-label">Produto</label>
        <select
          name="produto"
          onChange={(e) => setProduto(e.target.value)}
          value={produto}
        >
          <option value="">Selecione um produto</option>
          {produtos.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.nome} - R$ {prod.preco}
            </option>
          ))}
        </select>

        <label>Quantidade</label>
        <input
          type="text"
          name="quantidade"
          onChange={(e) => setQuantidade(e.target.value)}
          value={quantidade}
        />

        <button type="submit">Enviar Pedido</button>
      </form>
      <PedidosList />
    </div>
  );
};

export default PedidosCreate;
