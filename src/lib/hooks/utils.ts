import moment from "moment"

export const convertSeconds = (seconds: number) => {
  // format 'time' like '1d 23h 59m 59s' with leading zero, using moment
  // const seconds = Number(time)
  // var d = Math.floor(seconds / (3600 * 24))
  // var h = Math.floor((seconds % (3600 * 24)) / 3600)
  // var m = Math.floor((seconds % 3600) / 60)
  // var s = Math.floor(seconds % 60)

  // var dDisplay = d > 0 ? d + (d == 1 ? "d" : "d ") : ""
  // var hDisplay = h > 0 ? h + (h == 1 ? "h" : "h ") : ""
  // var mDisplay = m > 0 ? m + (m == 1 ? "m" : "m ") : ""
  // var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s ") : ""
  // const result = dDisplay + hDisplay + mDisplay + sDisplay
  // console.log(result)
  // return result

  // const days = Math.floor(seconds / (3600 * 24))

  const hrs = `0${Math.floor(seconds / 3600)}`.slice(-3)
  const min =
    Math.floor((seconds % 3600) / 60) < 10
      ? `0${Math.floor((seconds % 3600) / 60)}`
      : Math.floor((seconds % 3600) / 60)
  const sec = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60
  return `${hrs}h ${min}m ${sec}s`
}
