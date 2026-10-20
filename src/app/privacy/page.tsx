import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "~/components/legal-page";
import { company } from "~/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Keizerworks LLP collects and uses personal data on keizerworks.com.",
  alternates: { canonical: "/privacy" },
};

// Kept short and plain. Update it whenever a form or tool on the site
// changes what data we collect.
const sections: LegalSection[] = [
  {
    title: "Who we are",
    content: (
      <p>
        keizerworks.com is run by <strong>{company.legalName}</strong>,{" "}
        {company.address}. Questions about this policy go to{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
    ),
  },
  {
    title: "What we collect",
    content: (
      <ul>
        <li>
          <strong>Calls you book.</strong> Our booking calendar (Cal.com)
          collects your name, email, and any notes you add, so we can hold the
          call.
        </li>
        <li>
          <strong>Emails you send us.</strong> Your email address and what you
          write, so we can reply.
        </li>
        <li>
          <strong>Newsletter.</strong> Your email address, to send you our
          updates.
        </li>
        <li>
          <strong>Job and internship applications.</strong> The details and
          files you send with your application, so we can review it.
        </li>
        <li>
          <strong>Site usage.</strong> Basic technical data such as your IP
          address, browser, device, and the pages you visit, to keep the site
          working and understand how it's used.
        </li>
      </ul>
    ),
  },
  {
    title: "Cookies and analytics",
    content: (
      <p>
        We use Google Analytics to understand how the site is used, and
        Apollo.io to understand which companies visit it. Cal.com runs our
        booking calendar. These services may set their own cookies. You can
        block or delete cookies in your browser settings.
      </p>
    ),
  },
  {
    title: "Who we share it with",
    content: (
      <>
        <p>
          <strong>We don't sell your personal data.</strong> We share it only
          with the services that help us run the site and our work, or when the
          law requires it. Some of them may process data outside India.
        </p>
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>What it's used for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Google</td>
              <td>Email and website analytics</td>
            </tr>
            <tr>
              <td>Apollo.io</td>
              <td>Understanding which companies visit the site</td>
            </tr>
            <tr>
              <td>Cal.com</td>
              <td>Booking calls</td>
            </tr>
            <tr>
              <td>Supabase</td>
              <td>Storing job and internship applications</td>
            </tr>
            <tr>
              <td>Amazon Web Services</td>
              <td>Hosting the website</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    title: "How long we keep it",
    content: (
      <p>
        We keep personal data only as long as we need it for the reason you gave
        it to us, or as the law requires.
      </p>
    ),
  },
  {
    title: "Your choices",
    content: (
      <p>
        You can ask us to see, correct, or delete the personal data we hold
        about you, or to stop sending you the newsletter, by emailing{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
    ),
  },
  {
    title: "Children",
    content: (
      <p>
        This site is meant for businesses and adults. We don't knowingly collect
        personal data from children.
      </p>
    ),
  },
  {
    title: "Changes",
    content: (
      <p>
        We may update this policy from time to time. The date at the top shows
        when it last changed.
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <>
        <p>
          {company.legalName}
          <br />
          {company.address}
          <br />
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
        <p>
          See also our <Link href="/terms">Terms of Service</Link>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated={company.legalUpdated}
      current="/privacy"
      intro={
        <p>
          This policy explains what personal data {company.legalName} collects
          through keizerworks.com and how we use it.
        </p>
      }
      sections={sections}
    />
  );
}
