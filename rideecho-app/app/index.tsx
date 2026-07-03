import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useRideStore } from "../store/useRideStore";

export default function Index() {
  const router = useRouter();
  const { profile } = useRideStore();

  useEffect(() => {
    // Quick timeout to allow store rehydration check
    const timer = setTimeout(() => {
      if (profile.phone) {
        router.replace("/(ride)/dashboard");
      } else {
        router.replace("/(auth)/phone");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [profile.phone]);

  return null;
}
