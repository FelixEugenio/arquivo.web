// auth.tsx
import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { api } from '../services/apiClient';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { toast } from 'react-toastify';

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type UpdateUserProps = {
  name?: string;
  email?: string;
  password?: string;
};

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
  updateUser: (data: UpdateUserProps) => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, '@arquivoGPT.token');
    Router.push('/');
  } catch {
    console.error('Erro ao deslogar');
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({ id: '', name: '', email: '' });
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@arquivoGPT.token': token } = parseCookies();

    if (token) {
      api.get('/me')
        .then((response) => {
          const { id, name, email } = response.data;
          setUser({ id, name, email });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', { email, password });
      const { id, name, token } = response.data;

      setCookie(undefined, '@arquivoGPT.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setUser({ id, name, email });
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast.success('Logado com sucesso!');
      Router.push('/pesquisa');
    } catch (err) {
      console.error('Erro ao acessar ', err);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post('/users', { name, email, password });

      console.log('CADASTRADO COM SUCESSO!');

      toast.success('Conta criada com sucesso!');
      Router.push('/');
    } catch (err) {
      console.error('Erro ao cadastrar ', err);
    }
  }

  async function updateUser(data: UpdateUserProps) {
    try {
      const response = await api.put(`/users/${user.id}`, data);

      const { id, name, email } = response.data;

      setUser({ id, name, email });
      toast.success('Perfil atualizado com sucesso!');
      Router.push('/profile');
    } catch (err) {
      console.error('Erro ao atualizar o perfil:', err);
      toast.error('Erro ao atualizar o perfil. Tente novamente mais tarde.');
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
