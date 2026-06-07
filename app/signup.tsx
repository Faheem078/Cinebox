import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      const user = { name, email, password };
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setError("");
      Alert.alert('Success', 'Account created. Please sign in.');
      router.replace('/login');
    } catch (e) {
      console.error('Failed to save user', e);
      setError('Failed to create account');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6">
          <View className="items-center mb-10">
            <View className="bg-red-500 w-16 h-16 rounded-2xl items-center justify-center mb-4">
              <Ionicons name="person-add" size={28} color="white" />
            </View>
            <Text className="text-2xl font-bold text-gray-900">Create account</Text>
            <Text className="text-sm text-gray-500 mt-1">Sign up to get started</Text>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-1">Name</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 bg-gray-50">
              <TextInput
                className="flex-1 py-3 pl-3 text-sm text-gray-800"
                placeholder="Your name"
                value={name}
                onChangeText={(t) => { setName(t); setError(''); }}
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-1">Email</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 bg-gray-50">
              <TextInput
                className="flex-1 py-3 pl-3 text-sm text-gray-800"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(t) => { setEmail(t); setError(''); }}
              />
            </View>
          </View>

          <View className="mb-2">
            <Text className="text-sm font-semibold text-gray-700 mb-1">Password</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 bg-gray-50">
              <TextInput
                className="flex-1 py-3 pl-3 text-sm text-gray-800"
                placeholder="Create a password"
                secureTextEntry
                value={password}
                onChangeText={(t) => { setPassword(t); setError(''); }}
              />
            </View>
          </View>

          <View className="mb-2">
            <Text className="text-sm font-semibold text-gray-700 mb-1">Confirm Password</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 bg-gray-50">
              <TextInput
                className="flex-1 py-3 pl-3 text-sm text-gray-800"
                placeholder="Confirm password"
                secureTextEntry
                value={confirm}
                onChangeText={(t) => { setConfirm(t); setError(''); }}
              />
            </View>
          </View>

          {error !== '' && (
            <View className="flex-row items-center mt-2 mb-1">
              <Text className="text-red-500 text-xs">{error}</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={handleSignup}
            className="bg-red-500 rounded-xl py-4 items-center mt-6"
            activeOpacity={0.85}
          >
            <Text className="text-white font-bold text-base">Sign Up</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-4">
            <Text className="text-sm text-gray-600 mr-1">Already have an account?</Text>
            <TouchableOpacity onPress={() => router.replace('/login')}>
              <Text className="text-sm text-red-500 font-semibold">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
