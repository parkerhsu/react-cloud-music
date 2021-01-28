export const getCount = (count) => {
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return (Math.floor(count / 1000) / 10) + '万'
  } else {
    return Math.floor(count / 10000000) / 10 + '亿'
  }
}

export function getSongAuthor(ar) {
  return ar.map(a => a.name).join('/')
}

export function throttle(fn, delay) {
  let can = true
  return (...args) => {
    if (can) {
      fn.call(this, ...args)
      can = false
      setTimeout(() => {
        can = true
      }, delay)
    }
  }
}

export function debounce(fn, delay) {
  let timer = null
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, delay)
  }
}