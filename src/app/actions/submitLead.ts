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

    // Insert payload to Supabase 'leads' table and select the created ID
    const { data: insertedRows, error } = await supabase
      .from("leads")
      .insert([
        {
          name: name.trim(),
          company: company.trim(),
          bottleneck: bottleneck.trim(),
          created_at: new Date().toISOString(),
        },
      ])
      .select("id");

    if (error) {
      console.error("Supabase Database Insert Error:", error);
      return { success: false, error: error.message };
    }

    // Trigger internal automation pipeline (Notion + Slack Sync Webhook)
    const webhookUrl = process.env.AUTOMATION_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const leadId = insertedRows?.[0]?.id || "unknown";
        
        // This POST payload triggers an external automation webhook (e.g. n8n).
        // The webhook is configured to:
        // 1. Sync this lead details to our Notion Sales CRM database.
        // 2. Dispatch a real-time notification alert to our team Slack workspace channel.
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: leadId,
            name: name.trim(),
            company: company.trim(),
            bottleneck: bottleneck.trim(),
            source: "Syntilo Website Intake"
          }),
        });
      } catch (webhookErr) {
        // Silently catch webhook failure to ensure client form submission is not blocked
        console.error("Automation Webhook dispatch failure:", webhookErr);
      }
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
