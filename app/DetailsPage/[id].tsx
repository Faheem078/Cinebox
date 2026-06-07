import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CreditsMoviesAPi from '../components/CreditsMoviesAPi';
import SimilerMoviesApi from '../components/SimilerMoviesApi';
import Skeleton from '../components/Skeleton';
import Topbar from '../components/Topbar';


export default function DetailsPage() {
    const { id } = useLocalSearchParams();
    const router = useRouter();


    type Movie = {
        id: number;
        backdrop_path: string;
        title: string;
        name: string;
        overview: string;
    }
    const [products, setProducts] = useState<Movie>();
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    

    const fetchApi = async () => {
        try {
           const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e7783a6a3bf804ec4011f13935e14b8`);
           const data = await response.json();
           setProducts(data);

           // Fetch trailers
           const videosRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=4e7783a6a3bf804ec4011f13935e14b8`);
           const videosData = await videosRes.json();
           const trailer = videosData.results?.find((video: any) => video.site === 'YouTube' && video.type === 'Trailer');
           if (trailer) {
               setTrailerKey(trailer.key);
           }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApi();
    }, [id]);

    if (!products) {
        return (
            <View className="flex-1 bg-white">
                <Topbar />
                <View className="p-4">
                    <Skeleton width="100%" height={240} borderRadius={12} />
                    <Skeleton width="80%" height={24} borderRadius={8} style={{ marginTop: 16 }} />
                    <Skeleton width="100%" height={16} borderRadius={6} style={{ marginTop: 12 }} />
                    <Skeleton width="100%" height={16} borderRadius={6} style={{ marginTop: 8 }} />
                    <Skeleton width="60%" height={16} borderRadius={6} style={{ marginTop: 8 }} />
                </View>
            </View>
        );
    }
    
    return (
        <View className="flex-1 bg-white relative">
            <Topbar />
            <ScrollView>
                <SafeAreaView edges={['bottom']}>
                    <View className="relative">
                        <Image
                            className="h-60 w-full rounded-lg bg-gray-100"
                            source={{
                                uri: `https://image.tmdb.org/t/p/w500${products.backdrop_path}`,
                            }}
                        />
                        {/* Play Trailer overlay */}
                        {trailerKey && (
                            <TouchableOpacity 
                                className="absolute inset-0 justify-center items-center bg-black/10"
                                onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${trailerKey}`)}
                            >
                                <View className="bg-black/60 p-4 rounded-full border border-white/20 shadow-lg">
                                    <Ionicons name="play" size={32} color="white" />
                                </View>
                                <Text className="text-white font-bold text-xs mt-2 shadow-md">Watch Trailer</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    
                    <View className="mt-3 p-4">
                        <Text className="text-xl font-semibold text-gray-800">
                            {products.title || products.name}
                        </Text>
                        <Text className="text-sm text-gray-600 mt-2" numberOfLines={4}>
                            {products.overview}
                        </Text>
                    </View>

                    <CreditsMoviesAPi />
                    <SimilerMoviesApi />
                </SafeAreaView>
            </ScrollView>

            <TouchableOpacity 
                className="absolute top-24 left-4 p-2 bg-black/50 rounded-full z-10 mt-4"
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};
