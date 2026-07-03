"use server";

import { supabase } from "@/lib/supabase";

export interface LeadSubmission {
  name: string;
  company: string;
  bottleneck: string;
}

export async function submitLead(data: LeadSubmission) {
  try {
    const { name, company, bottleneck } = data;

    // Strict input validation
    if (!name || !name.trim()) {
      return { success: false, error: "Name is required." };
    }
    if (!company || !company.trim()) {
      return { success: false, error: "Company name is required." };
    }
    if (!bottleneck || !bottleneck.trim()) {
      return { success: false, error: "Primary bottleneck selection is required." };
    }

    // Insert payload to Supabase 'leads' table
    const { error } = await supabase.from("leads").insert([
      {
        name: name.trim(),
        company: company.trim(),
        bottleneck: bottleneck.trim(),
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Supabase Database Insert Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Server Action Exception Caught:", err);
    return {
      success: false,
      error: err?.message || "An internal server error occurred while processing lead.",
    };
  }
}
