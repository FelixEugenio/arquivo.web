import { useContext, FormEvent, useState } from 'react'
import { canSSRGuest } from '@/utils/canSSRGuest';
import Head from 'next/head'
import Image from 'next/image';
import styles from '../styles/home.module.scss';
import { GetServerSideProps } from 'next';
import logoImg from '../../public/logo.svg';

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { toast } from 'react-toastify'

import { AuthContext } from '../contexts/AuthContext'

import Link from 'next/link';

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === ''){
      toast.error("Preencha os campos")
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data)

    setLoading(false);
  }

  return (
    <>
    <Head>
      <title>ArquivoGPT - Faça seu login</title> 
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input
            placeholder="Digite seu email"
            type="text"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

          <Input
            placeholder="Sua senha"
            type="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />
          
          <Button
            type="submit"
            loading={loading}
          >
            Entrar
          </Button>
        </form>

        <Link href="/signup">
           <span className={styles.text}>Nao possui uma conta? Cadastre-se</span>
        </Link>

      </div>
    </div>
    </>
  )
}

export const getServerSideProps:GetServerSideProps = canSSRGuest(async (ctx) => {
  
  return {
    props: {}
  }
})
