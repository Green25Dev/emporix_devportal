import Vue from 'vue'

Vue.filter('formatDate', (dateString) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  return `${day}.${month}.${date.getFullYear()}`
})

Vue.filter('readingTime', (readingTimeInMilliseconds) => {
  const readingTimeInMinutes = readingTimeInMilliseconds / 60000
  if (readingTimeInMinutes < 1) {
    return '1'
  } else {
    return Math.ceil(readingTimeInMinutes)
  }
})
