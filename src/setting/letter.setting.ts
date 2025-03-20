export function capitalizeLetter(str: string | null | undefined): string {
  if (typeof str === 'string') {
    return str
      .split(' ')
      .map((letter) => letter.charAt(0).toUpperCase() + letter.slice(1))
      .join(' ')
  }
  return ''
}

export function charAtFirstLetter(str: string): string {
  return ''
}
