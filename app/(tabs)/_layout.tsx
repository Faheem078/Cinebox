import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from 'react';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Topbar from "../components/Topbar";

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Topbar />
      <Tabs
        initialRouteName="Home"
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#ef4444",
          tabBarInactiveTintColor: "#9ca3af",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#f3f4f6",
            elevation: 8,
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
            paddingTop: 6,
          },
        }}
      >
        <Tabs.Screen
          name="Movies"
          options={{
            title: "Movies",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "film" : "film-outline"} size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Series"
          options={{
            title: "Series",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "tv" : "tv-outline"} size={22} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
