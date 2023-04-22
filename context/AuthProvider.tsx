import React, { createContext, useEffect, useState } from 'react';
import Web3 from 'web3';

type AuthContextType = {
  isAuthenticated: boolean;
  account: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  account: null,
  login: async () => {},
  logout: async () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  let web3: any;

  const login = async () => {
    try {
        const accounts = await web3.eth.requestAccounts();
        const currentAccount = accounts[0];
        setIsAuthenticated(true);
        setAccount(currentAccount);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setAccount(null);
    }
  };

  const logout = async() => {
    setIsAuthenticated(false);
    setAccount(null);
  };

  useEffect(() => {
    (async function(window: any) {
      web3 = new Web3(window.ethereum);
    })(window)

    const interval = setInterval(async () => {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
          setIsAuthenticated(false);
          setAccount(null);
        }
    }, 60000); // run every minute

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, account, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
