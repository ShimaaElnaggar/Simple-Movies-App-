import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { MaterialIcons, Entypo, FontAwesome5 } from "@expo/vector-icons";

export default function MovieDetailScreen({ route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=aa6fc65fcedb7431af3ac2fbe6484cd0&language=en-US`
      );
      setMovie(response.data);
    } catch (error) {
      console.error("Failed to fetch movie details", error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [movieId]);

  if (!movie)
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );

  const getHoursMinutes = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}min`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`,
        }}
        style={styles.backdrop}
      />

      <Text style={styles.title}>{movie.title}</Text>

      <View style={styles.row}>
        <MaterialIcons name="star" size={20} color="#FFD700" />
        <Text style={styles.textLight}> {movie.vote_average.toFixed(1)} </Text>

        <Entypo
          name="clock"
          size={18}
          color="#ccc"
          style={{ marginLeft: 15 }}
        />
        <Text style={styles.textLight}> {getHoursMinutes(movie.runtime)} </Text>
      </View>

     
      <View style={styles.genres}>
        {movie.genres.map((genre) => (
          <Text key={genre.id} style={styles.genreTag}>
            {genre.name}
          </Text>
        ))}
      </View>

      
      <View style={styles.details}>
        <Text style={styles.detailText}>
          <FontAwesome5 name="calendar-alt" size={14} color="#999" />{" "}
          {movie.release_date}
        </Text>
        <Text style={styles.detailText}>
           Language: {movie.original_language.toUpperCase()}
        </Text>
        <Text style={styles.detailText}>
         {movie.adult ? "+18" : "Family Friendly"}
        </Text>
        <Text style={styles.detailText}> {movie.vote_count} votes</Text>
      </View>

      <Text style={styles.sectionTitle}>Overview</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#1e1e1e" },
  backdrop: { width: "100%", height: 250, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 5 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  textLight: { fontSize: 16, color: "#ccc" },
  genres: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  genreTag: {
    backgroundColor: "#444",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 13,
  },
  details: { marginBottom: 20 },
  detailText: { color: "#aaa", marginBottom: 4, fontSize: 14 },
  sectionTitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 8,
    fontWeight: "bold",
  },
  overview: { fontSize: 15, color: "#ccc", lineHeight: 22 },
});
