import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from 'react-redux';
import { store } from './store';

import HomeScreen from "./screens/HomeScreen";
import MovieDetailScreen from "./screens/MovieDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Popular Movies" component={HomeScreen} />
          <Drawer.Screen name="Favorites" component={FavoritesScreen} />
          <Drawer.Screen name="Movie Details" component={MovieDetailScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}