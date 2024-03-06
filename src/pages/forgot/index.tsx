// Pesquisa.tsx
import { useState } from 'react';
import styles from './styles.module.scss';


export default function ForgotPassword() {
  const [email, setEmail] = useState('');


  return (
    <>
      
        <title>Resetar Password - ArquivoGPT</title>
      
      <div>

        <main className={styles.container}>
          <h1>Resetar Password</h1>

          <form className={styles.form}>
            <input
              type="text"
              placeholder="Entre com o seu endereço de Email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Enviar Link
            </button>
          </form>

          {/* Seção de Resultados */}
        </main>
      </div>
    </>
  );
}

