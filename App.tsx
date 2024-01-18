import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { SQIPCardEntry, SQIPCore } from 'react-native-square-in-app-payments';



const redirectUri = 'https://your-redirect-uri';

const App = () => {
  useEffect(() => {
    setSquareApp()
  }, []);
  

  const setSquareApp = async () => {
    // ComponentDidMount equivalent

    // ...
    let response = await SQIPCore.setSquareApplicationId('sandbox-sq0idb-yjgs0etD1Lvbx-l-u0Gq5w');
    console.log(response, 'response')
    // Cleanup logic for componentWillUnmount
    return () => {
      // ComponentWillUnmount equivalent
    };
  }

  const authenticateWithSquare = async () => {
    const authUrl = `https://connect.squareupsandbox.com/oauth2/authorize?client_id=your-client-id&redirect_uri=${redirectUri}&response_type=code`;
  
    try {
      const result = await InAppBrowsew.openAuth(authUrl, redirectUri);
      
      // Extract the authorization code from the result and exchange it for an access token
      const authorizationCode = result.code;
  
      // Make a request to Square's Token API to exchange the code for an access token
      // Use the obtained access token for your Square API requests
    } catch (error) {
      console.error('OAuth error:', error);
    }
  };
  
  // Call the authentication function when needed
  authenticateWithSquare();




















  // const onCardEntryComplete = (response) => {
  //   console.log(response, 'response')
  // };

  // const onCardNonceRequestSuccess = async (cardDetails) => {
  //   try {
  //     let response = await SQIPCardEntry.completeCardEntry(onCardEntryComplete);

  //     console.log(response, 'response')
  //   } catch (ex) {
  //     await SQIPCardEntry.showCardNonceProcessingError(ex.message);
  //   }
  // };

  // const onCardEntryCancel = () => {
  // };

  // const onStartCardEntry = async () => {
  //   const cardEntryConfig = {
  //     collectPostalCode: true,
  //   };
  //   await SQIPCardEntry.startCardEntryFlow(
  //     cardEntryConfig,
  //     onCardNonceRequestSuccess,
  //     onCardEntryCancel,
  //   );
  // };

  return (
    <View style={{ flex: 1 }}>
      {/* ... */}
      {/* <Button onPress={onStartCardEntry} title="Start Card Entry" /> */}
    </View>
  );
};

export default App;
