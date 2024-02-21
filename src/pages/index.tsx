import { useContext, FormEvent, useState } from 'react';
import { z } from 'zod';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/home.module.scss';

import logoImg from '../../public/logo.svg';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

import { AuthContext } from '../contexts/AuthContext';

import Link from 'next/link';

const signInSchema = z.object({
  email: z.string().email('Por favor, insira um email válido'),
  password: z.string(),
});

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    // Verificar se os campos estão preenchidos
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Validar os dados com o esquema Zod
    try {
      signInSchema.parse({
        email,
        password,
      });

      // Se a validação for bem-sucedida, limpe os erros
      setError(null);

      // Continuar com a lógica de autenticação
      await signIn({ email, password });
    } catch (error) {
      // Se houver um erro de validação, definir a mensagem de erro
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      }
    }
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={false}>
              Acessar
            </Button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>

          <Link href="/signup">
            <span className={styles.text}>Não possui uma conta? Cadastre-se</span>
          </Link>
        </div>
      </div>
    </>
  );
}
