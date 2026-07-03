import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Award, Compass, ArrowRight, ShieldCheck, Flame, Hourglass, Trophy } from "lucide-react-native";
import { useRideStore, TRANSLATIONS } from "../../store/useRideStore";
import { LanguageToggle } from "../../components/LanguageToggle";

export default function RideStats() {
  const router = useRouter();
  const { language, telemetry, resetTelemetry } = useRideStore();
  const t = TRANSLATIONS[language];

  // Helper: Format duration seconds to HH:MM:SS
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${hrs > 0 ? pad(hrs) + ":" : ""}${pad(mins)}:${pad(secs)}`;
  };

  // Badge calculations
  const isRocket = telemetry.maxSpeed > 80;
  const isExplorer = telemetry.totalDistance > 1.5; // lowered for easy simulation testing
  const isCruiser = telemetry.totalDistance > 0 && telemetry.maxSpeed <= 80;

  // Safety Score simulation based on speed
  const safetyScore = Math.max(
    50,
    Math.round(100 - (telemetry.maxSpeed > 100 ? (telemetry.maxSpeed - 100) * 0.5 : 0))
  );

  const handleDone = () => {
    resetTelemetry();
    router.replace("/(ride)/dashboard");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t.statsTitle}</Text>
        <LanguageToggle />
      </View>

      {/* Summary Scoreboard Card */}
      <View style={styles.statsCard}>
        <View style={styles.trophyIcon}>
          <Trophy size={40} color="#fbbf24" fill="#fbbf24" style={styles.trophy} />
        </View>
        <Text style={styles.summaryTitle}>
          {language === "en" ? "Ride Completed!" : "رائڈ مکمل ہو گئی!"}
        </Text>
        <Text style={styles.summarySub}>
          {language === "en" ? "Here is your telemetry breakdown:" : "آپ کے سفر کی تفصیلات درج ذیل ہیں:"}
        </Text>

        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Compass size={18} color="#0d9488" />
            <Text style={styles.label}>{t.distance}</Text>
            <Text style={styles.value}>{telemetry.totalDistance.toFixed(2)} km</Text>
          </View>

          <View style={styles.gridItem}>
            <Hourglass size={18} color="#0d9488" />
            <Text style={styles.label}>{t.duration}</Text>
            <Text style={styles.value}>{formatDuration(telemetry.durationSeconds)}</Text>
          </View>

          <View style={styles.gridItem}>
            <Flame size={18} color="#0d9488" />
            <Text style={styles.label}>{t.maxSpeed}</Text>
            <Text style={styles.value}>{telemetry.maxSpeed} km/h</Text>
          </View>

          <View style={styles.gridItem}>
            <ShieldCheck size={18} color="#0d9488" />
            <Text style={styles.label}>
              {language === "en" ? "Safety Rating" : "حفاظتی ریٹنگ"}
            </Text>
            <Text style={[styles.value, styles.safetyValue]}>{safetyScore}/100</Text>
          </View>
        </View>
      </View>

      {/* Gamification Badges Section */}
      <View style={styles.badgesSection}>
        <Text style={styles.sectionTitle}>{t.leaderboard}</Text>

        {/* Rocket Badge */}
        <View style={[styles.badgeCard, isRocket ? styles.activeBadgeCard : styles.lockedBadgeCard]}>
          <View style={[styles.badgeIconBg, isRocket ? styles.activeBadgeIcon : styles.lockedBadgeIcon]}>
            <Text style={styles.badgeEmoji}>🚀</Text>
          </View>
          <View style={styles.badgeInfo}>
            <Text style={[styles.badgeName, isRocket ? styles.activeText : styles.lockedText]}>
              {language === "en" ? "The Rocket" : "دی راکٹ"}
            </Text>
            <Text style={styles.badgeDesc}>
              {language === "en" ? "Hit speeds above 80 km/h during your tour." : "دوران سفر 80 کلومیٹر فی گھنٹہ سے زیادہ رفتار حاصل کریں۔"}
            </Text>
          </View>
        </View>

        {/* Explorer Badge */}
        <View style={[styles.badgeCard, isExplorer ? styles.activeBadgeCard : styles.lockedBadgeCard]}>
          <View style={[styles.badgeIconBg, isExplorer ? styles.activeBadgeIcon : styles.lockedBadgeIcon]}>
            <Text style={styles.badgeEmoji}>🗺️</Text>
          </View>
          <View style={styles.badgeInfo}>
            <Text style={[styles.badgeName, isExplorer ? styles.activeText : styles.lockedText]}>
              {language === "en" ? "The Explorer" : "دی ایکسپلورر"}
            </Text>
            <Text style={styles.badgeDesc}>
              {language === "en" ? "Covered a distance of more than 1.5 km." : "ایک ہی سفر میں 1.5 کلومیٹر سے زیادہ فاصلہ طے کریں۔"}
            </Text>
          </View>
        </View>

        {/* Cruiser Badge */}
        <View style={[styles.badgeCard, isCruiser ? styles.activeBadgeCard : styles.lockedBadgeCard]}>
          <View style={[styles.badgeIconBg, isCruiser ? styles.activeBadgeIcon : styles.lockedBadgeIcon]}>
            <Text style={styles.badgeEmoji}>🐢</Text>
          </View>
          <View style={styles.badgeInfo}>
            <Text style={[styles.badgeName, isCruiser ? styles.activeText : styles.lockedText]}>
              {language === "en" ? "The Cruiser" : "دی کروزر"}
            </Text>
            <Text style={styles.badgeDesc}>
              {language === "en" ? "Cruised steadily below 80 km/h with scenic pacing." : "محفوظ اور ہموار رفتار (80 کلومیٹر سے کم) کے ساتھ سفر طے کریں۔"}
            </Text>
          </View>
        </View>
      </View>

      {/* Done Button */}
      <TouchableOpacity onPress={handleDone} style={styles.doneBtn}>
        <Text style={styles.doneBtnText}>{t.backHome}</Text>
        <ArrowRight size={18} color="#ffffff" style={styles.btnIcon} />
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },
  statsCard: {
    backgroundColor: "#111827",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  trophyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#fbbf2415",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#fbbf2430",
  },
  trophy: {
    shadowColor: "#fbbf24",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 4,
  },
  summarySub: {
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    gap: 12,
  },
  gridItem: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#080810",
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    alignItems: "center",
    gap: 6,
  },
  label: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "800",
  },
  value: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },
  safetyValue: {
    color: "#10b981",
  },
  badgesSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  badgeCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    gap: 16,
  },
  activeBadgeCard: {
    backgroundColor: "#0d948810",
    borderColor: "#0d948840",
  },
  lockedBadgeCard: {
    backgroundColor: "#11182750",
    borderColor: "#1f2937",
    opacity: 0.45,
  },
  badgeIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  activeBadgeIcon: {
    backgroundColor: "#0d948820",
    borderWidth: 1.5,
    borderColor: "#0d948880",
  },
  lockedBadgeIcon: {
    backgroundColor: "#1f2937",
    borderWidth: 1.5,
    borderColor: "#374151",
  },
  badgeEmoji: {
    fontSize: 20,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 2,
  },
  activeText: {
    color: "#ffffff",
  },
  lockedText: {
    color: "#64748b",
  },
  badgeDesc: {
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 14,
  },
  doneBtn: {
    flexDirection: "row",
    backgroundColor: "#0d9488",
    height: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 30,
  },
  doneBtnText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 15,
  },
  btnIcon: {
    marginLeft: 4,
  },
});
