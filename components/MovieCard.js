import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../favoritesSlice';

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(state => state.favorites.ids);
  const isFavorite = favoriteIds.includes(movie.id);

  const handleFavoritePress = () => {
    if (isFavorite) {
      dispatch(removeFavorite({ id: movie.id, ...movie }));
    } else {
      dispatch(addFavorite({ id: movie.id, ...movie }));
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
        </View>
        <Text style={styles.date}>{movie.release_date}</Text>
      </View>
      <TouchableOpacity 
        onPress={handleFavoritePress} 
        style={styles.favoriteButton}
      >
        <MaterialIcons 
          name={isFavorite ? "favorite" : "favorite-border"} 
          size={24} 
          color={isFavorite ? "#FF0000" : "#fff"} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    flexDirection: 'row', 
    margin: 10, 
    backgroundColor: '#1e1e1e', 
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  poster: { 
    width: 100, 
    height: 150, 
    borderTopLeftRadius: 10, 
    borderBottomLeftRadius: 10 
  },
  info: { 
    flex: 1, 
    padding: 10, 
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: '#FFD700',
    marginLeft: 5,
  },
  date: { 
    fontSize: 14, 
    color: '#aaa' 
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 5,
  },
});