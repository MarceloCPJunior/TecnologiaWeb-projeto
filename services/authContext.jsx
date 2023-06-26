import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [tokenExists, setTokenExists] = useState(false);
  const [movieId, setMovieId] = useState(0);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, [userEmail]);

  const updateUserEmail = (email) => {
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  };

  return (
    <AuthContext.Provider value={{ tokenExists, setTokenExists, movieId, setMovieId, userEmail, updateUserEmail  }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;