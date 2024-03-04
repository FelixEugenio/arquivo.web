// Details.tsx
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Header } from '../../components/Header';
import styles from './syles.module.scss';

interface DetailsProps {
  title: string;
  snippet: string;
  link: string;
  fullContent: string; // Adicionando o campo para o conteúdo completo
}

export default function Details() {
  const router = useRouter();
  const { title, snippet, link, fullContent } = router.query;

  // Definindo valores padrão para evitar 'undefined'
  const pageTitle = title as string || 'Detalhes - ArquivoGPT';
  const pageSnippet = snippet as string || '';
  const pageLink = link as string || '';
  const pageFullContent = fullContent as string || '';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Detalhes</h1>

          <div className={styles.details}>
            <h2>{pageTitle}</h2>
            <p>{pageSnippet}</p>
            <p>{pageFullContent}</p>
          </div>
        </main>
      </div>
    </>
  );
}
