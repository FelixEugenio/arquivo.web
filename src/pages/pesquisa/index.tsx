// Pesquisa.tsx
import { useState, FormEvent } from 'react';
import { canSSRAuth } from '../../utils/canSSRAuth';
import Head from 'next/head';
import { Header } from '../../components/Header';
import styles from './styles.module.scss';
import axios from 'axios';
import Link from 'next/link';

interface SearchResult {
  title: string;
  snippet: string;
  link: string;
  fullContent: string; // Adicionando o campo para o conteúdo completo
}

export default function Pesquisa() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Helper function to strip HTML tags
  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await axios.get(`https://arquivo.pt/textsearch?q=${search}`);
      const results: SearchResult[] = response.data.response_items.map((result: { snippet: string; title: string; link: string; }) => ({
        ...result,
        snippet: stripHtmlTags(result.snippet),
        fullContent: '', // Inicializando com uma string vazia, será preenchido posteriormente
      }));

      setSearchResults(results);

      // Atualizar os detalhes para incluir o conteúdo completo
      for (const result of results) {
        const fullContentResponse = await axios.get(`https://arquivo.pt/pages/${result.link}`);
        const fullContent = stripHtmlTags(fullContentResponse.data);
        result.fullContent = fullContent;
      }

      setSearchResults([...results]);  // Atualiza o estado
    } catch (error) {
      console.error('Erro ao buscar informações do Arquivo.pt:', error);
    }
  }

  return (
    <>
      <Head>
        <title>Pesquisar - ArquivoGPT</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Pesquisar</h1>

          <form className={styles.form} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Pesquise Qualquer Coisa"
              className={styles.input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Pesquisar
            </button>
          </form>

          {/* Seção de Resultados */}
          {searchResults.length > 0 && (
            <div className={styles.results}>
              <h2>Resultados da Pesquisa</h2>
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index}>
                    <h3>{result.title}</h3>
                    <p>{result.snippet}</p>
                    <Link href={`/details?title=${encodeURIComponent(result.title)}&snippet=${encodeURIComponent(result.snippet)}&link=${encodeURIComponent(result.link)}&fullContent=${encodeURIComponent(result.fullContent)}`}>
                      <span>
                        Ver mais
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
