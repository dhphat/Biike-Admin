import { message } from "antd";
import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation } from "react-query";
import { authQueryFns } from "./api/auth";
import { User } from "./api/user";

export interface LocalUser {
  id: number;
  token: string;
  refresh_token: string;
}

interface AuthState {
  user?: User;
  isAuthenticating?: boolean;
  signin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const localUserKey = "local_user";

const AuthContext = createContext<AuthState>({} as AuthState);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [authUser, setAuthUser] = useState<User>();
  const [isAuthenticating, setIsAuthenticating] = useState(true);

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
          logout();
        })
        .finally(() => setIsAuthenticating(false));
    } catch (error) {
      setIsAuthenticating(false);
      logout();
    }
  }, []);

  const signin = async (email: string, password: string) => {
    const loginResponse = await loginMutation.mutateAsync(
      {
        email,
        password,
        isAdmin: true,
      },
      {
        onError: () => {
          message.error({
            content: "Your email/password does not match!",
          });
        },
      }
    );

    if (loginResponse.data) {
      localStorage.setItem(
        localUserKey,
        JSON.stringify({
          id: loginResponse.data.userId,
          token: loginResponse.data.idToken,
        })
      );

      const userResponse = await verifyUserMutation.mutateAsync(
        loginResponse.data.userId,
        {
          onError: (error) => {
            console.log(error);
          },
        }
      );
      if (userResponse.data) {
        setAuthUser(userResponse.data);
        return Promise.resolve(true);
      } else {
        logout();
      }
    }
    return Promise.resolve(false);
  };

  const logout = () => {
    setAuthUser(undefined);
    localStorage.removeItem(localUserKey);
  };

  return (
    <AuthContext.Provider
      value={{ user: authUser, isAuthenticating, signin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
