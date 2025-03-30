import React, { createContext, ReactNode, useState, useContext } from 'react';

// Tipagem dos dados de um usuário
interface UserData {
  nome: string;
  cpf: string;
  senha: string;
  chavePix: string;
  numeroCartao: string;
  dataExpiracaoCartao: string;
  saldo: number;
}

// Tipagem do contexto
type UserContextData = {
  usuarios: UserData[];
  criarConta: (nome: string, cpf: string, senha: string) => boolean;
  login: (cpf: string, senha: string) => UserData | null;
  logout: () => void;
  usuarioLogado: UserData | null;
  updateChavePix: (novaChave: string) => void; // Adicionado método updateChavePix
};

// Tipagem do provider
interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextData>({
  usuarios: [],
  criarConta: () => false,
  login: () => null,
  logout: () => {},
  usuarioLogado: null,
  updateChavePix: () => {}, // Inicializando função vazia
});

const gerarNumeroCartao = (): string => {
  let numero = '';
  for (let i = 0; i < 7; i++) {
    numero += Math.floor(Math.random() * 10);
  }
  return `${numero}-${Math.floor(Math.random() * 10)}`;
};

const gerarDataExpiracao = (): string => {
  const mes = Math.floor(Math.random() * 12) + 1;
  const ano = Math.floor(Math.random() * 5) + 25;
  return `${mes < 10 ? `0${mes}` : mes}/${ano}`;
};

const verificarUsuarioExistente = (usuarios: UserData[], cpf: string): boolean => {
  return usuarios.some(usuario => usuario.cpf === cpf);
};

function UserProvider({ children }: UserProviderProps) {
  const [usuarios, setUsuarios] = useState<UserData[]>([]);
  const [usuarioLogado, setUsuarioLogado] = useState<UserData | null>(null);

  const criarConta = (nome: string, cpf: string, senha: string): boolean => {
    const chavePix = `pix-${Math.floor(Math.random() * 100000000)}`;
    const numeroCartao = gerarNumeroCartao();
    const dataExpiracaoCartao = gerarDataExpiracao();

    if (verificarUsuarioExistente(usuarios, cpf)) {
      return false;
    }

    const novoUsuario: UserData = {
      nome,
      cpf,
      senha,
      chavePix,
      numeroCartao,
      dataExpiracaoCartao,
      saldo: 0,
    };

    setUsuarios([...usuarios, novoUsuario]);
    return true;
  };

  const login = (cpf: string, senha: string): UserData | null => {
    const usuario = usuarios.find(u => u.cpf === cpf && u.senha === senha);
    if (usuario) {
      setUsuarioLogado(usuario);
      return usuario;
    }
    return null;
  };

  const logout = () => {
    setUsuarioLogado(null);
  };

  const updateChavePix = (novaChave: string) => {
    if (usuarioLogado) {
      const usuarioAtualizado = { ...usuarioLogado, chavePix: novaChave };
      setUsuarioLogado(usuarioAtualizado);

      // Atualiza lista de usuários
      setUsuarios(prevUsuarios =>
        prevUsuarios.map(user => (user.cpf === usuarioLogado.cpf ? usuarioAtualizado : user))
      );
    }
  };

  return (
    <UserContext.Provider value={{ usuarios, criarConta, login, logout, usuarioLogado, updateChavePix }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

export const useUser = () => useContext(UserContext);
