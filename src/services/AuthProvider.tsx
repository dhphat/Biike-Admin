import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery } from "react-query";
import { authQueryFns } from "./api/auth";
import { User } from "./api/user";

export interface LocalUser {
  id: number;
  token: string;
  refresh_token: string;
}

interface AuthState {
  user?: User;
  signin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const localUserKey = "local_user";

const AuthContext = createContext<AuthState>({} as AuthState);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [authUser, setAuthUser] = useState<User>();

  const loginMutation = useMutation(authQueryFns.login);
  const verifyUserMutation = useMutation(authQueryFns.verifyUser);

  useEffect(() => {
    const stringLocalUser = localStorage.getItem(localUserKey) || "";
    try {
      const objectLocalUser: LocalUser = JSON.parse(stringLocalUser);
      verifyUserMutation
        .mutateAsync(objectLocalUser.id)
        .then((res) => {
          setAuthUser(res.data);
        })
        .catch(() => {
          throw new Error("");
        });
    } catch (error) {
      setAuthUser(undefined);
      localStorage.removeItem(localUserKey);
    }
  }, []);

  const signin = async (email: string, password: string) => {
    const { data } = loginMutation.mutateAsync();
  };

  const logout = () => {
    setAuthUser(undefined);
    localStorage.removeItem(localUserKey);
  };

  return (
    <AuthContext.Provider value={{ user: authUser, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
