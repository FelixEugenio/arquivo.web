import { useState, FormEvent, useContext } from 'react';
import Head from 'next/head';
import { Header } from '../../components/Header';
import styles from './styles.module.scss';
import { AuthContext } from '../../contexts/AuthContext'; // Importe o contexto de autenticação
import { toast } from 'react-toastify';

export default function Profile() {
  const { user, updateUser } = useContext(AuthContext); // Obtenha a função updateUser do contexto
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');

  async function handleUpdate(event: FormEvent) {
    event.preventDefault();

    if(name === '' || email ==='' || password ===''){
      toast.error('Preencha os campos vazios');
      return;
    }

    try {
      await updateUser({ name, email, password });
      alert('Informações do perfil atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      alert('Erro ao atualizar o perfil. Tente novamente mais tarde.');
    }
  }

  return (
    <>
      <Head>
        <title>Perfil - ArquivoGPT</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Editar informações do Usuário</h1>

          <form className={styles.form} onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Entre com um novo Nome"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Entre com um novo Email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Entre com uma nova Senha"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Editar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
