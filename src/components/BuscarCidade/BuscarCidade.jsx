import React, { useState, useEffect } from "react";
import styles from "./BuscarCidade.module.css";

function BuscarCidade() {
  const [cidade, setCidade] = useState("");
  const [clima, setClima] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const pesquisarCidade = async () => {
      if (!cidade) return;

      try {
        const response = await fetch("./clima.json");
        if (!response.ok) {
          throw new Error("Erro ao acessar os dados do clima.");
        }

        const data = await response.json();

        if (data.cidades[cidade]) {
          setClima(data.cidades[cidade]);
          setError("");
        } else {
          setClima(null);
          setError("Cidade não encontrada");
        }
      } catch (error) {
        setClima(null);
        setError("Erro ao buscar os dados do clima.");
      }
    };

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

      {clima && (
        <div className={styles.div_status}>
          <h3>Previsão do tempo para {cidade}:</h3>
          <p>Temperatura: {clima.temperatura}</p>
          <p>Condições: {clima.condicoes}</p>
          <p>Ícone: {clima.icone}</p>
        </div>
      )}

      {error && <p className={styles.erro_txt}>{error}</p>}
    </div>
  );
}

export default BuscarCidade;
