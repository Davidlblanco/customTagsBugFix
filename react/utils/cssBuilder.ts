type item = [string, any] | [string]

export default function cssBuilder (...list:item[] ) {
  if (!list) return ''

  let resp = ''
  for (const item of list) {
    const className = item[0]
    const isActive = item.length > 1 ? item[1] : true

    if (isActive) {
      resp += className + ' '
    }
  }
  return resp
}
