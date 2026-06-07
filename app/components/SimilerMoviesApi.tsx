import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Skeleton from './Skeleton';

type Similer = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
};

export default function SimilerMoviesApi() {
  const [products, setProducts] = useState<Similer[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const fetchApi = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=4e7783a6a3bf804ec4011f13935e14b8`
      );
      const data = await response.json();
      setProducts(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const renderItem = ({ item }: { item: Similer }) => (
    <TouchableOpacity
      onPress={() => router.push(`/DetailsPage/${item.id}`)}
      className="bg-white rounded-xl shadow-md p-2 m-1 h-68 w-32"
    >
      <Image
        className="h-40 w-full rounded-lg bg-gray-100"
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
      />
      <View className="mt-2">
        <Text className="text-xs font-semibold text-gray-800" numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View className="flex-row items-center px-4 mt-4 mb-2">
        <Feather name="film" size={20} color="#ef4444" />
        <Text className="text-xl font-bold text-gray-800 ml-2">Similar Movies</Text>
      </View>
      {loading ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-white px-2">
          {[...Array(5)].map((_, i) => (
            <View key={i} className="p-2 m-1 w-32">
              <Skeleton width={112} height={160} borderRadius={10} />
              <Skeleton width={80} height={12} borderRadius={6} style={{ marginTop: 8 }} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="bg-white"
        />
      )}
    </>
  );
}
