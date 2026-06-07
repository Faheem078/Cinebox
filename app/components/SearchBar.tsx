import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

type Props = {
    inputValue: string;
    setInputValue: (text: string) => void;
}

export default function SearchBar({ inputValue, setInputValue }: Props) {
    const router = useRouter();

    return (
        <View className="bg-white pt-12 pb-3 px-4 border-b border-gray-100 shadow-sm flex-row items-center justify-between">
            {/* Logo Section */}
            <Pressable onPress={() => router.push('/Home')} className="flex-row items-center">
                <View className="bg-red-500 p-2 rounded-xl justify-center items-center shadow-md shadow-red-500/30">
                    <Feather name="play" size={18} color="white" />
                </View>
                <Text className="text-xl font-extrabold text-gray-900 tracking-tight ml-2">
                    Cine<Text className="text-red-500">Box</Text>
                </Text>
            </Pressable>

            {/* Input Bar */}
            <View className="flex-row items-center bg-gray-100/80 px-4 py-2.5 rounded-full w-48 border border-gray-200/30">
                <Feather name="search" size={16} color="#666" />
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor="#888"
                    className="flex-grow h-full ml-2 text-sm text-gray-850 p-0"
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                    autoFocus={true}
                />
            </View>
        </View>
    );
}
