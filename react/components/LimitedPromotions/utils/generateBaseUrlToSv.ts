export default function generateBaseUrlToSV(
  account: string,
  workspace: string
) {
  let host = `${workspace ?? ''}--${account}`
  const isSVAccount = account === 'siman' || account === 'simanqa'

  if (!isSVAccount) {
    host = account.includes('qa') ? 'hu065--simanqa' : 'hu065--siman'
  } // TODO remover "hu056--"

  return `https://${host}.myvtex.com`
}
