import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, CloudRain, Fuel, Milestone, Sun, RotateCw, AlertTriangle } from "lucide-react-native";
import { useRideStore, TRANSLATIONS } from "../../store/useRideStore";
import { LanguageToggle } from "../../components/LanguageToggle";

const { width } = Dimensions.get("window");

export default function RideHUD() {
  const router = useRouter();
  const { language, telemetry, updateTelemetry, members } = useRideStore();
  const t = TRANSLATIONS[language];

  // Simulator states
  const [tick, setTick] = useState(0);
  const [leanAngle, setLeanAngle] = useState(0);
  const [compassHeading, setCompassHeading] = useState(180);
  const [speedUnit, setSpeedUnit] = useState<"KMH" | "MPH">("KMH");
  const [isLandscapeSim, setIsLandscapeSim] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);

      // Fluctuate speed around a realistic cruising speed (e.g. 85 km/h)
      const targetSpeed = 82;
      const speedFluctuation = Math.sin(tick * 0.1) * 8 + (Math.random() * 2 - 1);
      const speed = Math.round(targetSpeed + speedFluctuation);

      updateTelemetry(speed, speed / 3600);

      // Simulate leaning (lean angles change as user navigates curves)
      const simulatedLean = Math.round(Math.sin(tick * 0.15) * 18);
      setLeanAngle(simulatedLean);

      // Simulate compass turning slowly
      const heading = (180 + Math.round(Math.sin(tick * 0.05) * 45)) % 360;
      setCompassHeading(heading);
    }, 1000);

    return () => clearInterval(interval);
  }, [tick]);

  const displaySpeed = speedUnit === "KMH" 
    ? telemetry.currentSpeed 
    : Math.round(telemetry.currentSpeed * 0.621371);

  // Compass directions
  const getDirection = (heading: number) => {
    if (heading >= 337.5 || heading < 22.5) return "N";
    if (heading >= 22.5 && heading < 67.5) return "NE";
    if (heading >= 67.5 && heading < 112.5) return "E";
    if (heading >= 112.5 && heading < 157.5) return "SE";
    if (heading >= 157.5 && heading < 202.5) return "S";
    if (heading >= 202.5 && heading < 247.5) return "SW";
    if (heading >= 247.5 && heading < 292.5) return "W";
    return "NW";
  };

  return (
    <ScrollView 
      contentContainerStyle={[
        styles.container,
        isLandscapeSim ? styles.landscapeContainer : {}
      ]}
    >
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {language === "en" ? "OLED HUD CLUSTER" : "ایچ یو ڈی اسکرین"}
        </Text>
        <TouchableOpacity 
          onPress={() => setIsLandscapeSim(!isLandscapeSim)}
          style={styles.rotationToggle}
        >
          <RotateCw size={14} color="#0d9488" />
          <Text style={styles.rotateText}>
            {isLandscapeSim ? "PORTRAIT" : "LANDSCAPE"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Speedometer Ring */}
      <View style={styles.speedometerContainer}>
        <View style={styles.glowingRing}>
          <Text style={styles.speedNumber}>{displaySpeed}</Text>
          <Text style={styles.speedUnitText}>
            {speedUnit}
          </Text>
        </View>

        {/* Speed Unit Toggle Button */}
        <TouchableOpacity 
          onPress={() => setSpeedUnit(speedUnit === "KMH" ? "MPH" : "KMH")}
          style={styles.unitToggle}
        >
          <Text style={styles.unitToggleText}>
            {language === "en" ? "Toggle Unit" : "یونٹ تبدیل کریں"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Compass Ribbon tape */}
      <View style={styles.compassContainer}>
        <View style={styles.compassRibbon}>
          <Text style={styles.headingAngle}>{compassHeading}°</Text>
          <Text style={styles.headingDirection}>{getDirection(compassHeading)}</Text>
        </View>
        <View style={styles.rulerTape}>
          {[-2, -1, 0, 1, 2].map((offset) => {
            const labelDegree = (compassHeading + offset * 30 + 360) % 360;
            return (
              <View key={offset} style={styles.rulerTick}>
                <View style={styles.tickLine} />
                <Text style={styles.tickLabel}>{labelDegree}°</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Lean angle roll widgets */}
      <View style={styles.leanGrid}>
        <View style={styles.leanCard}>
          <Text style={styles.leanLabel}>LEFT BANK</Text>
          <Text style={styles.leanValue}>
            {leanAngle < 0 ? Math.abs(leanAngle) : 0}°
          </Text>
          <View style={styles.leanMeterBG}>
            <View 
              style={[
                styles.leanMeterFill, 
                { width: `${leanAngle < 0 ? Math.min(100, Math.abs(leanAngle) * 3) : 0}%`, backgroundColor: "#0d9488" }
              ]} 
            />
          </View>
        </View>

        <View style={styles.leanCard}>
          <Text style={styles.leanLabel}>RIGHT BANK</Text>
          <Text style={styles.leanValue}>
            {leanAngle > 0 ? leanAngle : 0}°
          </Text>
          <View style={styles.leanMeterBG}>
            <View 
              style={[
                styles.leanMeterFill, 
                { width: `${leanAngle > 0 ? Math.min(100, leanAngle * 3) : 0}%`, backgroundColor: "#0d9488" }
              ]} 
            />
          </View>
        </View>
      </View>

      {/* Weather AI & Pit stop planner cards */}
      <View style={styles.dashboardGrid}>
        {/* Weather AI Banner */}
        <View style={styles.hudCard}>
          <View style={styles.cardHeader}>
            <CloudRain size={16} color="#0d9488" />
            <Text style={styles.hudCardTitle}>PREDICTIVE WEATHER AI</Text>
          </View>
          <Text style={styles.hudCardText}>
            {language === "en" 
              ? "Rain cloud approaching in 14km. Road grip optimized." 
              : "آگے 14 کلومیٹر پر بارش متوقع ہے۔ رفتار آہستہ رکھیں۔"}
          </Text>
          <View style={styles.weatherWarningBadge}>
            <AlertTriangle size={12} color="#f59e0b" />
            <Text style={styles.warningBadgeText}>
              {language === "en" ? "Grip: Wet Advisory" : "انتباہ: گیلی سڑک"}
            </Text>
          </View>
        </View>

        {/* Coordinated Pit Stop Planner */}
        <View style={styles.hudCard}>
          <View style={styles.cardHeader}>
            <Fuel size={16} color="#0d9488" />
            <Text style={styles.hudCardTitle}>PIT-STOP PLANNER (SYNC)</Text>
          </View>
          <Text style={styles.hudCardText}>
            {language === "en" 
              ? "Shortest range bike: 80km remaining. Synced fuel stop scheduled in 32km." 
              : "سب سے چھوٹی ٹینکی کے حساب سے اگلا اسٹاپ 32 کلومیٹر بعد شیڈول ہے۔"}
          </Text>
          <View style={styles.fuelStationBadge}>
            <Milestone size={12} color="#10b981" />
            <Text style={styles.fuelStationText}>
              PSO Petrol Pump (32km)
            </Text>
          </View>
        </View>
      </View>

      {/* Active Group Speed Chips */}
      {members.length > 0 && (
        <View style={styles.groupWidget}>
          <Text style={styles.groupWidgetTitle}>GROUP MEMBER SPEEDS</Text>
          <View style={styles.groupChipsContainer}>
            {members.map((rider) => (
              <View key={rider.id} style={styles.groupRiderChip}>
                <Text style={styles.groupRiderName}>{rider.name.split(" ")[0]}</Text>
                <Text style={styles.groupRiderSpeed}>{rider.speed} km/h</Text>
              </View>
            ))}
          </View>
        </View>
      )}
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
  landscapeContainer: {
    paddingHorizontal: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backBtn: {
    padding: 8,
    backgroundColor: "#111827",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  rotationToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0d948810",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#0d948840",
    gap: 6,
  },
  rotateText: {
    color: "#0d9488",
    fontSize: 10,
    fontWeight: "800",
  },
  speedometerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  glowingRing: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 4,
    borderColor: "#0d9488",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0d9488",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
    backgroundColor: "#080810",
  },
  speedNumber: {
    fontSize: 64,
    fontWeight: "900",
    color: "#ffffff",
  },
  speedUnitText: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "800",
    marginTop: -4,
  },
  unitToggle: {
    marginTop: 14,
    backgroundColor: "#111827",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  unitToggleText: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "700",
  },
  compassContainer: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    marginBottom: 20,
    alignItems: "center",
  },
  compassRibbon: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginBottom: 12,
  },
  headingAngle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
  },
  headingDirection: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0d9488",
  },
  rulerTape: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  rulerTick: {
    alignItems: "center",
  },
  tickLine: {
    width: 2,
    height: 10,
    backgroundColor: "#374151",
    marginBottom: 4,
  },
  tickLabel: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "700",
  },
  leanGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  leanCard: {
    flex: 1,
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  leanLabel: {
    color: "#64748b",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 4,
  },
  leanValue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 8,
  },
  leanMeterBG: {
    width: "100%",
    height: 6,
    backgroundColor: "#080810",
    borderRadius: 3,
    overflow: "hidden",
  },
  leanMeterFill: {
    height: "100%",
  },
  dashboardGrid: {
    gap: 16,
    marginBottom: 20,
  },
  hudCard: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  hudCardTitle: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  hudCardText: {
    color: "#e2e8f0",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  weatherWarningBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f59e0b10",
    borderWidth: 1,
    borderColor: "#f59e0b30",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
    gap: 6,
  },
  warningBadgeText: {
    color: "#f59e0b",
    fontSize: 10,
    fontWeight: "800",
  },
  fuelStationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b98110",
    borderWidth: 1,
    borderColor: "#10b98130",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
    gap: 6,
  },
  fuelStationText: {
    color: "#10b981",
    fontSize: 10,
    fontWeight: "800",
  },
  groupWidget: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    marginBottom: 20,
  },
  groupWidgetTitle: {
    color: "#64748b",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 12,
  },
  groupChipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  groupRiderChip: {
    flexDirection: "row",
    backgroundColor: "#080810",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    alignItems: "center",
    gap: 8,
  },
  groupRiderName: {
    color: "#f8fafc",
    fontSize: 11,
    fontWeight: "700",
  },
  groupRiderSpeed: {
    color: "#0d9488",
    fontSize: 11,
    fontWeight: "800",
  },
});
