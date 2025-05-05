import React, { useState } from "react";
import axios from "axios"; 
import ProdutosList from "./ProdutosList";
import './ProdutosCreate.css';

const ProdutosCreate = () => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [erro, setErro] = useState("");

  const validacao = () => {
    if (!nome.trim() || !preco.trim()) {
      setErro("Nome e preço não podem estar vazios!");
      return false;
    }

    if (isNaN(preco) || parseFloat(preco) < 0) {
      setErro("O preço deve ser um número positivo!");
      return false;
    }

    setErro("");
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validacao()) {
        return;
      }

      const response = await axios.post("http://localhost:4000/produtos", {
        nome,
        preco,
      });

      console.log("Produtos criado com sucesso: ", response.data);

      setNome("");
      setPreco("");
    } catch (error) {
      setErro("Erro ao enviar o formulário. Tente novamente.");
      console.error("Erro ao enviar o formulário: ", error);
    }
  };

  return (
    <div>
      <div className="produtos-create">
        <h1>Produtos Create</h1>

        {erro && <p className="erro">{erro}</p>}

        <form onSubmit={onSubmit}>
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
          />

          <label>Preço</label>
          <input
            type="text"
            name="preco"
            onChange={(e) => setPreco(e.target.value)}
            value={preco}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <ProdutosList />
      </div>
    </div>
  );
};

export default ProdutosCreate;