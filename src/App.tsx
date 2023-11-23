import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import SongsProvider from "./context/songContext/songContext";
import { Auth0Provider } from "@auth0/auth0-react";
import { Toaster } from "react-hot-toast";

const {
  VITE_AUTH0_DOMAIN: domain,
  VITE_AUTH0_CLIENT_ID: clientId,
  VITE_AUTH0_AUDIENCE: audience,
} = import.meta.env;

const redirectUri: string = window.location.origin + "/home";

export const App = () => {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
      }}
    >
      <SongsProvider>
        <BrowserRouter>
          <AppRouter />
          <Toaster
            toastOptions={{
              success: {
                style: {
                  background: "#282828",
                  color: "#fff",
                },
              },
            }}
          />
        </BrowserRouter>
      </SongsProvider>
    </Auth0Provider>
  );
};
