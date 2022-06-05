function addLineFormatting(html, focus) {
  function getHighlightedLines(focus) {
    if (focus.length === 0) {
      return
    }
    return focus.split(',').reduce((acc, cur) => {
      const range = cur.split('-')
      if (range.length === 1) {
        acc.push(parseInt(cur))
      } else {
        for (let i = parseInt(range[0]); i <= parseInt(range[1]); i++) {
          acc.push(i)
        }
      }
      return acc
    }, [])
  }
  const highlightedLines = getHighlightedLines(focus)
  const lines = html.split('\n').map((line, index) => {
    const i = index + 1
    const classes = `__line${highlightedLines.indexOf(i) > -1 ? ' __highlighted' : ''}`
    return `<div class="${classes}"><span class="__line-number">${i}</span>${line}</div>`
  })
  return lines.join('')
}

export default addLineFormatting
