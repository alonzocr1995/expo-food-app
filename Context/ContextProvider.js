import React, { useCallback, useEffect, useState } from "react";

const authCurrentUser = {};

const AuthContext = React.createContext(authCurrentUser);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");

  const handleUserAuth = useCallback(
    (userAuth) => setCurrentUser(userAuth),
    [setCurrentUser]
  );

  return (
    <AuthContext.Provider value={{ currentUser, handleUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
