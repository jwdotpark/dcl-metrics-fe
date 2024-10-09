import {
  Box,
  Button,
  Radio,
  RadioGroup,
  VStack,
  Progress,
  Text,
  useColorModeValue,
  Flex,
  ButtonGroup,
  Spacer,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { inquiries } from "./statics"

const Step = ({
  inquiry,
  formData,
  setFormData,
  step,
  startTime,
  setStartTime,
}) => {
  useEffect(() => {
    setStartTime(Date.now())
  }, [step, setStartTime])

  const handleChange = (value) => {
    const endTime = Date.now()
    const responseTime = endTime - startTime
    setFormData({
      ...formData,
      [`step${step}`]: { answer: value, responseTime },
    })
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

export const SurveyContainer = () => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [startTime, setStartTime] = useState(0)

  useEffect(() => {
    const savedStep = localStorage.getItem("surveyStep")
    const savedFormData = localStorage.getItem("surveyFormData")
    if (savedStep) {
      setStep(parseInt(savedStep, 10))
    }
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("surveyStep", step.toString())
    localStorage.setItem("surveyFormData", JSON.stringify(formData))
  }, [step, formData])

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)
  const resetSurvey = () => {
    setStep(0)
    setFormData({})
    localStorage.removeItem("surveyStep")
    localStorage.removeItem("surveyFormData")
  }

  const handleStartSurvey = () => {
    setStartTime(Date.now())
    nextStep()
  }

  const handleSubmit = () => {
    alert(JSON.stringify(formData, null, 2))
    resetSurvey()
  }

  const progress = (step / (inquiries.length + 1)) * 100

  return (
    <Box pos="relative" minH="400px" p={4} borderWidth={1} borderRadius="lg">
      <Box pos="relative" mb={4}>
        <Progress
          h="20px"
          bg={useColorModeValue("gray.300", "gray.600")}
          borderRadius="md"
          value={progress}
        />
        <Text
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          whiteSpace="nowrap"
        >
          {step} / {inquiries.length}
        </Text>
      </Box>
      {step === 0 && (
        <VStack spacing={4}>
          <Box>Welcome to the survey. Click Okay to start.</Box>
          <Button onClick={handleStartSurvey}>Okay</Button>
        </VStack>
      )}
      {inquiries.map(
        (inquiry, index) =>
          step === index + 1 && (
            <Step
              key={index}
              inquiry={inquiry}
              formData={formData}
              setFormData={setFormData}
              step={index + 1}
              startTime={startTime}
              setStartTime={setStartTime}
            />
          )
      )}
      {step > 0 && (
        <Box
          pos="absolute"
          bottom="16px"
          left="50%"
          w="100%"
          transform="translateX(-50%)"
        >
          <Flex px="4">
            <Box>
              <ButtonGroup isAttached>
                {step > 1 && (
                  <Button onClick={prevStep} variant="outline">
                    Previous
                  </Button>
                )}
                {step < inquiries.length && (
                  <Button
                    colorScheme="green"
                    disabled={!formData[`step${step}`]?.answer}
                    onClick={nextStep}
                  >
                    Next
                  </Button>
                )}
              </ButtonGroup>
            </Box>
            <Spacer />
            <Box>
              {step === inquiries.length && (
                <Button mx="4" colorScheme="green" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
              <Button
                colorScheme="yellow"
                onClick={resetSurvey}
                variant="outline"
              >
                Reset
              </Button>
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  )
}
