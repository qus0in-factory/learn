import { readFileSync, readdirSync } from 'node:fs'

export function checkKakaoKey(root, key = process.env.VITE_KAKAO_JS_KEY || '') {
  if (!/^[a-f0-9]{32}$/i.test(key)) throw Error('Missing or invalid production Kakao JS key')
  const files = readdirSync(`${root}/assets`, { recursive: true }).filter(file => file.endsWith('.js'))
  const found = files.some(file => {
    const text = readFileSync(`${root}/assets/${file}`, 'utf8')
    return text.includes(JSON.stringify(key)) || text.includes(`'${key}'`)
  })
  if (!found) throw Error('Production bundle does not contain the Kakao JS key')
  console.log('Kakao JS key present in production bundle (32 characters)')
}
