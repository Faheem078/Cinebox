import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Topbar() {
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const sessionValue = await AsyncStorage.getItem('@session');
            setLoggedIn(sessionValue === 'active');
        };

        checkSession();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('@session');
        router.replace('/login');
    };

    const handleAuthPress = () => {
        if (loggedIn) {
            handleLogout();
        } else {
            router.push('/login');
        }
    };

    return (
        <View className="bg-white pt-12 pb-3 px-4 border-b border-gray-100 shadow-sm">
            <View className="flex-row items-center justify-between">
                <Pressable onPress={() => router.push('/Home')} className="flex-row items-center">
                    <View className="bg-red-500 p-2 rounded-xl justify-center items-center shadow-md shadow-red-500/30">
                        <Feather name="play" size={18} color="white" />
                    </View>
                    <Text className="text-xl font-extrabold text-gray-900 tracking-tight ml-2">
                        Cine<Text className="text-red-500">Box</Text>
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => router.push('/components/SearchPage')}
                    className="flex-row items-center bg-gray-100/80 px-4 py-2.5 rounded-full flex-1 mx-3 border border-gray-200/30"
                >
                    <Feather name="search" size={16} color="#666" />
                    <Text className="text-gray-400 text-sm ml-2">Search movies...</Text>
                </Pressable>

                <Pressable
                    onPress={handleAuthPress}
                    className="px-3 py-2 rounded-full border border-red-500/20 bg-red-50"
                >
                    <Text className="text-sm font-semibold text-red-500">
                        {loggedIn ? 'Logout' : 'Login'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
