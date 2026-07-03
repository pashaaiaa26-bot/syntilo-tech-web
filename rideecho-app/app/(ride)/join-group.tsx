import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, KeyRound } from "lucide-react-native";
import { useRideStore, TRANSLATIONS, RiderMember } from "../../store/useRideStore";
import { LanguageToggle } from "../../components/LanguageToggle";

export default function JoinGroup() {
  const router = useRouter();
  const { language, setRoomCode, setMembers } = useRideStore();
  const t = TRANSLATIONS[language];

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = () => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode.length !== 6) {
      setError(language === "en" ? "Lobby code must be exactly 6 characters." : "روم کا کوڈ 6 ہندسوں کا ہونا چاہیے۔");
      return;
    }

    setError("");
    setLoading(true);

    // Simulate database lookup and join
    setTimeout(() => {
      setLoading(false);
      setRoomCode(cleanCode, false);

      // Join a simulated group list (Leader is someone else, user is standard member)
      const groupMembers: RiderMember[] = [
        {
          id: "leader_user",
          name: language === "en" ? "Sheraz Pasha (Leader)" : "شیراز پاشا (لیڈر)",
          speed: 60,
          status: "Active",
          isLeader: true,
          lat: 33.6844,
          lng: 73.0479,
        },
        {
          id: "me",
          name: language === "en" ? "You" : "آپ",
          speed: 0,
          status: "Active",
          isLeader: false,
          lat: 33.6850,
          lng: 73.0485,
        },
        {
          id: "rider_3",
          name: language === "en" ? "Hamza Abbasi" : "حمزہ عباسی",
          speed: 55,
          status: "Stopped",
          isLeader: false,
          lat: 33.6825,
          lng: 73.0455,
        },
      ];

      setMembers(groupMembers);

      Alert.alert(
        language === "en" ? "Joined Successfully" : "شامل ہو گئے",
        language === "en" ? `Connected to group room ${cleanCode}.` : `روم ${cleanCode} میں شامل ہو چکے ہیں۔`
      );

      router.replace("/(ride)/dashboard");
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {language === "en" ? "Join Touring Room" : "روم میں شامل ہوں"}
        </Text>
        <LanguageToggle />
      </View>

      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <KeyRound size={28} color="#0d9488" />
        </View>

        <Text style={styles.cardTitle}>
          {language === "en" ? "ENTER LOBBY CODE" : "روم کا کوڈ درج کریں"}
        </Text>
        <Text style={styles.cardDesc}>
          {language === "en"
            ? "Ask the group leader for the 6-character room code to join their live telemetry sync."
            : "گروپ لیڈر سے 6 ہندسوں کا روم کوڈ حاصل کریں اور لائیو لوکیشن میں شامل ہوں۔"}
        </Text>

        <TextInput
          value={code}
          onChangeText={(text) => {
            setCode(text);
            setError("");
          }}
          autoCapitalize="characters"
          maxLength={6}
          placeholder="RE89AX"
          placeholderTextColor="#64748b"
          style={styles.codeInput}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <TouchableOpacity
        disabled={loading}
        onPress={handleJoin}
        style={[styles.submitBtn, loading ? styles.disabledBtn : {}]}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.submitText}>
            {language === "en" ? "Connect & Sync Live GPS" : "روم سے منسلک ہوں"}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#080810",
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backBtn: {
    padding: 8,
    backgroundColor: "#1e1e2e",
    borderRadius: 8,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0d948810",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#0d948830",
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 8,
  },
  cardDesc: {
    color: "#94a3b8",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  codeInput: {
    width: "100%",
    backgroundColor: "#080810",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1f2937",
    height: 52,
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 4,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 10,
    textAlign: "center",
  },
  submitBtn: {
    backgroundColor: "#0d9488",
    height: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  disabledBtn: {
    backgroundColor: "#1f2937",
  },
  submitText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 14,
  },
});
