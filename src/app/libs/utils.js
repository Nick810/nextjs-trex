export function transformProductTitle(title) {
  return title
          .toLowerCase()
          .replaceAll(' ', '-')
          .replaceAll(`'`, '')
          .replaceAll(',', '')
}

export function capitalize(str) {
  return str
          .replaceAll('t-rex-', '')
          .replaceAll('-', ' ')
          .replace(new RegExp("'" , 'g'), '')  // Optionally keep double quotes
          .split(' ')
          .map(item => item.charAt(0).toUpperCase() + item.slice(1, item.length))
          .join(' ')
}

export function capitalizeWords(inputString) {
  return inputString.replace(/\b\w/g, (char) => char.toUpperCase());
}
