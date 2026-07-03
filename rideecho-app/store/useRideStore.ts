import { create } from "zustand";

export type LanguageMode = "en" | "ur";

export interface RiderMember {
  id: string;
  name: string;
  speed: number;
  status: "Active" | "Stopped" | "SOS";
  isLeader: boolean;
  lat: number;
  lng: number;
}

interface TelemetryData {
  currentSpeed: number;
  maxSpeed: number;
  totalDistance: number;
  durationSeconds: number;
}

interface UserProfile {
  phone: string | null;
  name: string | null;
  bloodGroup: string | null;
  emergencyContacts: string[];
  isPremium: boolean;
}

interface RideState {
  // Locale State
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;

  // Auth & Profile State
  profile: UserProfile;
  setPhone: (phone: string) => void;
  setProfileInfo: (name: string, bloodGroup: string) => void;
  addEmergencyContact: (phone: string) => void;
  removeEmergencyContact: (phone: string) => void;
  activatePremium: () => void;

  // Active Ride Session
  isRiding: boolean;
  telemetry: TelemetryData;
  startRide: () => void;
  stopRide: () => void;
  updateTelemetry: (speed: number, deltaDistance: number) => void;
  resetTelemetry: () => void;

  // Group Room Tracking
  roomCode: string | null;
  isLeader: boolean;
  members: RiderMember[];
  setRoomCode: (code: string | null, isLeader: boolean) => void;
  updateMemberLocation: (id: string, lat: number, lng: number, speed: number) => void;
  setMembers: (members: RiderMember[]) => void;

  // Audio / Walkie-Talkie Settings
  isIntercomConnected: boolean;
  isMuted: boolean;
  toggleIntercom: () => void;
  toggleMute: () => void;
}

export const useRideStore = create<RideState>((set) => ({
  // Defaults
  language: "en",
  profile: {
    phone: null,
    name: null,
    bloodGroup: null,
    emergencyContacts: [],
    isPremium: false,
  },
  isRiding: false,
  telemetry: {
    currentSpeed: 0,
    maxSpeed: 0,
    totalDistance: 0,
    durationSeconds: 0,
  },
  roomCode: null,
  isLeader: false,
  members: [],
  isIntercomConnected: false,
  isMuted: false,

  // Setters
  setLanguage: (language) => set({ language }),

  setPhone: (phone) =>
    set((state) => ({
      profile: { ...state.profile, phone },
    })),

  setProfileInfo: (name, bloodGroup) =>
    set((state) => ({
      profile: { ...state.profile, name, bloodGroup },
    })),

  addEmergencyContact: (phone) =>
    set((state) => {
      if (state.profile.emergencyContacts.includes(phone)) return {};
      return {
        profile: {
          ...state.profile,
          emergencyContacts: [...state.profile.emergencyContacts, phone],
        },
      };
    }),

  removeEmergencyContact: (phone) =>
    set((state) => ({
      profile: {
        ...state.profile,
        emergencyContacts: state.profile.emergencyContacts.filter((c) => c !== phone),
      },
    })),

  activatePremium: () =>
    set((state) => ({
      profile: { ...state.profile, isPremium: true },
    })),

  startRide: () => set({ isRiding: true }),

  stopRide: () => set({ isRiding: false }),

  updateTelemetry: (speed, deltaDistance) =>
    set((state) => {
      const newMax = Math.max(state.telemetry.maxSpeed, speed);
      return {
        telemetry: {
          currentSpeed: speed,
          maxSpeed: newMax,
          totalDistance: state.telemetry.totalDistance + deltaDistance,
          durationSeconds: state.telemetry.durationSeconds + 1,
        },
      };
    }),

  resetTelemetry: () =>
    set({
      telemetry: {
        currentSpeed: 0,
        maxSpeed: 0,
        totalDistance: 0,
        durationSeconds: 0,
      },
    }),

  setRoomCode: (roomCode, isLeader) => set({ roomCode, isLeader }),

  updateMemberLocation: (id, lat, lng, speed) =>
    set((state) => ({
      members: state.members.map((m) =>
        m.id === id ? { ...m, lat, lng, speed } : m
      ),
    })),

  setMembers: (members) => set({ members }),

  toggleIntercom: () =>
    set((state) => ({
      isIntercomConnected: !state.isIntercomConnected,
    })),

  toggleMute: () =>
    set((state) => ({
      isMuted: !state.isMuted,
    })),
}));

