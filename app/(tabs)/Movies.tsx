import { Feather } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import MovieApiFetching from '../components/MovieApiFetching';
import MoviesApiTopRated from '../components/MoviesApiTopRated';
import PopularMovies from '../components/PopularMovies';
import CategoryMediaList from '../components/CategorySeriesList';
import CategoryTopRatedCombined from '../components/CategoryTopRatedCombined';

export default function Movies() {

  const pathname=usePathname()
  return (
    <ScrollView className="bg-white" contentContainerStyle={{ paddingBottom: 100 }}>
   
           <MovieApiFetching />
           <View className="flex-row items-center px-4 mt-6 mb-2">
             <Feather name="trending-up" size={20} color="#ef4444" />
             <Text className="text-xl font-bold text-gray-800 ml-2">
               Popular Movies
             </Text>
           </View>
           <PopularMovies />

           <View className="flex-row items-center px-4 mt-4 mb-2">
             <Feather name="star" size={20} color="#ef4444" />
             <Text className="text-xl font-bold text-gray-800 ml-2">
               Top Rated Movies
             </Text>
           </View>
           <MoviesApiTopRated />

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
         </ScrollView>
  );
}
