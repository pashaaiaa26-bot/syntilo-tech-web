import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Crown, ShieldAlert, Navigation, Settings, Eye } from "lucide-react-native";
import { useRideStore, TRANSLATIONS, RiderMember } from "../../store/useRideStore";
import { LanguageToggle } from "../../components/LanguageToggle";

const { width } = Dimensions.get("window");

export default function RideMap() {
  const router = useRouter();
  const {
    language,
    roomCode,
    isLeader,
    members,
    telemetry,
    updateTelemetry,
    setMembers,
  } = useRideStore();
  const t = TRANSLATIONS[language];

  // Simulation states
  const [vehicleMode, setVehicleMode] = useState<"BIKE" | "CAR" | "COASTER" | "HIKING">("BIKE");
  const [mapScale, setMapScale] = useState(1);
  const [simulationTick, setSimulationTick] = useState(0);
  const [rubberBandingAlert, setRubberBandingAlert] = useState(false);

  // Update telemetry and move simulated riders
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulationTick((prev) => prev + 1);

      // Random speed fluctuation
      const speedChange = Math.floor(Math.random() * 15) - 7;
      const baseSpeed = vehicleMode === "BIKE" ? 75 : vehicleMode === "CAR" ? 90 : vehicleMode === "COASTER" ? 50 : 6;
      const speed = Math.max(0, baseSpeed + speedChange);

      // Distance covered in 1 second
      const deltaDistance = speed / 3600;

      // Update store telemetry
      updateTelemetry(speed, deltaDistance);

      // Update locations of other members in store to simulate tracking
      const updatedMembers = members.map((m) => {
        if (m.id === "me") {
          return {
            ...m,
            speed,
            lat: m.lat + (Math.random() - 0.5) * 0.0003,
            lng: m.lng + (Math.random() - 0.5) * 0.0003,
          };
        } else {
          // Simulated rider behavior
          const randomSpeed = Math.max(0, m.speed + (Math.random() * 10 - 5));
          return {
            ...m,
            speed: Math.round(randomSpeed),
            // Leader or other rider moves slightly differently
            lat: m.lat + (Math.random() - 0.48) * 0.0003,
            lng: m.lng + (Math.random() - 0.48) * 0.0003,
          };
        }
      });

      setMembers(updatedMembers);

      // Calculate distance between "me" and leader (or rider_2) to trigger rubber-banding
      const me = updatedMembers.find((m) => m.id === "me");
      const leader = updatedMembers.find((m) => m.isLeader) || updatedMembers[0];
      if (me && leader && me.id !== leader.id) {
        const distance = Math.sqrt(Math.pow(me.lat - leader.lat, 2) + Math.pow(me.lng - leader.lng, 2)) * 111; // Approx km
        if (distance > 0.12) {
          setRubberBandingAlert(true);
        } else {
          setRubberBandingAlert(false);
        }
      } else {
        // If I am the leader, simulate a member falling behind occasionally
        if (simulationTick > 5 && simulationTick % 8 === 0) {
          setRubberBandingAlert(Math.random() > 0.4);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [vehicleMode, members, simulationTick]);

  return (
    <View style={styles.container}>
      {/* Map simulation viewport */}
      <View style={styles.mapViewport}>
        {/* Simulated Grid Lines */}
        <View style={styles.gridLines}>
          {[...Array(6)].map((_, i) => (
            <View key={`h-${i}`} style={[styles.gridLineH, { top: `${(i + 1) * 16}%` }]} />
          ))}
          {[...Array(6)].map((_, i) => (
            <View key={`v-${i}`} style={[styles.gridLineV, { left: `${(i + 1) * 16}%` }]} />
          ))}
        </View>

        {/* Outer Circular Radar Sweep */}
        <View style={styles.radarSweep} />

        {/* Top Control Bar Overlaid on Map */}
        <View style={styles.topOverlayBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <ArrowLeft size={20} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.roomBadge}>
            <Text style={styles.roomBadgeLabel}>
              {language === "en" ? "ROOM:" : "روم:"}
            </Text>
            <Text style={styles.roomBadgeVal}>{roomCode || "SOLO"}</Text>
          </View>
          <LanguageToggle />
        </View>

        {/* Rubber Banding Distance Warning */}
        {rubberBandingAlert && (
          <View style={styles.alertBanner}>
            <ShieldAlert size={16} color="#ffffff" style={styles.alertIcon} />
            <Text style={styles.alertText}>
              {isLeader
                ? language === "en"
                  ? "RUBBER-BAND WARNING: Riders falling behind!"
                  : "انتباہ: سوار پیچھے رہ رہے ہیں!"
                : language === "en"
                ? "RUBBER-BAND WARNING: Catch up to the leader!"
                : "انتباہ: گروپ لیڈر سے فاصلہ بڑھ رہا ہے!"}
            </Text>
          </View>
        )}

        {/* Simulated Map Markers */}
        <View style={styles.markersContainer}>
          {members.map((rider) => {
            const isMe = rider.id === "me";
            // Map lat/lng deviations to pixel coordinates centered on viewport
            const xOffset = (rider.lng - 73.0479) * 200000 * mapScale;
            const yOffset = (33.6844 - rider.lat) * 200000 * mapScale;

            const leftPos = width / 2 + xOffset - 25;
            const topPos = 240 + yOffset - 25;

            return (
              <View
                key={rider.id}
                style={[
                  styles.markerWrapper,
                  { left: leftPos, top: topPos },
                ]}
              >
                {rider.isLeader && (
                  <View style={styles.leaderCrown}>
                    <Crown size={12} color="#fbbf24" fill="#fbbf24" />
                  </View>
                )}
                <View style={[styles.avatarCircle, isMe ? styles.myAvatar : styles.riderAvatar]}>
                  <Text style={styles.avatarLetter}>
                    {rider.name.substring(0, 1)}
                  </Text>
                </View>
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{rider.speed} km/h</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Compass Ring & Center HUD Overlay */}
        <View style={styles.centerIndicator}>
          <Navigation size={28} color="#0d9488" style={{ transform: [{ rotate: `${simulationTick * 4}deg` }] }} />
        </View>
      </View>

      {/* Floating Action Controls */}
      <View style={styles.controlsSheet}>
        <Text style={styles.sheetLabel}>
          {language === "en" ? "ACTIVE VEHICLE AVATAR" : "گاڑی کا اوتار"}
        </Text>
        <View style={styles.vehicleToggleRow}>
          {(["BIKE", "CAR", "COASTER", "HIKING"] as const).map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => setVehicleMode(mode)}
              style={[styles.vehBtn, vehicleMode === mode ? styles.activeVehBtn : {}]}
            >
              <Text style={[styles.vehBtnText, vehicleMode === mode ? styles.activeVehText : {}]}>
                {mode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Members Status Check list */}
        <Text style={styles.sheetLabel}>
          {language === "en" ? "GROUP PRESENCE CHIPS" : "سواروں کی فہرست"}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.presenceRow}>
          {members.map((rider) => (
            <View key={rider.id} style={styles.presenceChip}>
              <View
                style={[
                  styles.statusIndicator,
                  rider.status === "SOS"
                    ? styles.sosDot
                    : rider.status === "Stopped"
                    ? styles.stopDot
                    : styles.activeDot,
                ]}
              />
              {rider.isLeader && <Text style={styles.crownInline}>👑</Text>}
              <Text style={styles.presenceName}>{rider.name.split(" ")[0]}</Text>
              <Text style={styles.presenceSpeed}>{rider.speed} km/h</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footerRow}>
          <View style={styles.telemetryQuickGroup}>
            <Text style={styles.quickTitle}>
              {language === "en" ? "TRIP COVERED" : "کل فاصلہ"}
            </Text>
            <Text style={styles.quickValue}>
              {telemetry.totalDistance.toFixed(2)} km
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/(ride)/hud")} style={styles.hudCTA}>
            <Eye size={16} color="#ffffff" style={styles.btnIcon} />
            <Text style={styles.hudCTAText}>
              {language === "en" ? "OPEN HUD MODE" : "HUD اسکرین"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080810",
  },
  mapViewport: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  gridLines: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  gridLineH: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#ffffff",
  },
  gridLineV: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "#ffffff",
  },
  radarSweep: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 1,
    borderColor: "#0d9488",
    opacity: 0.25,
    alignSelf: "center",
    top: 110,
  },
  topOverlayBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  iconBtn: {
    padding: 10,
    backgroundColor: "#111827cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#37415160",
  },
  roomBadge: {
    flexDirection: "row",
    backgroundColor: "#111827cf",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#37415180",
    alignItems: "center",
    gap: 4,
  },
  roomBadgeLabel: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "900",
  },
  roomBadgeVal: {
    color: "#0d9488",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  alertBanner: {
    position: "absolute",
    top: 110,
    left: 20,
    right: 20,
    backgroundColor: "#ef4444e5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  alertIcon: {
    marginRight: 8,
  },
  alertText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 11,
  },
  markersContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  markerWrapper: {
    position: "absolute",
    alignItems: "center",
  },
  leaderCrown: {
    marginBottom: -4,
    zIndex: 2,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  myAvatar: {
    backgroundColor: "#0d9488",
    borderColor: "#ccfbf1",
  },
  riderAvatar: {
    backgroundColor: "#1e1e2e",
    borderColor: "#94a3b8",
  },
  avatarLetter: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },
  badgeContainer: {
    backgroundColor: "#111827d0",
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#37415170",
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 8,
    fontWeight: "800",
  },
  centerIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: 226,
    opacity: 0.8,
  },
  controlsSheet: {
    backgroundColor: "#111827",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 20,
    paddingBottom: 24,
  },
  sheetLabel: {
    color: "#64748b",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  vehicleToggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#080810",
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  vehBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  activeVehBtn: {
    backgroundColor: "#0d9488",
  },
  vehBtnText: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "800",
  },
  activeVehText: {
    color: "#ffffff",
  },
  presenceRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  presenceChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#080810",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    gap: 8,
  },
  statusIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    backgroundColor: "#10b981",
  },
  stopDot: {
    backgroundColor: "#f59e0b",
  },
  sosDot: {
    backgroundColor: "#ef4444",
  },
  crownInline: {
    fontSize: 10,
  },
  presenceName: {
    color: "#f8fafc",
    fontSize: 11,
    fontWeight: "700",
  },
  presenceSpeed: {
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "700",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#1f2937",
    paddingTop: 16,
  },
  telemetryQuickGroup: {
    flex: 1,
  },
  quickTitle: {
    color: "#64748b",
    fontSize: 9,
    fontWeight: "700",
  },
  quickValue: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 2,
  },
  hudCTA: {
    flexDirection: "row",
    backgroundColor: "#0d9488",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  hudCTAText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900",
  },
  btnIcon: {
    marginRight: 6,
  },
});
