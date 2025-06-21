import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import DiseaseDetailScreen from './src/screens/DiseaseDetailScreen';
import ImagePredictScreen from './src/screens/ImagePredictScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Ứng dụng Phát hiện Bệnh Lúa' }} 
        />
        <Stack.Screen 
          name="DiseaseDetail" 
          component={DiseaseDetailScreen} 
          options={{ title: 'Chi tiết Bệnh' }} 
        />
          <Stack.Screen
              name="ImagePredict"
              component={ImagePredictScreen}
          />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}