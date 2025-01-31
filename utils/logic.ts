export const returnInitials = (str: string): string => {
  if (!str) return ''
  let words = str.trim().split(/\s+/)
  if (words.length === 0) return ''

  words = words.filter((word) => word.length > 0)
  // Get the first word
  const firstWord = words[0]
  let firstInitial = ''
  if (firstWord[0].match(/[\wČŽŠĐčžšđ]/u)) {
    firstInitial = firstWord[0].toUpperCase()
  }

  // If there is more than one word, get the last word
  let lastInitial = ''
  if (words.length > 1) {
    const lastWord = words[words.length - 1]
    if (lastWord[0].match(/[\wČŽŠĐčžšđ]/u)) {
      lastInitial = lastWord[0].toUpperCase()
    }
  }

  return firstInitial + lastInitial
}
