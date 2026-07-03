import React from "react";
import type { Metadata } from "next";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Syntilo Tech",
  description: "Syntilo Tech Privacy Policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.legalPage}>
      <div className={styles.legalContainer}>
        <span className={styles.badge}>LEGAL</span>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last Updated: July 3, 2026</p>
        <div className={styles.divider} />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Introduction</h2>
          <p className={styles.text}>
            Welcome to Syntilo Tech (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We are committed to protecting
            your personal information and your right to privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you visit our website
            <strong> syntilo.tech</strong> or engage with our services.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
          <p className={styles.text}>We may collect the following types of information:</p>
          <ul className={styles.list}>
            <li><strong>Personal Information:</strong> Name, company name, email address, phone number, and any other information you voluntarily provide through our discovery call booking form or contact methods.</li>
            <li><strong>Usage Data:</strong> Browser type, operating system, referring URLs, pages viewed, time spent on pages, and other analytical data collected automatically through cookies and similar technologies.</li>
            <li><strong>Device Information:</strong> IP address, device type, screen resolution, and unique device identifiers.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. How We Use Your Information</h2>
          <p className={styles.text}>We use the information we collect for the following purposes:</p>
          <ul className={styles.list}>
            <li>To respond to your inquiries and schedule discovery calls.</li>
            <li>To provide, operate, and maintain our services and website.</li>
            <li>To improve, personalize, and expand our website and offerings.</li>
            <li>To communicate with you about projects, updates, and promotions (with your consent).</li>
            <li>To detect, prevent, and address technical issues or security breaches.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Data Storage &amp; Security</h2>
          <p className={styles.text}>
            Your data is securely stored using industry-standard encryption and access controls through
            our database provider, <strong>Supabase</strong>. We implement appropriate technical and
            organizational measures to protect your personal data against unauthorized access, alteration,
            disclosure, or destruction. However, no method of electronic transmission or storage is 100%
            secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Third-Party Services</h2>
          <p className={styles.text}>We may share your information with the following third-party service providers:</p>
          <ul className={styles.list}>
            <li><strong>Supabase:</strong> Database hosting and backend services.</li>
            <li><strong>Vercel:</strong> Website hosting and deployment.</li>
            <li><strong>Google Analytics:</strong> Website usage analytics (if enabled).</li>
          </ul>
          <p className={styles.text}>
            These third parties are bound by their own privacy policies and are only permitted to use your
            information as necessary to provide their services to us.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Cookies</h2>
          <p className={styles.text}>
            Our website may use cookies and similar tracking technologies to enhance your browsing
            experience. You can control cookie preferences through your browser settings. Disabling
            cookies may affect the functionality of certain features on our website.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Your Rights</h2>
          <p className={styles.text}>Depending on your jurisdiction, you may have the following rights:</p>
          <ul className={styles.list}>
            <li>The right to access the personal information we hold about you.</li>
            <li>The right to request correction of inaccurate or incomplete data.</li>
            <li>The right to request deletion of your personal information.</li>
            <li>The right to withdraw consent at any time.</li>
            <li>The right to lodge a complaint with a data protection authority.</li>
          </ul>
          <p className={styles.text}>
            To exercise any of these rights, please contact us at <strong>hello@syntilotech.com</strong>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Data Retention</h2>
          <p className={styles.text}>
            We retain your personal information only for as long as necessary to fulfill the purposes
            outlined in this policy, unless a longer retention period is required or permitted by law.
            Lead inquiry data is retained for a maximum of 24 months from the date of submission.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Children&apos;s Privacy</h2>
          <p className={styles.text}>
            Our services are not directed to individuals under the age of 18. We do not knowingly collect
            personal information from children. If we become aware that we have collected data from a
            child without parental consent, we will take steps to delete that information promptly.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Changes to This Policy</h2>
          <p className={styles.text}>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page
            with an updated &quot;Last Updated&quot; date. We encourage you to review this policy periodically
            to stay informed about how we protect your information.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Contact Us</h2>
          <p className={styles.text}>
            If you have any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <div className={styles.contactBlock}>
            <p><strong>Syntilo Tech</strong></p>
            <p>Email: hello@syntilotech.com</p>
            <p>Location: Pakistan</p>
            <p>Founded by Sheraz Pasha</p>
          </div>
        </section>
      </div>
    </main>
  );
}
