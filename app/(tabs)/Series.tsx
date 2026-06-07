import { Feather } from '@expo/vector-icons'
import { usePathname } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import PopularSeries from '../components/PopularSeries'
import SeriesApiFetching from '../components/SeriesApiFetching'
import SeriesApiTopRated from '../components/SeriesApiTopRated'
import CategoryMediaList from '../components/CategorySeriesList'
import CategoryTopRatedCombined from '../components/CategoryTopRatedCombined'

export default function TvSeries() {
  const pathname = usePathname()
  return (
    <ScrollView className="bg-white" contentContainerStyle={{ paddingBottom: 100 }}>

      <SeriesApiFetching />

      <View className="flex-row items-center px-4 mt-6 mb-2">
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
      <CategoryTopRatedCombined />
    </ScrollView>
  )
}