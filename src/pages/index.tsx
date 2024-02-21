import Head from 'next/head'
import styles from '../styles/home.module.scss'
import Image from 'next/image'
import { Input } from '@/components/ui/Input'

import logoImg from '../../public/logo.svg'
export default function Home() {
  return (
    <>
    <Head>
      <title>ArquivoGPT - Faca seu login</title>
    </Head>

    <div className={styles.containerCenter}>
      <Image src={logoImg} alt='Logo ArquivoGPT'/>
      <div className={styles.login}>
        <form>
        <Input 
        placeholder='Digite o seu email'
        type="text"
        />
        <Input
        placeholder='Digite a sua Senha'
        type="password"
        />
        </form>               
      </div> 
    </div>
    </>
  )
}