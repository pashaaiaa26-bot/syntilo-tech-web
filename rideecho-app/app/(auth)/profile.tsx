import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { User, Plus, Trash2, HeartHandshake } from "lucide-react-native";
import { useRideStore, TRANSLATIONS } from "../../store/useRideStore";
import { LanguageToggle } from "../../components/LanguageToggle";

export default function ProfileSetup() {
  const router = useRouter();
  const { language, profile, setProfileInfo, addEmergencyContact, removeEmergencyContact } = useRideStore();
  const t = TRANSLATIONS[language];

  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [newContact, setNewContact] = useState("");
  const [error, setError] = useState("");

  const handleAddContact = () => {
    if (newContact.trim().length < 9) {
      Alert.alert(
        language === "en" ? "Invalid Contact" : "غلط نمبر",
        language === "en" ? "Enter a valid emergency contact number." : "برائے مہربانی درست ہنگامی رابطہ نمبر درج کریں۔"
      );
      return;
    }
    addEmergencyContact(newContact);
    setNewContact("");
  };

  const handleSaveProfile = () => {
    if (!name.trim()) {
      setError(language === "en" ? "Please enter your name." : "برائے مہربانی اپنا نام درج کریں۔");
      return;
    }
    if (!bloodGroup.trim()) {
      setError(language === "en" ? "Please enter your blood group." : "برائے مہربانی بلڈ گروپ درج کریں۔");
      return;
    }
    if (profile.emergencyContacts.length === 0) {
      setError(
        language === "en" 
          ? "Add at least one emergency contact." 
          : "برائے مہربانی کم از کم ایک ہنگامی رابطہ شامل کریں۔"
      );
      return;
    }

    setError("");
    setProfileInfo(name, bloodGroup);
    router.replace("/(auth)/paywall");
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <LanguageToggle />

      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <User size={32} color="#0d9488" />
        </View>
        <Text style={styles.title}>{t.profileTitle}</Text>
        <Text style={styles.subtitle}>
          {language === "en"
            ? "Your safety profile is locked into the offline app database to alert coordinators in case of emergency."
            : "آپ کا ہنگامی پروفائل محفوظ کیا جائے گا تاکہ ہنگامی صورتحال میں ٹیم کو مطلع کیا جا سکے۔"}
        </Text>
      </View>

      <View style={styles.form}>
        {/* Name */}
        <Text style={styles.label}>{language === "en" ? "Full Name" : "پورا نام"}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            value={name}
            onChangeText={(text) => {
              setName(text);
              setError("");
            }}
            placeholder="Sheraz Pasha"
            placeholderTextColor="#64748b"
            style={styles.input}
          />
        </View>

        {/* Blood Group */}
        <Text style={styles.label}>{t.bloodGroup}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            value={bloodGroup}
            onChangeText={(text) => {
              setBloodGroup(text);
              setError("");
            }}
            placeholder={t.bloodPlaceholder}
            placeholderTextColor="#64748b"
            style={styles.input}
            maxLength={3}
          />
        </View>

        {/* Emergency Contacts List */}
        <Text style={styles.label}>{t.emergencyContact}</Text>
        <View style={styles.contactAddRow}>
          <View style={[styles.inputWrapper, styles.contactInput]}>
            <TextInput
              value={newContact}
              onChangeText={setNewContact}
              placeholder="+92 321 9876543"
              placeholderTextColor="#64748b"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>
          <TouchableOpacity onPress={handleAddContact} style={styles.addBtn}>
            <Plus size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Display Contact Chips */}
        {profile.emergencyContacts.map((contact, index) => (
          <View key={index} style={styles.contactRow}>
            <Text style={styles.contactNum}>{contact}</Text>
            <TouchableOpacity onPress={() => removeEmergencyContact(contact)}>
              <Trash2 size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
        ))}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity onPress={handleSaveProfile} style={styles.submitBtn}>
          <Text style={styles.submitText}>
            {language === "en" ? "Save Emergency Profile" : "پروفائل محفوظ کریں"}
          </Text>
          <HeartHandshake size={18} color="#ffffff" style={styles.btnIcon} />
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
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  title: {
    fontSize: 22,
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
  form: {
    width: "100%",
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  label: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
    marginBottom: 6,
    marginTop: 14,
  },
  inputWrapper: {
    backgroundColor: "#030712",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#374151",
    paddingHorizontal: 16,
    height: 48,
    justifyContent: "center",
  },
  input: {
    color: "#ffffff",
    fontSize: 15,
    width: "100%",
  },
  contactAddRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  contactInput: {
    flex: 1,
  },
  addBtn: {
    width: 48,
    height: 48,
    backgroundColor: "#0d9488",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1f2937",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#374151",
  },
  contactNum: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 12,
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
    fontSize: 15,
  },
  btnIcon: {
    marginLeft: 8,
  },
});
