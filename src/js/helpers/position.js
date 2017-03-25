
// For a given (assumed diagonal) line /,
// return the appropriate X co-ord for a given Y on the line
export function getLineXFromY (xmin, ymin, xmax, ymax, py) {
  const xrange = xmax - xmin
  const yrange = ymax - ymin
  const perc = (py - ymin) / yrange
  return xmin + ((1 - perc) * xrange)
}

export function snapToNearest (value, nearest) {
  return Math.floor(value / nearest) * nearest
}
