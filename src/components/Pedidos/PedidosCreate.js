import React, { useState, useEffect } from "react";
import PedidosList from "./PedidosList";
import "./PedidosCreate.css";

const PedidosCreate = () => {
  const [produto, setProduto] = useState({ id: "", nome: "" });
  const [quantidade, setQuantidade] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState("");

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

  const validarFormulario = () => {
    if (!produto) {
      setErro("Selecione um produto.");
      return false;
    }
    if (!quantidade || isNaN(quantidade) || parseInt(quantidade) <= 0) {
      setErro("A quantidade deve ser um número maior que zero.");
      return false;
    }
    setErro("");
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

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

      setProduto({ id: "", nome: "" });
      setQuantidade("");
    } catch (error) {
      console.log("Erro ao enviar o formulário: ", error);
      setErro("Erro ao criar o pedido. Tente novamente.");
    }
  };

  return (
    <div className="pedidos-create">
      <h1 className="pedidos-title">Pedidos Create</h1>

      {erro && <p className="erro">{erro}</p>}

      <form className="pedidos-form" onSubmit={onSubmit}>
        <label className="pedidos-label">Produto</label>
        <select
          name="produto"
          onChange={(e) => {
            const selectedProduto = produtos.find(
              (prod) => prod.id === e.target.value
            );
            setProduto({
              id: selectedProduto ? selectedProduto.id : "",
              nome: selectedProduto ? selectedProduto.nome : "",
            });
          }}
          value={produto.id || ""}
        >
          <option value="">Selecione um produto</option>
          {produtos.map((prod) => (
            <option key={prod.id} value={prod.id} data-nome={prod.nome}>
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
