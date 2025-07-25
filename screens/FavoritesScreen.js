import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';

export default function FavoritesScreen({ navigation }) {
  const favoriteMovies = useSelector(state => state.favorites.movies);

  return (
    <View style={styles.container}>
      {favoriteMovies.length > 0 ? (
        <FlatList
          data={favoriteMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('Movie Details', { movieId: item.id })}
            >
              <MovieCard movie={item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="favorite-border" size={50} color="#555" />
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubText}>Tap the heart icon on movies to add them</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  emptySubText: {
    color: '#888',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});