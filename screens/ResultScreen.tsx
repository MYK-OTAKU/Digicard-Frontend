import React from 'react';
import { Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type RootStackParamList = {
  Result: { data: string };
};

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

export default function ResultScreen() {
  const route = useRoute<ResultScreenRouteProp>();
  const { data } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>URL: {data}</Text>
    </View>
  );
}
