import { Feather } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import MovieApiFetching from "../components/MovieApiFetching";
import MoviesApiTopRated from "../components/MoviesApiTopRated";
import PopularMovies from "../components/PopularMovies";
import SeriesApiTopRated from "../components/SeriesApiTopRated";
import PopularSeries from "../components/PopularSeries";
import CategoryMediaList from "../components/CategorySeriesList";
import CategoryTopRatedCombined from "../components/CategoryTopRatedCombined";

export default function Home() {
  return (
    <>

      <ScrollView className="bg-white" contentContainerStyle={{ paddingBottom: 100 }}>

        <MovieApiFetching />

        <View className="flex-row items-center px-4 mt-4 mb-2">
          <Feather name="star" size={20} color="#ef4444" />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            Top Rated Movies
          </Text>
        </View>
        <MoviesApiTopRated />

        <View className="flex-row items-center px-4 mt-4 mb-2">
          <Feather name="trending-up" size={20} color="#ef4444" />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            Popular Movies
          </Text>
        </View>
        <PopularMovies />

        <View className="flex-row items-center px-4 mt-6 mb-2">
          <Feather name="film" size={20} color="#ef4444" />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            Hollywood Movies
          </Text>
        </View>
        <CategoryMediaList query="Hollywood" mediaType="movie" />

        <View className="flex-row items-center px-4 mt-6 mb-2">
          <Feather name="book" size={20} color="#ef4444" />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            Animes Movies
          </Text>
        </View>
        <CategoryMediaList query="anime" mediaType="movie" />

        <View className="flex-row items-center px-4 mt-6 mb-2">
          <Feather name="star" size={20} color="#ef4444" />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            Bollywood Movies
          </Text>
        </View>
        <CategoryMediaList query="Bollywood" mediaType="movie" />

        <View className="flex-row items-center px-4 mt-6 mb-2">
          <Feather name="music" size={20} color="#ef4444" />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            Punjabi Movies
          </Text>
        </View>
        <CategoryMediaList query="Punjabi" mediaType="movie" />

        <View className="flex-row items-center px-4 mt-6 mb-2">
          <Feather name="award" size={20} color="#ef4444" />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            Top Rated Category Movies
          </Text>
        </View>
        <CategoryTopRatedCombined mediaType="movie" />

        <View className="flex-row items-center px-4 mt-8 mb-2">
          <Feather name="tv" size={20} color="#ef4444" />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            Top Rated Series
          </Text>
        </View>
        <SeriesApiTopRated />

        <View className="flex-row items-center px-4 mt-4 mb-2">
          <Feather name="trending-up" size={20} color="#ef4444" />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            Popular Series
          </Text>
        </View>
        <PopularSeries />

        <View className="flex-row items-center px-4 mt-6 mb-2">
          <Feather name="film" size={20} color="#ef4444" />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            Hollywood Series
          </Text>
        </View>
        <CategoryMediaList query="Hollywood" mediaType="tv" />

        <View className="flex-row items-center px-4 mt-6 mb-2">
          <Feather name="book" size={20} color="#ef4444" />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            Animes
          </Text>
        </View>
        <CategoryMediaList query="anime" mediaType="tv" />

        <View className="flex-row items-center px-4 mt-6 mb-2">
          <Feather name="star" size={20} color="#ef4444" />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            Bollywood Series
          </Text>
        </View>
        <CategoryMediaList query="Bollywood" mediaType="tv" />

        <View className="flex-row items-center px-4 mt-6 mb-2">
          <Feather name="music" size={20} color="#ef4444" />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            Punjabi Series
          </Text>
        </View>
        <CategoryMediaList query="Punjabi" mediaType="tv" />

        <View className="flex-row items-center px-4 mt-6 mb-2">
          <Feather name="award" size={20} color="#ef4444" />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            Top Rated Category Series
          </Text>
        </View>
        <CategoryTopRatedCombined mediaType="tv" />
      </ScrollView>

    </>

  );
}
