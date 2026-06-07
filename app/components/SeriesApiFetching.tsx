import { useRouter } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import Skeleton from "./Skeleton";

const { width: screenWidth } = Dimensions.get("window");

type Movie = {
  id: number;
  title: string;
  name: string;
  vote_average: number;
  backdrop_path: string;
};

export default function SeriesApiFetching() {
  const [products, setProducts] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchApi = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/on_the_air?api_key=4e7783a6a3bf804ec4011f13935e14b8"
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

  if (loading) {
    return (
      <View style={{ width: screenWidth, height: 220, paddingHorizontal: 16 }}>
        <Skeleton width={screenWidth - 32} height={220} borderRadius={12} />
      </View>
    );
  }

  const renderItem = ({ item }: { item: Movie }) => {
    const rating = item.vote_average / 2;
    return (
      <TouchableOpacity
        onPress={() => router.push(`/SeriesDetails/${item.id}`)}
        key={item.id}
        className="w-full h-full relative opacity-80"
      >
        <Image
          className="w-full h-full rounded-md"
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
        />
        <Text className="absolute bottom-12 left-6 text-lg font-extrabold text-white">
          {item.title || item.name}
        </Text>
        <View className="absolute bottom-4 left-4">
          <StarRatingDisplay rating={rating} starSize={20} color="gold" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="items-center justify-center bg-white">
      {products.length > 0 && (
        <Carousel
          loop
          autoPlay
          autoPlayInterval={1000}
          scrollAnimationDuration={2000}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 44,
            parallaxAdjacentItemScale: 0.75,
          }}
          width={screenWidth}
          height={220}
          data={products}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}
