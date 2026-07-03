import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated } from "react-native";
import { Mic, MicOff, Volume2, Phone } from "lucide-react-native";
import { useRideStore, TRANSLATIONS } from "../store/useRideStore";

export const VOXIntercom: React.FC = () => {
  const { language, isIntercomConnected, isMuted, toggleIntercom, toggleMute } = useRideStore();
  const t = TRANSLATIONS[language];

  const [dbLevel, setDbLevel] = useState(0);
  const [pulseAnim] = useState(new Animated.Value(1));
  const [incomingCallSim, setIncomingCallSim] = useState(false);

  // Simulating sound waves when connected (VOX)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isIntercomConnected && !isMuted && !incomingCallSim) {
      interval = setInterval(() => {
        const simulatedVoice = Math.random() > 0.45;
        const volume = simulatedVoice ? Math.floor(Math.random() * 80) + 20 : 0;
        setDbLevel(volume);

        // Pulse the button when speaking
        if (simulatedVoice) {
          Animated.sequence([
            Animated.timing(pulseAnim, { toValue: 1.15, duration: 150, useNativeDriver: true }),
            Animated.timing(pulseAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
          ]).start();
        }
      }, 400);
    } else {
      setDbLevel(0);
    }

    return () => clearInterval(interval);
  }, [isIntercomConnected, isMuted, incomingCallSim]);

  // Simulate an incoming phone call every 30 seconds to show "Smart Mute"
  useEffect(() => {
    let callTimer: NodeJS.Timeout;
    if (isIntercomConnected) {
      callTimer = setTimeout(() => {
        setIncomingCallSim(true);
        // Simulate vocal announcement and muting walkie talkie
        setTimeout(() => {
          setIncomingCallSim(false);
        }, 6000); // call lasts 6s
      }, 25000);
    }
    return () => clearTimeout(callTimer);
  }, [isIntercomConnected]);

  return (
    <View style={styles.container}>
      {incomingCallSim && (
        <View style={styles.callBanner}>
          <Phone size={16} color="#ffffff" style={styles.callIcon} />
          <Text style={styles.callText}>
            {language === "en" 
              ? "Incoming Call: Sheraz Pasha (Intercom Muted)" 
              : "آمدہ کال: شیراز پاشا (انٹرکام خاموش ہے)"}
          </Text>
        </View>
      )}

      <Animated.View style={[styles.mainBtnWrapper, { transform: [{ scale: pulseAnim }] }]}>
        <TouchableOpacity
          onPress={toggleIntercom}
          style={[styles.mainBtn, isIntercomConnected ? styles.connected : styles.disconnected]}
        >
          {isIntercomConnected ? (
            <Mic size={32} color="#ffffff" />
          ) : (
            <MicOff size={32} color="#94a3b8" />
          )}
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.statusText}>
        {isIntercomConnected 
          ? `${t.voxMode} (VOX)` 
          : (language === "en" ? "Intercom Offline" : "انٹرکام آف لائن")}
      </Text>

      {isIntercomConnected && !incomingCallSim && (
        <View style={styles.controlsRow}>
          {/* Mute Toggle */}
          <TouchableOpacity onPress={toggleMute} style={styles.controlBtn}>
            <Text style={styles.controlText}>
              {isMuted 
                ? (language === "en" ? "Unmute Mic" : "مائیک کھولیں")
                : (language === "en" ? "Mute Mic" : "مائیک بند کریں")}
            </Text>
          </TouchableOpacity>

          {/* Voice Wave Indicator */}
          <View style={styles.waveContainer}>
            <Text style={styles.waveText}>dB: {dbLevel}</Text>
            <View style={styles.dbMeter}>
              <View style={[styles.dbMeterFill, { width: `${dbLevel}%` }]}></View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 24,
    width: "100%",
  },
  callBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ef4444",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: "90%",
    justifyContent: "center",
  },
  callIcon: {
    marginRight: 8,
  },
  callText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 12,
  },
  mainBtnWrapper: {
    shadowColor: "#0d9488",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  mainBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
  },
  connected: {
    backgroundColor: "#0d9488",
    borderColor: "#ccfbf1",
  },
  disconnected: {
    backgroundColor: "#1e1e2e",
    borderColor: "#2e2e3e",
  },
  statusText: {
    marginTop: 12,
    color: "#e2e8f0",
    fontWeight: "700",
    fontSize: 14,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 16,
    backgroundColor: "#1e1e2e",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#2e2e3e",
  },
  controlBtn: {
    backgroundColor: "#334155",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  controlText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  waveContainer: {
    flex: 1,
    marginLeft: 16,
    alignItems: "flex-end",
  },
  waveText: {
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 4,
  },
  dbMeter: {
    width: "100%",
    height: 6,
    backgroundColor: "#0f172a",
    borderRadius: 3,
    overflow: "hidden",
  },
  dbMeterFill: {
    height: "100%",
    backgroundColor: "#10b981",
  },
});
