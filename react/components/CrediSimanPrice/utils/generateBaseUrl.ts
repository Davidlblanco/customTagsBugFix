export default function generateBaseUrl(account: string) {
  const isQaEnvironment = account.includes("qa");
  const host = isQaEnvironment ? "simanqa" : "siman";

  return `https://${host}.myvtex.com`;
}