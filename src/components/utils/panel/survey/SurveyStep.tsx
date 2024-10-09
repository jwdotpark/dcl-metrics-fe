import { Box, Text, Flex, RadioGroup, Radio } from "@chakra-ui/react"
import { useEffect } from "react"

export const SurveyStep = ({
  inquiry,
  formData,
  setFormData,
  step,
  startTime,
  setStartTime,
}) => {
  useEffect(() => {
    const savedStartTime = localStorage.getItem("surveyStartTime")
    if (savedStartTime) {
      setStartTime(parseInt(savedStartTime, 10))
    } else {
      setStartTime(Date.now())
    }
  }, [step, setStartTime])

  const handleChange = (value) => {
    const endTime = Date.now()
    const responseTime = endTime - startTime
    setFormData({
      ...formData,
      [`step${step}`]: { answer: value, responseTime },
    })
    localStorage.setItem("surveyStartTime", endTime.toString())
  }

  return (
    <Flex direction="column">
      <Box>
        <Text fontSize="xl" fontWeight="semibold">
          {inquiry.question}
        </Text>
      </Box>
      <RadioGroup
        onChange={handleChange}
        value={formData[`step${step}`]?.answer || ""}
      >
        <Flex direction="column" gap="4" mt="4" ml="0">
          {inquiry.options.map((option, index) => (
            <Radio key={index} value={option}>
              {option}
            </Radio>
          ))}
        </Flex>
      </RadioGroup>
    </Flex>
  )
}