// Bilingual Translation Directory
export const TRANSLATIONS = {
  en: {
    welcome: "Welcome to RideEcho v2.0",
    introSub: "Advanced Group Tracking & Motorcycle Intercom",
    phoneInput: "Phone Number",
    phonePlaceholder: "+92 300 1234567 or +1...",
    sendOtp: "Send Verification Code",
    verifyOtp: "Verify OTP Code",
    enterOtp: "Enter 6-Digit OTP",
    profileTitle: "Emergency Profile",
    bloodGroup: "Blood Group",
    bloodPlaceholder: "e.g. O+ or AB-",
    emergencyContact: "Emergency Contacts",
    addContact: "Add Contact Phone",
    premiumTitle: "RideEcho Premium Pro",
    premiumSub: "Unlock unlimited HUD, Weather AI & Pit-Stop Planner",
    pkrPrice: "Rs. 1,000 / Month",
    usdPrice: "$4.99 / Month",
    annualPkrPrice: "Rs. 8,000 / Year",
    annualUsdPrice: "$39.99 / Year",
    subscribe: "Unlock Pro Tier Access",
    startTrial: "Start 60-Minute Trial",
    dashboardTitle: "Rider Hub",
    createGroup: "Create Room",
    joinGroup: "Join Room",
    activeRide: "Active Ride Running",
    hudMode: "HUD mode",
    endRide: "End Ride Session",
    statsTitle: "Ride Telemetry Summary",
    distance: "Distance",
    duration: "Duration",
    maxSpeed: "Peak Speed",
    avgSpeed: "Current Speed",
    backHome: "Go to Dashboard",
    leaderboard: "Ride Badges",
    voxMode: "Hands-Free intercom active",
    sosTrigger: "SOS WARNING ACTIVE",
    groupLeaderText: "👑 Room Owner control active"
  },
  ur: {
    welcome: "رائڈ ایکو v2.0 میں خوش آمدید",
    introSub: "ایڈوانسڈ گروپ ٹریکنگ اور موٹرسائیکل انٹرکام",
    phoneInput: "فون نمبر",
    phonePlaceholder: "+92 300 1234567 یا +1...",
    sendOtp: "تصدیقی کوڈ بھیجیں",
    verifyOtp: "او ٹی پی کوڈ کی تصدیق کریں",
    enterOtp: "6 ہندسوں کا کوڈ درج کریں",
    profileTitle: "ہنگامی پروفائل",
    bloodGroup: "بلڈ گروپ",
    bloodPlaceholder: "مثلاً O+ یا AB-",
    emergencyContact: "ہنگامی رابطے",
    addContact: "فون نمبر شامل کریں",
    premiumTitle: "رائڈ ایکو پریمیم پرو",
    premiumSub: "لا محدود HUD، ویدر AI اور فیول اسٹاپس حاصل کریں",
    pkrPrice: "روپے 1,000 / ماہانہ",
    usdPrice: "ڈالر 4.99 / ماہانہ",
    annualPkrPrice: "روپے 8,000 / سالانہ",
    annualUsdPrice: "ڈالر 39.99 / سالانہ",
    subscribe: "پرو پیکیج حاصل کریں",
    startTrial: "60 منٹ کا ٹرائل شروع کریں",
    dashboardTitle: "رائڈر ہب",
    createGroup: "روم بنائیں",
    joinGroup: "روم میں شامل ہوں",
    activeRide: "رائڈ جاری ہے",
    hudMode: "HUD اسکرین",
    endRide: "رائڈ ختم کریں",
    statsTitle: "رائڈ رپورٹ",
    distance: "فاصلہ",
    duration: "وقت",
    maxSpeed: "زیادہ سے زیادہ رفتار",
    avgSpeed: "موجودہ رفتار",
    backHome: "ڈیش بورڈ پر جائیں",
    leaderboard: "حاصل کردہ بیجز",
    voxMode: "ہینڈز فری انٹرکام فعال ہے",
    sosTrigger: "ایس او ایس وارننگ فعال ہے",
    groupLeaderText: "👑 روم لیڈر کنٹرول فعال ہے"
  }
};
