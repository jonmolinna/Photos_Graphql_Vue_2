export function capitalizeLetter(str: string | null | undefined): string {
  if (typeof str === 'string') {
    return str
      .split(' ')
      .map((letter) => letter.charAt(0).toUpperCase() + letter.slice(1))
      .join(' ')
  }
  return ''
}

export function charAtFirstLetter(str: string | null | undefined): string {
  if (typeof str === 'string') {
    const letter = str.split(' ')
    return letter.length > 1
      ? letter.length > 2
        ? letter
            .map((word) => word.charAt(0).toLocaleUpperCase())
            .join('')
            .substring(0, 2)
        : letter.map((word) => word.charAt(0).toUpperCase()).join('')
      : letter
          .map((word) => word.toUpperCase())
          .join('')
          .substring(0, 2)
  }

  return ''
}
