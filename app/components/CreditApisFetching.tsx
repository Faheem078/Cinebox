import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Skeleton from './Skeleton';

type Props = {
  api: string;
};

type Credit = {
  profile_path: string;
  id: number;
  name: string;
  character: string;
  gender: number;
};

export default function CreditApisFetching({ api }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      setProducts(data.cast);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [api]);

  const renderItem = ({ item }: { item: Credit }) => (
    <TouchableOpacity
      className="bg-white rounded-xl shadow-md p-2 m-1 h-72 w-32"
      onPress={() => router.push(`/PersonDetails/${item.id}`)}
    >
      <Image
        className="h-40 w-full rounded-lg bg-gray-100"
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }}
      />
      <View className="mt-2">
        <Text className="text-xs font-semibold text-gray-800" numberOfLines={2}>
          Name: <Text className="text-xs font-normal text-gray-600">{item.name}</Text>
        </Text>
      </View>
      <View>
        <Text className="text-xs font-semibold text-gray-800" numberOfLines={2}>
          Role:<Text className="text-xs font-normal text-gray-600">{item.character}</Text>
        </Text>
      </View>
      <View>
        <Text className="text-xs font-semibold text-gray-800" numberOfLines={2}>
          Gender:<Text className="text-xs font-normal text-gray-600">{item.gender === 2 ? "Male" : "Female"}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View className="flex-row items-center px-4 mt-4 mb-2">
        <Feather name="users" size={20} color="#ef4444" />
        <Text className="text-xl font-bold text-gray-800 ml-2">Characters</Text>
      </View>
      {loading ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-white px-2">
          {[...Array(5)].map((_, i) => (
            <View key={i} className="p-2 m-1 w-32">
              <Skeleton width={112} height={160} borderRadius={10} />
              <Skeleton width={90} height={10} borderRadius={6} style={{ marginTop: 8 }} />
              <Skeleton width={70} height={10} borderRadius={6} style={{ marginTop: 6 }} />
              <Skeleton width={60} height={10} borderRadius={6} style={{ marginTop: 6 }} />
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
