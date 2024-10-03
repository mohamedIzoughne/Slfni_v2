export const formatDate = (isoString) => {
  const date = new Date(isoString)
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export const formatDateToLongMonthAndDay = (dateString) => {
  const date = new Date(dateString)
  const options = { month: "short", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

export const formatRelativeTime = (isoString) => {
  console.log(isoString)
  const date = new Date(isoString)
  const now = new Date()
  const diffInMilliseconds = now - date
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60))

  if (diffInHours < 24) {
    return `${diffInHours}h`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d`
  }
}
