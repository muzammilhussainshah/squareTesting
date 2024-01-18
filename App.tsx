import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { SQIPCore, SQIPCardEntry } from 'react-native-square-in-app-payments';

const App = () => {
  useEffect(() => {
    const initializeSquare = async () => {
      await SQIPCore.setSquareApplicationId('sandbox-sq0idb-yjgs0etD1Lvbx-l-u0Gq5w');
      // ... other initialization logic
    };

    initializeSquare();
  }, []);

  const onCardEntryComplete = () => {
    // Update UI to notify user that the payment flow is completed
  };

  const onCardNonceRequestSuccess = async (cardDetails) => {
    try {

      console.log(cardDetails,'cardDetailscardDetails')




      
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
