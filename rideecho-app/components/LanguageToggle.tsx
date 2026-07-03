import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRideStore } from "../store/useRideStore";

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useRideStore();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setLanguage("en")}
        style={[styles.btn, language === "en" ? styles.activeBtn : {}]}
      >
        <Text style={[styles.btnText, language === "en" ? styles.activeText : {}]}>
          EN
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setLanguage("ur")}
        style={[styles.btn, language === "ur" ? styles.activeBtn : {}]}
      >
        <Text style={[styles.btnText, language === "ur" ? styles.activeText : {}]}>
          اردو
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1e1e2e",
    borderRadius: 8,
    padding: 3,
    borderWidth: 1,
    borderColor: "#2e2e3e",
    alignSelf: "center",
    marginVertical: 12,
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  activeBtn: {
    backgroundColor: "#0d9488", // Syntilo Emerald
  },
  btnText: {
    fontFamily: "System",
    fontWeight: "700",
    fontSize: 12,
    color: "#94a3b8",
  },
  activeText: {
    color: "#ffffff",
  },
});
