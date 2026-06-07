import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Skeleton from '../components/Skeleton';

type Person = {
    id: number;
    name: string;
    biography: string;
    profile_path: string;
    known_for_department: string;
    place_of_birth: string;
    birthday: string;
};

type MovieCredit = {
    id: number;
    title: string;
    poster_path: string;
    character: string;
};

export default function PersonDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [person, setPerson] = useState<Person | null>(null);
    const [movies, setMovies] = useState<MovieCredit[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPersonDetails = async () => {
        try {
            const apiKey = '4e7783a6a3bf804ec4011f13935e14b8';

            // Fetch Person Info
            const personRes = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`);
            const personData = await personRes.json();

            // Fetch Movie Credits
            const moviesRes = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}`);
            const moviesData = await moviesRes.json();

            setPerson(personData);
            setMovies(moviesData.cast || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPersonDetails();
    }, [id]);

    if (loading || !person) {
        return (
            <SafeAreaView className="flex-1 bg-white" edges={['bottom', 'top']}>
                <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
                    <Skeleton width={40} height={40} borderRadius={20} />
                    <Skeleton width={160} height={20} borderRadius={8} style={{ marginLeft: 12 }} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="items-center mt-4 px-4">
                        <Skeleton width={160} height={160} borderRadius={80} />
                        <Skeleton width={180} height={24} borderRadius={8} style={{ marginTop: 16 }} />
                        <Skeleton width={120} height={16} borderRadius={6} style={{ marginTop: 8 }} />
                        <Skeleton width={140} height={14} borderRadius={6} style={{ marginTop: 6 }} />
                    </View>
                    <View className="px-4 mt-6">
                        <Skeleton width={120} height={20} borderRadius={8} />
                        <Skeleton width="100%" height={14} borderRadius={6} style={{ marginTop: 10 }} />
                        <Skeleton width="100%" height={14} borderRadius={6} style={{ marginTop: 8 }} />
                        <Skeleton width="100%" height={14} borderRadius={6} style={{ marginTop: 8 }} />
                        <Skeleton width="70%" height={14} borderRadius={6} style={{ marginTop: 8 }} />
                    </View>
                    <View className="mt-8 px-4">
                        <Skeleton width={120} height={20} borderRadius={8} />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
                            {[...Array(4)].map((_, i) => (
                                <View key={i} style={{ marginRight: 16, width: 128 }}>
                                    <Skeleton width={128} height={192} borderRadius={12} />
                                    <Skeleton width={90} height={12} borderRadius={6} style={{ marginTop: 8 }} />
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    const renderMovie = ({ item }: { item: MovieCredit }) => {
        if (!item.poster_path) return null;

        return (
            <TouchableOpacity
                className="mr-4 w-32"
                onPress={() => router.push(`/DetailsPage/${item.id}`)}
            >
                <Image
                    className="h-48 w-full rounded-xl bg-gray-200"
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                />
                <Text className="mt-2 text-sm font-semibold text-gray-800" numberOfLines={2}>
                    {item.title}
                </Text>
                <Text className="text-xs text-gray-500" numberOfLines={1}>
                    {item.character}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['bottom', 'top']}>
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="p-2 bg-gray-100 rounded-full">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-800 line-clamp-1 flex-1 text-center mr-8">
                    {person.name}
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="items-center mt-4">
                    <Image
                        className="h-40 w-40 rounded-full bg-gray-200 border-4 border-gray-100"
                        source={{ uri: `https://image.tmdb.org/t/p/w500${person.profile_path}` }}
                    />
                    <Text className="mt-4 text-2xl font-bold text-gray-900">{person.name}</Text>
                    <Text className="text-sm text-gray-500 mt-1">{person.known_for_department}</Text>
                    {person.place_of_birth && (
                        <Text className="text-xs text-gray-400 mt-1">{person.place_of_birth}</Text>
                    )}
                </View>

                {person.biography ? (
                    <View className="px-4 mt-6">
                        <Text className="text-lg font-bold text-gray-800 mb-2">Biography</Text>
                        <Text className="text-sm text-gray-600 leading-6">{person.biography}</Text>
                    </View>
                ) : null}

                {movies && movies.length > 0 && (
                    <View className="mt-8 mb-8">
                        <View className="flex-row justify-between items-center px-4 mb-4">
                            <Text className="text-lg font-bold text-gray-800">Known For</Text>
                            <Text className="text-sm text-gray-500">{movies.length} movies</Text>
                        </View>
                        <FlatList
                            data={movies}
                            keyExtractor={(item, index) => `${item.id}-${index}`}
                            renderItem={renderMovie}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 16 }}
                        />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
