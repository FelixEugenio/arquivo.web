import Head from 'next/head'
import styles from '../styles/home.module.scss'
import Image from 'next/image'

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
          <input type='text'/>
        </form>

      </div>
    </div>
    </>
  )
}