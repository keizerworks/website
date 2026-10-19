import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "~/components/legal-page";
import { company } from "~/data/company";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using keizerworks.com.",
  alternates: { canonical: "/terms" },
};

// Kept short and plain: the rules for using the website only. Client work
// is covered by its own signed agreement.
const sections: LegalSection[] = [
  {
    title: "About these terms",
    content: (
      <p>
        keizerworks.com is run by <strong>{company.legalName}</strong>,{" "}
        {company.address}. By using the site, you agree to these terms.
      </p>
    ),
  },
  {
    title: "Using the site",
    content: (
      <p>
        Please use the site lawfully. Don't misuse our forms, try to break or
        disrupt the site, or access parts of it you're not meant to.
      </p>
    ),
  },
  {
    title: "Working with us",
    content: (
      <p>
        Booking a call or applying for a role doesn't create a contract, offer,
        or commitment. Any work we do for a client is covered by a separate
        written agreement.
      </p>
    ),
  },
  {
    title: "Our content",
    content: (
      <p>
        The site's content, design, and the Keizer name and logo belong to
        Keizerworks. Client names, logos, and work shown in our case studies
        belong to those clients. Please don't reuse them without permission.
      </p>
    ),
  },
  {
    title: "Other websites",
    content: (
      <p>
        The site links to other websites. We're not responsible for their
        content or how they handle your data.
      </p>
    ),
  },
  {
    title: "No guarantees",
    content: (
      <p>
        The site is provided as it is, for general information. We try to keep
        it accurate and available, but we can't guarantee it always will be, and
        we're not liable for losses that come from using it, to the extent the
        law allows.
      </p>
    ),
  },
  {
    title: "Privacy",
    content: (
      <p>
        How we handle personal data is explained in our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    title: "Changes",
    content: (
      <p>
        We may update these terms from time to time. The date at the top shows
        when they last changed.
      </p>
    ),
  },
  {
    title: "Governing law",
    content: (
      <p>
        These terms are governed by the laws of India, and the courts of Rohtak,
        Haryana have jurisdiction.
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p>
        {company.legalName}
        <br />
        {company.address}
        <br />
        <a href={`mailto:${company.email}`}>{company.email}</a>
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated={company.legalUpdated}
      current="/terms"
      intro={<p>These terms cover your use of keizerworks.com.</p>}
      sections={sections}
    />
  );
}
