export default function generateBaseUrlToSV(
    account: string,
    workspace: string
) {
    let host = `${workspace ?? ''}--${account}`
    const isSVAccount = account === 'siman' || account === 'simanqa'

    if (!isSVAccount) {
        host = account.includes('qa') ? 'hu126--simanqa' : 'hu126--siman'
    } // TODO remover "hu126--"

    return `https://${host}.myvtex.com`
}