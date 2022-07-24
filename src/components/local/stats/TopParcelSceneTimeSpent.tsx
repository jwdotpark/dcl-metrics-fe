import { Box, Text } from "@chakra-ui/react"
import GridBox from "../GridBox"
import Loading from "../Loading"

const TopParcelSceneTimeSpentComponent = ({ box, isLoading, setIsLoading }) => {
  return (
    <GridBox box={box}>
      {!isLoading ? (
        <>
          <Box position="absolute" m="2" ml="4">
            <Text fontSize="xl">
              <b>Top Parcels/Scenes Time Spent</b>
            </Text>
          </Box>
        </>
      ) : (
        <Loading />
      )}
    </GridBox>
  )
}

export default TopParcelSceneTimeSpentComponent

// top parcels scene time spent
const data = {
  "-101,127": {
    avg_time_spent: 64737,
    avg_time_spent_afk: 43211,
    unique_visitors: 12473,
    logins: 6235,
    logouts: 7659,
  },
  "-107,133": {
    avg_time_spent: 63747,
    avg_time_spent_afk: 48715,
    unique_visitors: 12279,
    logins: 6882,
    logouts: 8078,
  },
  "-101,129": {
    avg_time_spent: 62823,
    avg_time_spent_afk: 39252,
    unique_visitors: 7665,
    logins: 3453,
    logouts: 4337,
  },
  "-101,128": {
    avg_time_spent: 51874,
    avg_time_spent_afk: 32178,
    unique_visitors: 7702,
    logins: 2658,
    logouts: 3545,
  },
  "-100,127": {
    avg_time_spent: 47319,
    avg_time_spent_afk: 30367,
    unique_visitors: 16268,
    logins: 10419,
    logouts: 5741,
  },
  "-108,133": {
    avg_time_spent: 40945,
    avg_time_spent_afk: 27084,
    unique_visitors: 5978,
    logins: 896,
    logouts: 2635,
  },
  "-100,128": {
    avg_time_spent: 40569,
    avg_time_spent_afk: 27091,
    unique_visitors: 1281,
    logins: 161,
    logouts: 1666,
  },
  "-108,135": {
    avg_time_spent: 40555,
    avg_time_spent_afk: 25964,
    unique_visitors: 2933,
    logins: 747,
    logouts: 1815,
  },
  "-101,126": {
    avg_time_spent: 36507,
    avg_time_spent_afk: 19482,
    unique_visitors: 0,
    logins: 0,
    logouts: 1130,
  },
  "-109,135": {
    avg_time_spent: 19002,
    avg_time_spent_afk: 9825,
    unique_visitors: 2826,
    logins: 732,
    logouts: 243,
  },
  "-109,133": {
    avg_time_spent: 15200,
    avg_time_spent_afk: 7463,
    unique_visitors: 2126,
    logins: 827,
    logouts: 0,
  },
  "-107,135": {
    avg_time_spent: 11006,
    avg_time_spent_afk: 5818,
    unique_visitors: 1697,
    logins: 634,
    logouts: 0,
  },
  "-100,126": {
    avg_time_spent: 7191,
    avg_time_spent_afk: 3616,
    unique_visitors: 0,
    logins: 0,
    logouts: 132,
  },
}
