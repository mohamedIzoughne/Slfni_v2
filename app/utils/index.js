// Format: DD/MM/YYYY
export const formatDate = (isoString) => {
  const date = new Date(isoString)
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Format: Month Day (e.g., Apr 24)
export const formatDateToLongMonthAndDay = (dateString) => {
  const date = new Date(dateString)
  const options = { month: "short", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

// Format: Xh or Xd (e.g., 3h for less than 24 hours, 2d for 2 days or more)
export const formatRelativeTime = (isoString) => {
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

// Format: Day, Month Day (e.g., Wed, Apr 24)
export const formatDateToDayMonthDay = (dateString) => {
  const date = new Date(dateString)
  const options = { weekday: "short", month: "short", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

// minutes:seconds
export const formatTimeToMinutesSeconds = (time) => {
  const minutes = Math.floor(time / 60)
  const remainingSeconds = time % 60
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`
}
