import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const clientId = 'YOUR_CLIENT_ID'

// Endpoint
const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    `https://github.com/settings/connections/applications/${clientId}`,
};

export default function App() {
  // this redirectUri needs to match what you register as the Authorization callback URL on github
  // a local uri will work for development
  const redirectUri = makeRedirectUri()

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ["identity"],
      redirectUri,
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      console.log({ response })
      const { code } = response.params;
    }
  }, [response]);

  return (
    <View style={{ marginTop: 100 }}>

      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}
