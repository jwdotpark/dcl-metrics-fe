import {
  Box,
  Button,
  Radio,
  RadioGroup,
  VStack,
  HStack,
  Progress,
  Flex,
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
      <Box mb="4">{inquiry.question}</Box>
      <RadioGroup
        onChange={handleChange}
        value={formData[`step${step}`]?.answer || ""}
      >
        <Flex direction="column" gap="4" ml="2">
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

  const handleStartSurvey = () => {
    setStartTime(Date.now())
    nextStep()
  }

  const handleSubmit = () => {
    alert(JSON.stringify(formData, null, 2))
    localStorage.removeItem("surveyStep")
    localStorage.removeItem("surveyFormData")
  }

  const progress = (step / (inquiries.length + 1)) * 100

  return (
    <Box p={4} borderWidth={1} borderRadius="lg">
      <Progress mb={4} value={progress} />
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
        <HStack mt={4} spacing={4}>
          {step > 1 && <Button onClick={prevStep}>Previous</Button>}
          {step < inquiries.length && <Button onClick={nextStep}>Next</Button>}
          {step === inquiries.length && (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </HStack>
      )}
    </Box>
  )
}
