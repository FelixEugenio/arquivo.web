import Head from 'next/head'
import styles from '../styles/home.module.scss'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

import Link from 'next/link'
import logoImg from '../../public/logo.svg'
export default function Home() {
  return (
    <>
    <Head>
      <title>ArquivoGPT - Faça seu login</title> 
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

      <div className={styles.login}>
        <form>
          <Input
            placeholder="Digite seu email"
            type="text"
          />

          <Input
            placeholder="Sua senha"
            type="password"
          />
          
          <Button
            type="submit"
            loading={false}
          >
            Acessar
          </Button>
        </form>

          <Link href='/signup'>
          <span className={styles.text}>Nao possui uma conta? Cadastre-se</span>
          </Link>
        

      </div>
    </div>
    </>
  )
}