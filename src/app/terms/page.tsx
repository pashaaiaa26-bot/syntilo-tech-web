import React from "react";
import type { Metadata } from "next";
import styles from "./terms.module.css";

export const metadata: Metadata = {
  title: "Terms & Conditions | Syntilo Tech",
  description: "Syntilo Tech Terms and Conditions — the rules, guidelines, and agreements governing the use of our services.",
};

export default function TermsPage() {
  return (
    <main className={styles.legalPage}>
      <div className={styles.legalContainer}>
        <span className={styles.badge}>LEGAL</span>
        <h1 className={styles.title}>Terms &amp; Conditions</h1>
        <p className={styles.lastUpdated}>Last Updated: July 3, 2026</p>
        <div className={styles.divider} />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Agreement to Terms</h2>
          <p className={styles.text}>
            By accessing or using the Syntilo Tech website (<strong>syntilo.tech</strong>) and any
            services provided by Syntilo Tech (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by
            these Terms and Conditions. If you do not agree with any part of these terms, you must
            not use our website or services.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Services</h2>
          <p className={styles.text}>
            Syntilo Tech provides custom software development, AI-powered automation solutions,
            website development, dashboard engineering, and related technology consulting services.
            The specific scope, deliverables, timeline, and pricing for any project are defined in
            a separate project proposal or service agreement between the client and Syntilo Tech.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Client Obligations</h2>
          <p className={styles.text}>As a client engaging our services, you agree to:</p>
          <ul className={styles.list}>
            <li>Provide accurate and complete information when booking a discovery call or submitting any form.</li>
            <li>Supply all necessary project materials, credentials, and content in a timely manner.</li>
            <li>Respond to communications and approve deliverables within agreed-upon timelines.</li>
            <li>Ensure that all materials and content you provide do not infringe on any third-party intellectual property rights.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Intellectual Property</h2>
          <p className={styles.text}>
            Unless explicitly stated otherwise in a separate written agreement:
          </p>
          <ul className={styles.list}>
            <li>All custom source code, designs, and deliverables created by Syntilo Tech for a client project remain the intellectual property of Syntilo Tech until full payment has been received.</li>
            <li>Upon receipt of full payment, the client receives a non-exclusive, perpetual license to use the deliverables for their intended business purposes.</li>
            <li>Syntilo Tech retains the right to use generalized knowledge, techniques, and non-proprietary components developed during the engagement for future projects.</li>
            <li>Syntilo Tech reserves the right to showcase completed projects in its portfolio unless a non-disclosure agreement (NDA) has been signed.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Payment Terms</h2>
          <p className={styles.text}>Payment terms are defined in the individual project proposal. General terms include:</p>
          <ul className={styles.list}>
            <li>A non-refundable deposit may be required before project commencement.</li>
            <li>Milestone-based payments are due upon delivery and approval of each milestone.</li>
            <li>Late payments may incur a service fee of up to 2% per month on the outstanding balance.</li>
            <li>Work may be paused or suspended if payments are overdue by more than 14 days.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Project Timelines</h2>
          <p className={styles.text}>
            Estimated delivery timelines are provided in good faith and may vary depending on project
            complexity, scope changes, and client responsiveness. Syntilo Tech shall not be held liable
            for delays caused by factors outside our reasonable control, including but not limited to
            client delays, third-party service outages, or force majeure events.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Revisions &amp; Modifications</h2>
          <p className={styles.text}>
            Each project includes a defined number of revision rounds as specified in the project
            proposal. Additional revisions or scope changes beyond the agreed-upon terms may incur
            additional fees. Major scope changes require a revised proposal and mutual agreement before
            implementation.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Confidentiality</h2>
          <p className={styles.text}>
            Both parties agree to keep confidential any proprietary information, trade secrets, or
            sensitive business data shared during the course of the engagement. This obligation survives
            the termination of any project or business relationship. Clients requiring additional
            confidentiality protections may request a separate Non-Disclosure Agreement (NDA).
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Limitation of Liability</h2>
          <p className={styles.text}>
            To the fullest extent permitted by applicable law, Syntilo Tech shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, including but not limited
            to loss of profits, data, business opportunities, or goodwill, arising from or related to
            the use of our website or services. Our total liability for any claim shall not exceed the
            total amount paid by the client for the specific project giving rise to the claim.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Warranties &amp; Disclaimers</h2>
          <p className={styles.text}>
            Syntilo Tech provides its website and services on an &quot;as is&quot; and &quot;as available&quot; basis
            without warranties of any kind, either express or implied. While we strive for excellence
            in all deliverables, we do not guarantee that our website will be uninterrupted, error-free,
            or free from harmful components.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Termination</h2>
          <p className={styles.text}>
            Either party may terminate a project engagement with written notice. In the event of
            termination:
          </p>
          <ul className={styles.list}>
            <li>The client is responsible for payment of all work completed up to the termination date.</li>
            <li>Any non-refundable deposits are retained by Syntilo Tech.</li>
            <li>Completed deliverables paid in full will be transferred to the client.</li>
            <li>Access to staging environments or development servers will be revoked upon termination.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>12. Governing Law</h2>
          <p className={styles.text}>
            These Terms and Conditions shall be governed by and construed in accordance with the
            laws of the Islamic Republic of Pakistan. Any disputes arising from or related to these
            terms shall be resolved through good-faith negotiation, or if necessary, through the
            competent courts of Pakistan.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>13. Changes to These Terms</h2>
          <p className={styles.text}>
            We reserve the right to update or modify these Terms and Conditions at any time. Changes
            will be posted on this page with an updated &quot;Last Updated&quot; date. Continued use of our
            website or services after any changes constitutes acceptance of the revised terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>14. Contact Information</h2>
          <p className={styles.text}>
            For any questions regarding these Terms and Conditions, please contact us at:
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
