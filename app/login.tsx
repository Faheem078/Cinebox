import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_EMAIL = "group@gmail.com";
const MOCK_PASSWORD = "group123";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const stored = await AsyncStorage.getItem('@user');
      const user = stored ? JSON.parse(stored) : null;

      if ((user && user.email === email && user.password === password) || (email === MOCK_EMAIL && password === MOCK_PASSWORD)) {
        await AsyncStorage.setItem('@session', 'active');
        setError("");
        router.replace("/(tabs)/Home");
      } else {
        setError("Your email or password is incorrect.");
      }
    } catch (e) {
      console.error('Login error', e);
      setError('Login failed');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6">

          {/* Logo / Title */}
          <View className="items-center mb-10">
            <View className="bg-red-500 w-16 h-16 rounded-2xl items-center justify-center mb-4">
              <Ionicons name="film" size={36} color="white" />
            </View>
            <Text className="text-3xl font-bold text-gray-900">CineBox</Text>
            <Text className="text-sm text-gray-500 mt-1">Sign in to continue</Text>
          </View>

          {/* Email */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-1">Email</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 bg-gray-50">
              <Ionicons name="mail-outline" size={18} color="#9ca3af" />
              <TextInput
                className="flex-1 py-3 pl-3 text-sm text-gray-800"
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(t) => { setEmail(t); setError(""); }}
              />
            </View>
          </View>

          {/* Password */}
          <View className="mb-2">
            <Text className="text-sm font-semibold text-gray-700 mb-1">Password</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 bg-gray-50">
              <Ionicons name="lock-closed-outline" size={18} color="#9ca3af" />
              <TextInput
                className="flex-1 py-3 pl-3 text-sm text-gray-800"
                placeholder="Enter your password"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(t) => { setPassword(t); setError(""); }}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={18}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Error message */}
          {error !== "" && (
            <View className="flex-row items-center mt-2 mb-1">
              <Ionicons name="alert-circle-outline" size={15} color="#ef4444" />
              <Text className="text-red-500 text-xs ml-1">{error}</Text>
            </View>
          )}

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-red-500 rounded-xl py-4 items-center mt-6"
            activeOpacity={0.85}
          >
            <Text className="text-white font-bold text-base">Sign In</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-4">
            <Text className="text-sm text-gray-600 mr-1">Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text className="text-sm text-red-500 font-semibold">Sign up</Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
