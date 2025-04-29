//Área de importação
import React, {useState} from 'react';
import ProdutosList from './ProdutosList';


//Componentes propriamente ditos
const ProdutosCreate = () => {

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nome, preco}),
            });
            
            if(!response.ok){
                throw new Error('Erro ao criar o Produtos: ', response.status);
            }

            const data = await response.json();
            console.log('Produtos criado com sucesso: ', data);

            setNome('');
            setPreco('');


        } catch(error) {

            console.log('Erro ao enviar o formulário: ', error);
        }
    }
    return (
        <div className = 'produtos-create'>
            <h1>Produtos Create</h1>

            <form onSubmit={onSubmit}> 
                <label>
                    Nome
                </label>
                <input 
                type='text' 
                name='nome' 
                onChange={(e) => setNome(e.target.value)} 
                value={nome}
                />
                
                <label>
                    Preço
                </label>
                <input 
                type='text' 
                name='preco' 
                onChange={(e) => setPreco(e.target.value)} 
                value={preco}
                />
                
                <button type='submit'>Submit</button>
            </form>
            <ProdutosList />
        </div>
    )
}


//Área de exportação
export default ProdutosCreate;