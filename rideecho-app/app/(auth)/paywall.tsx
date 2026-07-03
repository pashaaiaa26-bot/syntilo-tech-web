import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ShieldAlert, Compass, CloudSun, Check, Sparkles } from "lucide-react-native";
import { useRideStore, TRANSLATIONS } from "../../store/useRideStore";
import { LanguageToggle } from "../../components/LanguageToggle";

export default function Paywall() {
  const router = useRouter();
  const { language, activatePremium } = useRideStore();
  const t = TRANSLATIONS[language];

  const [currency, setCurrency] = useState<"USD" | "PKR">("PKR");

  const handleSubscribe = () => {
    activatePremium();
    router.replace("/(ride)/dashboard");
  };

  const handleStartTrial = () => {
    router.replace("/(ride)/dashboard");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LanguageToggle />

      {/* Currency Switcher */}
      <View style={styles.currencyToggle}>
        <TouchableOpacity
          onPress={() => setCurrency("PKR")}
          style={[styles.currencyBtn, currency === "PKR" ? styles.activeCurrency : {}]}
        >
          <Text style={[styles.currencyText, currency === "PKR" ? styles.activeCurrencyText : {}]}>
            PKR (Rs)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrency("USD")}
          style={[styles.currencyBtn, currency === "USD" ? styles.activeCurrency : {}]}
        >
          <Text style={[styles.currencyText, currency === "USD" ? styles.activeCurrencyText : {}]}>
            USD ($)
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Sparkles size={40} color="#0d9488" style={styles.sparkleIcon} />
        <Text style={styles.title}>{t.premiumTitle}</Text>
        <Text style={styles.subtitle}>{t.premiumSub}</Text>
      </View>

      {/* Feature Grid */}
      <View style={styles.features}>
        <View style={styles.featureItem}>
          <Check size={18} color="#10b981" />
          <Text style={styles.featureText}>
            {language === "en" ? "Unlimited access to HUD telemetry cluster" : "HUD ٹیلی میٹری اسکرین تک لا محدود رسائی"}
          </Text>
        </View>
        <View style={styles.featureItem}>
          <CloudSun size={18} color="#10b981" />
          <Text style={styles.featureText}>
            {language === "en" ? "Predictive Weather AI warnings (50km range)" : "ویدر AI کے ذریعے طوفان کی قبل از وقت وارننگ"}
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Compass size={18} color="#10b981" />
          <Text style={styles.featureText}>
            {language === "en" ? "Smart Pit-Stop Planner (fuel-tank range sync)" : "اسمارٹ فیول اسٹاپس پلانر"}
          </Text>
        </View>
        <View style={styles.featureItem}>
          <ShieldAlert size={18} color="#10b981" />
          <Text style={styles.featureText}>
            {language === "en" ? "Voice SOS notifications & Rubber-Banding warnings" : "ایس او ایس سائرن اور فاصلے کے آڈیو الرٹس"}
          </Text>
        </View>
      </View>

      {/* Pricing Cards */}
      <View style={styles.pricingCard}>
        <Text style={styles.tierName}>PREMIUM PRO MONTHLY</Text>
        <Text style={styles.priceText}>
          {currency === "PKR" ? t.pkrPrice : t.usdPrice}
        </Text>
        <Text style={styles.billingPeriod}>
          {language === "en" ? "Billed monthly. Cancel anytime." : "ماہانہ بل۔ کسی بھی وقت منسوخ کریں۔"}
        </Text>
      </View>

      <View style={[styles.pricingCard, styles.annualCard]}>
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>BEST VALUE (SAVE 33%)</Text>
        </View>
        <Text style={[styles.tierName, styles.whiteText]}>PREMIUM PRO ANNUAL</Text>
        <Text style={styles.priceText}>
          {currency === "PKR" ? t.annualPkrPrice : t.annualUsdPrice}
        </Text>
        <Text style={styles.billingPeriod}>
          {language === "en" ? "Billed annually. Full protection." : "سالانہ بل۔ مکمل حفاظت۔"}
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleSubscribe} style={styles.subBtn}>
          <Text style={styles.subBtnText}>{t.subscribe}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleStartTrial} style={styles.trialBtn}>
          <Text style={styles.trialBtnText}>{t.startTrial}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#080810",
    padding: 24,
    justifyContent: "center",
  },
  currencyToggle: {
    flexDirection: "row",
    backgroundColor: "#111827",
    borderRadius: 8,
    padding: 4,
    alignSelf: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  currencyBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  activeCurrency: {
    backgroundColor: "#0d9488",
  },
  currencyText: {
    color: "#64748b",
    fontWeight: "700",
    fontSize: 12,
  },
  activeCurrencyText: {
    color: "#ffffff",
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  sparkleIcon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  features: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1f2937",
    marginBottom: 24,
    gap: 14,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureText: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },
  pricingCard: {
    backgroundColor: "#111827",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 20,
    marginBottom: 16,
  },
  annualCard: {
    borderColor: "#0d9488",
    borderWidth: 2,
    position: "relative",
  },
  popularBadge: {
    position: "absolute",
    top: -12,
    right: 16,
    backgroundColor: "#0d9488",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 99,
  },
  popularText: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "900",
  },
  tierName: {
    fontSize: 10,
    fontWeight: "800",
    color: "#94a3b8",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  whiteText: {
    color: "#0d9488",
  },
  priceText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    marginVertical: 4,
  },
  billingPeriod: {
    fontSize: 11,
    color: "#64748b",
  },
  actions: {
    marginTop: 12,
    gap: 12,
  },
  subBtn: {
    backgroundColor: "#0d9488",
    height: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  subBtnText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 15,
  },
  trialBtn: {
    borderColor: "#374151",
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111827",
  },
  trialBtnText: {
    color: "#94a3b8",
    fontWeight: "700",
    fontSize: 14,
  },
});
