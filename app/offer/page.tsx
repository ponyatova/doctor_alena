import ClientPageOffer from "./ClientPageOffer";

export default async function OfferPage() {
  const url = "https://dr-prokhurovskaya.vercel.app";
  const email = "Helenasmu@gmail.com";
  return <ClientPageOffer url={url} email={email} />;
}
