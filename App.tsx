import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { SQIPCore, SQIPCardEntry } from 'react-native-square-in-app-payments';
import axios from 'react-native-axios'


export default async function chargeCardNonce(
  nonce: string,
  verificationToken = undefined,
) {
  let body;
  if (verificationToken === undefined) {
    body = JSON.stringify({
      nonce,
    });
  } else {
    body = JSON.stringify({
      nonce,
      verificationToken,
    });
  }
  const response = await fetch(`http://192.168.0.33:3002/chargeForCookie`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  });

  try {
    const responseJson = await response.json();
    console.log(responseJson, 'responseJson')
    if (responseJson.errorMessage != null) {
      console.error(responseJson.errorMessage);
    }
  } catch (error: any) {
    console.error(error.message);
  }
}


const App = () => {
  useEffect(() => {
    const initializeSquare = async () => {
      await SQIPCore.setSquareApplicationId('sandbox-sq0idb-yjgs0etD1Lvbx-l-u0Gq5w');
      // ... other initialization logic
    };

    initializeSquare();
  }, []);


  // const callApi = async () => {
  //   var raw = "";

  //   var requestOptions = {
  //     method: 'POST',
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   fetch("http://localhost:3001/chargeForCookie", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // };


  const callApi = async () => {
    try {
      // console.log("client")
      // // Replace 'localhost' with the actual IP address or hostname of your API server
      // const apiUrl = 'http://192.168.0.33:3002/chargeForCookie';

      // const response = await axios.post(apiUrl, {
      //   // You can include request parameters here
      //   // key: 'value',
      // });
      // console.log("response", response)

      // 
      // setResult(response.data);
      // await chargeCardNonce(
      //   buyerVerificationDetails.nonce,
      //   buyerVerificationDetails.token,
      // );
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };













  const onCardEntryComplete = () => {
    // Update UI to notify user that the payment flow is completed
  };

  const onCardNonceRequestSuccess = async (cardDetails) => {
    try {

      // console.log(cardDetails, 'cardDetailscardDetails')


      await chargeCardNonce(cardDetails?.nonce);


      // take payment with the card details
      // await chargeCard(cardDetails);

      // payment finished successfully
      // you must call this method to close card entry
      await SQIPCardEntry.completeCardEntry(onCardEntryComplete);
    } catch (ex) {
      // payment failed to complete due to error
      // notify card entry to show processing error
      await SQIPCardEntry.showCardNonceProcessingError(ex.message);
    }
  };

  const onCardEntryCancel = () => {
    // Handle the cancel callback
  };

  const onStartCardEntry = async () => {
    const cardEntryConfig = {
      collectPostalCode: false,
    };
    await SQIPCardEntry.startCardEntryFlow(
      cardEntryConfig,
      onCardNonceRequestSuccess,
      onCardEntryCancel,
    );
  };

  return (
    <View style={styles.container}>
      {/* ... other components */}
      <Button onPress={onStartCardEntry} title="Start Card Entry" />
    </View>
  );
};

const styles = {
  container: {
    // Your container styles
  },
};

export default App;
