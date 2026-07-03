import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Users, Bike, Car, Bus, Footprints, Clipboard } from "lucide-react-native";
import { useRideStore, TRANSLATIONS, RiderMember } from "../../store/useRideStore";
import { LanguageToggle } from "../../components/LanguageToggle";

type TourMode = "BIKE" | "CAR" | "COASTER" | "HIKING";

export default function CreateGroup() {
  const router = useRouter();
  const { language, profile, setRoomCode, setMembers } = useRideStore();
  const t = TRANSLATIONS[language];

  const [tourMode, setTourMode] = useState<TourMode>("BIKE");
  const [roomCodeLocal, setRoomCodeLocal] = useState("");
  const [generating, setGenerating] = useState(true);

  // Generate 6-digit code on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "";
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setRoomCodeLocal(code);
      setGenerating(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateLobby = () => {
    if (!roomCodeLocal) return;

    // Set state in store
    setRoomCode(roomCodeLocal, true);

    // Populate initial members with simulated riders based on Tour Mode
    const simulatedRiders: RiderMember[] = [
      {
        id: "me",
        name: `${profile.name || "Rider"} (${tourMode})`,
        speed: 0,
        status: "Active",
        isLeader: true,
        lat: 33.6844,
        lng: 73.0479,
      },
      {
        id: "rider_2",
        name: language === "en" ? "Sheraz Pasha" : "شیراز پاشا",
        speed: 45,
        status: "Active",
        isLeader: false,
        lat: 33.6855,
        lng: 73.0490,
      },
      {
        id: "rider_3",
        name: language === "en" ? "Zainab Shah" : "زینب شاہ",
        speed: 55,
        status: "Active",
        isLeader: false,
        lat: 33.6830,
        lng: 73.0460,
      },
    ];

    setMembers(simulatedRiders);

    Alert.alert(
      language === "en" ? "Group Created" : "روم بن گیا ہے",
      language === "en"
        ? `Lobby initialized. Share code ${roomCodeLocal} with other riders.`
        : `روم شروع ہو چکا ہے۔ دیگر سواروں کے ساتھ کوڈ ${roomCodeLocal} شیئر کریں۔`
    );

    router.replace("/(ride)/dashboard");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {language === "en" ? "Create Touring Room" : "ٹورنگ روم بنائیں"}
        </Text>
        <LanguageToggle />
      </View>

      {/* Mode Selector */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          {language === "en" ? "SELECT TOUR MODE" : "ٹور کا طریقہ منتخب کریں"}
        </Text>
        <View style={styles.modeGrid}>
          <TouchableOpacity
            onPress={() => setTourMode("BIKE")}
            style={[styles.modeBtn, tourMode === "BIKE" ? styles.activeMode : {}]}
          >
            <Bike size={24} color={tourMode === "BIKE" ? "#ffffff" : "#94a3b8"} />
            <Text style={[styles.modeText, tourMode === "BIKE" ? styles.activeModeText : {}]}>
              {language === "en" ? "Motorcycle" : "موٹر سائیکل"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTourMode("CAR")}
            style={[styles.modeBtn, tourMode === "CAR" ? styles.activeMode : {}]}
          >
            <Car size={24} color={tourMode === "CAR" ? "#ffffff" : "#94a3b8"} />
            <Text style={[styles.modeText, tourMode === "CAR" ? styles.activeModeText : {}]}>
              {language === "en" ? "Car / SUV" : "گاڑی"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTourMode("COASTER")}
            style={[styles.modeBtn, tourMode === "COASTER" ? styles.activeMode : {}]}
          >
            <Bus size={24} color={tourMode === "COASTER" ? "#ffffff" : "#94a3b8"} />
            <Text style={[styles.modeText, tourMode === "COASTER" ? styles.activeModeText : {}]}>
              {language === "en" ? "Coaster" : "کوسٹر / بس"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTourMode("HIKING")}
            style={[styles.modeBtn, tourMode === "HIKING" ? styles.activeMode : {}]}
          >
            <Footprints size={24} color={tourMode === "HIKING" ? "#ffffff" : "#94a3b8"} />
            <Text style={[styles.modeText, tourMode === "HIKING" ? styles.activeModeText : {}]}>
              {language === "en" ? "Hiking" : "پیدل سفر"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Code Display */}
      <View style={[styles.card, styles.codeCard]}>
        {generating ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#0d9488" />
            <Text style={styles.loadingText}>
              {language === "en" ? "Generating secure lobby key..." : "لا بھی کوڈ بنایا جا رہا ہے..."}
            </Text>
          </View>
        ) : (
          <View style={styles.codeContainer}>
            <Text style={styles.codeTitle}>
              {language === "en" ? "SHARE THIS ACCESS CODE" : "یہ کوڈ شیئر کریں"}
            </Text>
            <View style={styles.codeRow}>
              <Text style={styles.codeVal}>{roomCodeLocal}</Text>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    language === "en" ? "Copied" : "کاپی ہو گیا",
                    language === "en" ? "Code copied to clipboard!" : "کوڈ کلپ بورڈ پر کاپی ہو گیا!"
                  )
                }
                style={styles.copyBtn}
              >
                <Clipboard size={16} color="#0d9488" />
              </TouchableOpacity>
            </View>
            <Text style={styles.codeSub}>
              {language === "en"
                ? "Other riders can enter this code in 'Join Room' to instantly connect."
                : "دوسرے سوار 'روم میں شامل ہوں' پر جا کر یہ کوڈ درج کر کے شامل ہو سکتے ہیں۔"}
            </Text>
          </View>
        )}
      </View>

      {/* Action Trigger */}
      <TouchableOpacity
        disabled={generating}
        onPress={handleCreateLobby}
        style={[styles.submitBtn, generating ? styles.disabledBtn : {}]}
      >
        <Users size={18} color="#ffffff" style={styles.btnIcon} />
        <Text style={styles.submitText}>
          {language === "en" ? "Launch Lobby Session" : "روم لانچ کریں"}
        </Text>
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
    padding: 20,
    marginBottom: 20,
  },
  cardLabel: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 16,
    textAlign: "center",
  },
  modeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  modeBtn: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#080810",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  activeMode: {
    borderColor: "#0d9488",
    backgroundColor: "#0d948810",
  },
  modeText: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "800",
  },
  activeModeText: {
    color: "#0d9488",
  },
  codeCard: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 160,
  },
  loadingContainer: {
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "700",
  },
  codeContainer: {
    alignItems: "center",
    width: "100%",
  },
  codeTitle: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  codeVal: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: 3,
  },
  copyBtn: {
    padding: 8,
    backgroundColor: "#0d948815",
    borderRadius: 6,
  },
  codeSub: {
    color: "#94a3b8",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 16,
  },
  submitBtn: {
    flexDirection: "row",
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
  btnIcon: {
    marginRight: 8,
  },
  submitText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 14,
  },
});
