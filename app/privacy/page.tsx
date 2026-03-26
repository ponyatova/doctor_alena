import PrivacyPageClient from "./PrivacyPageClient";

export default async function PrivacyPage() {
  const url = "https://dr-prokhurovskaya.vercel.app";
  const email = "Helenasmu@gmail.com";
  return <PrivacyPageClient url={url} email={email} />;
}
