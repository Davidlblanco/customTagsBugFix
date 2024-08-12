export default function generateBaseUrl(account: string, workspace: string) {
  let host = `${workspace}--${account}`;

  if (!workspace) host = `${account}`;

  return `https://${host}.myvtex.com`;
}