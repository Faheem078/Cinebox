import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import SearchBar from "./SearchBar";
import Skeleton from "./Skeleton";

type Movie = {
  id: number;
  poster_path: string;
  title: string;
  name: string;
  vote_average: number;
  release_date: string;
  first_air_date: string;
  media_type: string;
};

export default function SearchPage() {
  const [inputValue, setInputValue] = useState('');
  const [products, setProducts] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchApi = async () => {
    setLoading(true);
    try {
      let response;
      if (inputValue === "") {
        response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=4e7783a6a3bf804ec4011f13935e14b8"
        );
      } else {
        response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=4e7783a6a3bf804ec4011f13935e14b8&query=${inputValue}`
        );
      }
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
  }, [inputValue]);

  const SkeletonItem = () => (
    <View className="flex-row items-start bg-white rounded-xl shadow-md p-2 m-2">
      <Skeleton width={96} height={128} borderRadius={10} />
      <View className="flex justify-center pl-3 flex-1">
        <Skeleton width="80%" height={16} borderRadius={6} />
        <Skeleton width={100} height={14} borderRadius={6} style={{ marginTop: 10 }} />
        <Skeleton width={80} height={12} borderRadius={6} style={{ marginTop: 10 }} />
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: Movie }) => {
    const rating = item.vote_average / 2;
    return (
      <TouchableOpacity
        onPress={() =>
          item.media_type === "movie"
            ? router.push(`/DetailsPage/${item.id}`)
            : router.push(`/SeriesDetails/${item.id}`)
        }
        className="flex-row items-start bg-white rounded-xl shadow-md p-2 m-2"
      >
        <Image
          className="h-32 w-24 rounded-lg bg-gray-100"
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        />
        <View className="flex justify-center pl-3 w-2/3">
          <Text className="text-base font-semibold text-gray-800 mb-1" numberOfLines={2}>
            {item.title || item.name}
          </Text>
          <StarRatingDisplay rating={rating} starSize={18} color="gold" />
          <Text className="text-xs text-gray-600 mt-1">
            {item.release_date || item.first_air_date}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SearchBar inputValue={inputValue} setInputValue={setInputValue} />

      {loading ? (
        <FlatList
          data={[...Array(8)]}
          keyExtractor={(_, i) => i.toString()}
          renderItem={() => <SkeletonItem />}
          showsVerticalScrollIndicator={false}
          className="bg-white"
        />
      ) : products.length === 0 ? (
        <View className="items-center justify-center mt-10">
          <Text className="text-gray-500 text-base">No results found</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          className="bg-white"
        />
      )}
    </>
  );
}
