// ScanScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Définition des types pour la navigation
type RootStackParamList = {
  Result: { data: string };
};

type ScanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;

export default function ScanScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation<ScanScreenNavigationProp>();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    navigation.navigate('Result', { data });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="bars" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      >
      </CameraView>

      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}

      <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton}>
          <Icon name="history" size={24} color="#000" />
          <Text style={styles.footerButtonText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chooseButton}>
          <Icon name="photo-library" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="favorite" size={24} color="#000" />
          <Text style={styles.footerButtonText}>Favorites</Text>
        </TouchableOpacity>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }, 
   menuButton: {
    marginRight: 16,
  },
  toggleButton: {
    marginLeft: 10,
  },
  camera: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerButton: {
    padding: 10,
  },
  chooseButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  }, 
  footerButtonText: {
    color: '#000', // Couleur noire pour le texte
    marginTop: 4,
    fontSize: 14,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
  },
});
