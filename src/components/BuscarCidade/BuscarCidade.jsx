import React, { useState, useEffect } from "react";
import styles from "./BuscarCidade.module.css";

function BuscarCidade() {
  // Estado para armazenar o nome da cidade inserida pelo usuário
  const [cidade, setCidade] = useState("");
  // Estado para armazenar as informações do clima da cidade pesquisada
  const [clima, setClima] = useState(null);
  // Estado para armazenar mensagens de erro, se houver
  const [error, setError] = useState("");

  useEffect(() => {
    // Função assíncrona para buscar os dados do clima
    const pesquisarCidade = async () => {
      // Se o nome da cidade estiver vazio, não faz a busca
      if (!cidade) return;

      try {
        // Faz uma requisição para obter os dados do clima a partir de um arquivo JSON local
        const response = await fetch("./clima.json");
        if (!response.ok) {
          throw new Error("Erro ao acessar os dados do clima.");
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Verifica se a cidade está presente nos dados e atualiza os estados correspondentes
        if (data.cidades[cidade]) {
          setClima(data.cidades[cidade]);
          setError("");
        } else {
          // Se a cidade não for encontrada, atualiza o estado de erro
          setClima(null);
          setError("Cidade não encontrada");
        }
      } catch (error) {
        // Se ocorrer um erro durante a busca, atualiza o estado de erro
        setClima(null);
        setError("Erro ao buscar os dados do clima.");
      }
    };

    // Chama a função para pesquisar a cidade sempre que o estado 'cidade' mudar
    pesquisarCidade();
  }, [cidade]);

  return (
    <div className={styles.div_buscar}>
      <input
        type="text"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        placeholder="Digite o nome da cidade"
        className={styles.input_buscar}
      />

      {/* Exibe as informações do clima se disponíveis */}
      {clima && (
        <div className={styles.div_status}>
          <h3>Previsão do tempo para {cidade}:</h3>
          <p>Temperatura: {clima.temperatura}</p>
          <p>Condições: {clima.condicoes}</p>
          <p>Ícone: {clima.icone}</p>
        </div>
      )}

      {/* Exibe mensagem de erro se houver */}
      {error && <p className={styles.erro_txt}>{error}</p>}
    </div>
  );
}

export default BuscarCidade;
