import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const favoriteCount = useSelector(state => state.favorites.ids.length);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => navigation.navigate('Favorites')}
          style={styles.favoriteIcon}
        >
          <MaterialIcons name="favorite" size={24} color="#FF0000" />
          {favoriteCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{favoriteCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, favoriteCount]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?api_key=aa6fc65fcedb7431af3ac2fbe6484cd0&language=en-US&page=1'
      );
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch movies', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Movie Details', { movieId: item.id })}>
          <MovieCard movie={item} />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  favoriteIcon: {
    marginRight: 15,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});