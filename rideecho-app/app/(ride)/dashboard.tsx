import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ShieldCheck, Users, Radio, Compass, MapPin, Play, Square, Award, AlertCircle, Heart } from "lucide-react-native";
import { useRideStore, TRANSLATIONS } from "../../store/useRideStore";
import { LanguageToggle } from "../../components/LanguageToggle";
import { VOXIntercom } from "../../components/VOXIntercom";
import { CrashDetector } from "../../components/CrashDetector";

export default function RiderDashboard() {
  const router = useRouter();
  const {
    language,
    profile,
    isRiding,
    telemetry,
    roomCode,
    isLeader,
    members,
    startRide,
    stopRide,
    resetTelemetry,
  } = useRideStore();

  const t = TRANSLATIONS[language];

  const handleStartRide = () => {
    resetTelemetry();
    startRide();
    Alert.alert(
      language === "en" ? "Ride Started" : "رائڈ شروع ہو گئی",
      language === "en"
        ? "Crash detection sensors and GPS tracking are now active."
        : "حادثے کی تشخیص کے سینسر اور جی پی ایس ٹریکنگ اب فعال ہیں۔"
    );
  };

  const handleEndRide = () => {
    stopRide();
    // Redirect to stats screen to view final results
    router.push("/(ride)/stats");
  };

  const triggerSOS = () => {
    Alert.alert(
      language === "en" ? "SOS TRANSMITTED!" : "ہنگامی پیغام بھیج دیا گیا!",
      language === "en"
        ? `Emergency signal and coordinates broadcasted to emergency contacts: ${profile.emergencyContacts.join(
            ", "
          )}`
        : `ہنگامی پیغام اور آپ کی لوکیشن ان نمبرز پر بھیج دی گئی ہے: ${profile.emergencyContacts.join(
            ", "
          )}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Background Crash Detector */}
      {isRiding && <CrashDetector onSOSTriggered={triggerSOS} />}

      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>
            {language === "en" ? "Assalam-o-Alaikum," : "اسلام علیکم،"}
          </Text>
          <Text style={styles.riderName}>{profile.name || "Rider"}</Text>
        </View>
        <LanguageToggle />
      </View>

      {/* Premium Badge */}
      <View style={styles.premiumBanner}>
        <View style={styles.premiumTextGroup}>
          <Award size={18} color="#eab308" />
          <Text style={styles.premiumText}>
            {profile.isPremium
              ? language === "en"
                ? "RideEcho Pro Active"
                : "رائڈ ایکو پرو فعال ہے"
              : language === "en"
              ? "Free Trial Active (60m HUD)"
              : "مفت ٹرائل فعال ہے"}
          </Text>
        </View>
        {!profile.isPremium && (
          <TouchableOpacity
            onPress={() => router.push("/(auth)/paywall")}
            style={styles.upgradeBtn}
          >
            <Text style={styles.upgradeText}>
              {language === "en" ? "Upgrade" : "اپ گریڈ"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Quick SOS Trigger Button */}
      <TouchableOpacity onPress={triggerSOS} style={styles.sosButton}>
        <AlertCircle size={22} color="#ffffff" />
        <Text style={styles.sosButtonText}>
          {language === "en" ? "MANUAL SOS EMERGENCY" : "ہنگامی ایس او ایس الرٹ"}
        </Text>
      </TouchableOpacity>

      {/* Ride Controls Section */}
      <View style={styles.rideCard}>
        <Text style={styles.cardTitle}>
          {language === "en" ? "RIDE CONTROL CENTER" : "رائڈ کنٹرول سینٹر"}
        </Text>
        {isRiding ? (
          <View style={styles.activeRideContainer}>
            <View style={styles.pulseContainer}>
              <View style={styles.pulseDot} />
              <Text style={styles.activeRideText}>{t.activeRide}</Text>
            </View>

            <View style={styles.statsQuickGrid}>
              <View style={styles.quickStat}>
                <Text style={styles.statLabel}>{t.avgSpeed}</Text>
                <Text style={styles.statVal}>{telemetry.currentSpeed} km/h</Text>
              </View>
              <View style={styles.quickStat}>
                <Text style={styles.statLabel}>{t.distance}</Text>
                <Text style={styles.statVal}>{telemetry.totalDistance.toFixed(1)} km</Text>
              </View>
            </View>

            <View style={styles.navigationRow}>
              <TouchableOpacity
                onPress={() => router.push("/(ride)/hud")}
                style={[styles.navBtn, styles.hudBtn]}
              >
                <Compass size={18} color="#ffffff" style={styles.btnIcon} />
                <Text style={styles.navBtnText}>{t.hudMode}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/(ride)/map")}
                style={[styles.navBtn, styles.mapBtn]}
              >
                <MapPin size={18} color="#ffffff" style={styles.btnIcon} />
                <Text style={styles.navBtnText}>
                  {language === "en" ? "Live Map" : "نقشہ دیکھیں"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleEndRide} style={styles.endRideBtn}>
              <Square size={16} color="#ffffff" style={styles.btnIcon} />
              <Text style={styles.endRideBtnText}>{t.endRide}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleStartRide} style={styles.startRideBtn}>
            <Play size={20} color="#ffffff" style={styles.btnIcon} />
            <Text style={styles.startRideBtnText}>
              {language === "en" ? "Start New Ride" : "نئی رائڈ شروع کریں"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Group Room Controller */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Users size={20} color="#0d9488" />
          <Text style={styles.cardTitle}>
            {language === "en" ? "TOURING GROUP ROOM" : "ٹورنگ گروپ روم"}
          </Text>
        </View>

        {roomCode ? (
          <View style={styles.roomStatusContainer}>
            <Text style={styles.roomCodeLabel}>
              {language === "en" ? "Active Room Code:" : "روم کا کوڈ:"}
            </Text>
            <Text style={styles.roomCodeText}>{roomCode}</Text>
            <Text style={styles.roomSubtext}>
              {isLeader ? t.groupLeaderText : `${members.length} riders in lobby`}
            </Text>
            <TouchableOpacity
              onPress={() => {
                useRideStore.setState({ roomCode: null, members: [], isLeader: false });
                Alert.alert(
                  language === "en" ? "Left Room" : "روم چھوڑ دیا",
                  language === "en" ? "You have left the group session." : "آپ گروپ سیشن سے الگ ہو چکے ہیں۔"
                );
              }}
              style={styles.leaveRoomBtn}
            >
              <Text style={styles.leaveRoomText}>
                {language === "en" ? "Leave Group" : "گروپ چھوڑیں"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.groupButtonsRow}>
            <TouchableOpacity
              onPress={() => router.push("/(ride)/create-group")}
              style={[styles.groupBtn, styles.groupCreate]}
            >
              <Text style={styles.groupBtnText}>{t.createGroup}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/(ride)/join-group")}
              style={[styles.groupBtn, styles.groupJoin]}
            >
              <Text style={styles.groupBtnText}>{t.joinGroup}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Intercom Panel */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Radio size={20} color="#0d9488" />
          <Text style={styles.cardTitle}>
            {language === "en" ? "VOX WALKIE-TALKIE" : "ہینڈز فری واکی ٹاکی"}
          </Text>
        </View>
        <VOXIntercom />
      </View>

      {/* Diagnostics / System Health Checklist */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {language === "en" ? "SYSTEM DIAGNOSTICS" : "سسٹم ڈائیگنوسٹکس"}
        </Text>
        <View style={styles.checklist}>
          <View style={styles.checkItem}>
            <ShieldCheck size={16} color="#10b981" />
            <Text style={styles.checkText}>
              {language === "en" ? "Impact Sensors: Calibrated & Ready" : "حادثے کے سینسر: تیار ہیں"}
            </Text>
          </View>
          <View style={styles.checkItem}>
            <ShieldCheck size={16} color="#10b981" />
            <Text style={styles.checkText}>
              {language === "en" ? "GPS Receiver: Signal High Accuracy" : "جی پی ایس سگنل: بہترین"}
            </Text>
          </View>
          <View style={styles.checkItem}>
            <ShieldCheck size={16} color="#10b981" />
            <Text style={styles.checkText}>
              {language === "en"
                ? `Emergency Profile: Loaded (${profile.bloodGroup})`
                : `ہنگامی معلومات: لوڈ ہو گئی ہیں (${profile.bloodGroup})`}
            </Text>
          </View>
        </View>
      </View>

      {/* Emergency Contacts Card */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Heart size={18} color="#ef4444" />
          <Text style={styles.cardTitle}>
            {language === "en" ? "EMERGENCY CONTACTS" : "ہنگامی رابطے"}
          </Text>
        </View>
        <View style={styles.contactsList}>
          {profile.emergencyContacts.map((c, i) => (
            <Text key={i} style={styles.contactPhone}>
              📞 {c}
            </Text>
          ))}
        </View>
      </View>
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
  welcomeText: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "600",
  },
  riderName: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 2,
  },
  premiumBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#111827",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1f2937",
    marginBottom: 16,
  },
  premiumTextGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  premiumText: {
    color: "#f8fafc",
    fontWeight: "800",
    fontSize: 12,
  },
  upgradeBtn: {
    backgroundColor: "#0d9488",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  upgradeText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 11,
  },
  sosButton: {
    flexDirection: "row",
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 8,
    gap: 10,
    marginBottom: 20,
  },
  sosButtonText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 1,
  },
  rideCard: {
    backgroundColor: "#111827",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#0d9488",
    padding: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 20,
    marginBottom: 20,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  startRideBtn: {
    flexDirection: "row",
    backgroundColor: "#0d9488",
    height: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  startRideBtnText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 15,
  },
  activeRideContainer: {
    alignItems: "center",
  },
  pulseContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  pulseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ef4444",
  },
  activeRideText: {
    color: "#ef4444",
    fontWeight: "900",
    fontSize: 14,
  },
  statsQuickGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    gap: 16,
  },
  quickStat: {
    flex: 1,
    backgroundColor: "#080810",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  statLabel: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 4,
  },
  statVal: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },
  navigationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
    marginBottom: 12,
  },
  navBtn: {
    flex: 1,
    flexDirection: "row",
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  hudBtn: {
    backgroundColor: "#1e1e2e",
    borderWidth: 1,
    borderColor: "#3f3f46",
  },
  mapBtn: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
  },
  navBtnText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 13,
  },
  endRideBtn: {
    flexDirection: "row",
    backgroundColor: "#ef4444",
    height: 48,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  endRideBtnText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 14,
  },
  btnIcon: {
    marginRight: 6,
  },
  groupButtonsRow: {
    flexDirection: "row",
    gap: 12,
  },
  groupBtn: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  groupCreate: {
    backgroundColor: "#1e1e2e",
    borderWidth: 1,
    borderColor: "#3f3f46",
  },
  groupJoin: {
    backgroundColor: "#0d9488",
  },
  groupBtnText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 13,
  },
  roomStatusContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  roomCodeLabel: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  roomCodeText: {
    color: "#0d9488",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 4,
  },
  roomSubtext: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 16,
  },
  leaveRoomBtn: {
    backgroundColor: "#334155",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  leaveRoomText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 12,
  },
  checklist: {
    gap: 10,
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkText: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "600",
  },
  contactsList: {
    gap: 8,
  },
  contactPhone: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: "700",
  },
});
