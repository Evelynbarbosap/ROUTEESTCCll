import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './views/screens/LoginScreen';
import BeginScreen from './views/screens//BeginScreen';
import FeedScreen from './views/screens//FeedScreen';
import PerfilUserScreen from './views/screens//PerfilUserScreen';
import RegisterUserScreen from './views/screens//RegisterUserScreen';
import RecommendationScreen from './views/screens//RecommendationScreen';
import RouteScreen from './views/screens//RouteScreen';

const Stack = createStackNavigator();

export default function Route() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="BeginScreen" component={BeginScreen} />
        <Stack.Screen name="RegisterUserScreen" component={RegisterUserScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RecommendationScreen" component={RecommendationScreen} />
        <Stack.Screen name="PerfilUserScreen" component={PerfilUserScreen} />
        <Stack.Screen name="FeedScreen" component={FeedScreen} />
        <Stack.Screen name="RouteScreen" component={RouteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


