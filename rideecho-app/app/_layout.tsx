import React from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#080810" />
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
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(ride)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
