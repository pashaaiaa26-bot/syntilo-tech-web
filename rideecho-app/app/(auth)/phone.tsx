import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Phone, ArrowRight, ShieldCheck } from "lucide-react-native";
import { useRideStore, TRANSLATIONS } from "../../store/useRideStore";
import { LanguageToggle } from "../../components/LanguageToggle";

export default function PhoneAuth() {
  const router = useRouter();
  const { language, setPhone } = useRideStore();
  const t = TRANSLATIONS[language];

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [error, setError] = useState("");

  const handleSendOtp = () => {
    if (phoneNumber.trim().length < 9) {
      setError(language === "en" ? "Enter a valid phone number." : "برائے مہربانی درست فون نمبر درج کریں۔");
      return;
    }
    setError("");
    setStep("otp");
  };

  const handleVerifyOtp = () => {
    if (otpCode.trim().length !== 6) {
      setError(language === "en" ? "Verification code must be 6 digits." : "تصدیقی کوڈ 6 ہندسوں کا ہونا چاہیے۔");
      return;
    }
    setError("");
    setPhone(phoneNumber);
    router.replace("/(auth)/profile");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <LanguageToggle />
        
        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <Phone size={36} color="#0d9488" />
          </View>

          <Text style={styles.title}>{t.welcome}</Text>
          <Text style={styles.subtitle}>{t.introSub}</Text>

          {step === "phone" ? (
            <View style={styles.form}>
              <Text style={styles.inputLabel}>{t.phoneInput}</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  value={phoneNumber}
                  onChangeText={(text) => {
                    setPhoneNumber(text);
                    setError("");
                  }}
                  placeholder={t.phonePlaceholder}
                  placeholderTextColor="#64748b"
                  keyboardType="phone-pad"
                  style={styles.input}
                />
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity onPress={handleSendOtp} style={styles.submitBtn}>
                <Text style={styles.submitText}>{t.sendOtp}</Text>
                <ArrowRight size={18} color="#ffffff" style={styles.btnIcon} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.inputLabel}>{t.enterOtp}</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  value={otpCode}
                  onChangeText={(text) => {
                    setOtpCode(text);
                    setError("");
                  }}
                  placeholder="123456"
                  placeholderTextColor="#64748b"
                  keyboardType="number-pad"
                  maxLength={6}
                  style={[styles.input, styles.otpInput]}
                />
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity onPress={handleVerifyOtp} style={styles.submitBtn}>
                <Text style={styles.submitText}>{t.verifyOtp}</Text>
                <ShieldCheck size={18} color="#ffffff" style={styles.btnIcon} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setStep("phone")} style={styles.backBtn}>
                <Text style={styles.backText}>
                  {language === "en" ? "Change Phone Number" : "فون نمبر تبدیل کریں"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080810",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 20,
  },
  form: {
    width: "100%",
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  inputLabel: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: "#030712",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#374151",
    paddingHorizontal: 16,
    height: 52,
    justifyContent: "center",
  },
  input: {
    color: "#ffffff",
    fontSize: 16,
    width: "100%",
  },
  otpInput: {
    textAlign: "center",
    letterSpacing: 8,
    fontWeight: "800",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "600",
  },
  submitBtn: {
    backgroundColor: "#0d9488",
    borderRadius: 8,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  submitText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 16,
  },
  btnIcon: {
    marginLeft: 8,
  },
  backBtn: {
    marginTop: 16,
    alignSelf: "center",
  },
  backText: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
  },
});
