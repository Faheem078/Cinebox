import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Skeleton from "./Skeleton";

type Series = {
  id: number;
  poster_path: string | null;
  title?: string;
  name?: string;
};

type Props = {
  query: string;
  mediaType?: "tv" | "movie";
};

const API_KEY = "4e7783a6a3bf804ec4011f13935e14b8";

export default function CategoryMediaList({ query, mediaType = "tv" }: Props) {
  const [results, setResults] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${mediaType === "movie" ? "search/movie" : "search/tv"}?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
        );
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [query, mediaType]);

  if (loading) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-white px-2">
        {[...Array(5)].map((_, i) => (
          <View key={i} className="p-2 m-1 w-32">
            <Skeleton width={112} height={160} borderRadius={10} />
            <Skeleton width={80} height={12} borderRadius={6} style={{ marginTop: 8 }} />
          </View>
        ))}
      </ScrollView>
    );
  }

  if (!results.length) {
    return (
      <View className="px-4 py-6">
        <Text className="text-sm text-gray-500">No results found for {query}.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Series }) => (
    <TouchableOpacity
      onPress={() => router.push(`/SeriesDetails/${item.id}`)}
      className="bg-white rounded-xl shadow-md p-2 m-1 w-32"
    >
      <Image
        className="h-40 w-full rounded-lg bg-gray-100"
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
      />
      <View className="mt-2">
        <Text className="text-xs font-semibold text-gray-800" numberOfLines={2}>
          {item.title || item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      className="bg-white"
    />
  );
}
