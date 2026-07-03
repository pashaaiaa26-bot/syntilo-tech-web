import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { Accelerometer } from "expo-sensors";
import { useRideStore, TRANSLATIONS } from "../store/useRideStore";

interface CrashDetectorProps {
  onSOSTriggered?: () => void;
}

export const CrashDetector: React.FC<CrashDetectorProps> = ({ onSOSTriggered }) => {
  const { language } = useRideStore();
  const t = TRANSLATIONS[language];

  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState<any>(null);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [countdown, setCountdown] = useState(15);

  const _subscribe = () => {
    // Check accelerations every 100ms
    Accelerometer.setUpdateInterval(100);
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
        
        // Calculate Total G-force
        const { x, y, z } = accelerometerData;
        const gForce = Math.sqrt(x * x + y * y + z * z);
        
        // Threshold for crash: > 2.8g sudden acceleration spike
        if (gForce > 2.8 && !isAlertActive) {
          setIsAlertActive(true);
        }
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  // Timer countdown loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAlertActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isAlertActive && countdown === 0) {
      // Trigger group emergency signal
      if (onSOSTriggered) onSOSTriggered();
      setIsAlertActive(false);
    }
    return () => clearTimeout(timer);
  }, [isAlertActive, countdown]);

  const dismissAlert = () => {
    setIsAlertActive(false);
    setCountdown(15);
  };

  return (
    <View style={styles.container}>
      <Modal visible={isAlertActive} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>🚨 {t.sosTrigger}</Text>
            <Text style={styles.alertDesc}>
              {language === "en" 
                ? "Sudden impact detected! Sending SOS in:" 
                : "اچانک تصادم کا پتہ چلا ہے! ہنگامی پیغام بھیجا جا رہا ہے:"}
            </Text>
            <Text style={styles.counter}>{countdown}</Text>
            <TouchableOpacity onPress={dismissAlert} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>
                {language === "en" ? "I AM OK (CANCEL)" : "میں ٹھیک ہوں (منسوخ کریں)"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 0,
    width: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(8, 8, 16, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertCard: {
    backgroundColor: "#1e1e2e",
    borderRadius: 16,
    padding: 32,
    width: "80%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ef4444",
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ef4444",
    marginBottom: 12,
  },
  alertDesc: {
    fontSize: 14,
    color: "#e2e8f0",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  counter: {
    fontSize: 64,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 24,
  },
  cancelBtn: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cancelText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
});
