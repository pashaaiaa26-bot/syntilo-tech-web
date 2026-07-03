import React from "react";
import { Stack } from "expo-router";

export default function RideLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#080810",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#080810",
        },
      }}
    >
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="create-group" options={{ headerShown: false }} />
      <Stack.Screen name="join-group" options={{ headerShown: false }} />
      <Stack.Screen name="map" options={{ headerShown: false }} />
      <Stack.Screen name="hud" options={{ headerShown: false }} />
      <Stack.Screen name="stats" options={{ headerShown: false }} />
    </Stack>
  );
}
