/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  VStack,
  Progress,
  Text,
  useColorModeValue,
  Flex,
  ButtonGroup,
  Spacer,
  Center,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { inquiries } from "./statics"
import { SurveyStep } from "./SurveyStep"

export const SurveyContainer = () => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [startTime, setStartTime] = useState(0)

  useEffect(() => {
    const savedStep = localStorage.getItem("surveyStep")
    const savedFormData = localStorage.getItem("surveyFormData")
    const savedStartTime = localStorage.getItem("surveyStartTime")
    if (savedStep) {
      setStep(parseInt(savedStep, 10))
    }
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData))
    }
    if (savedStartTime) {
      setStartTime(parseInt(savedStartTime, 10))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("surveyStep", step.toString())
    localStorage.setItem("surveyFormData", JSON.stringify(formData))
  }, [step, formData])

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)
  const resetSurvey = () => {
    if (window.confirm("Are you sure you want to reset the survey?")) {
      setStep(0)
      setFormData({})
      setStartTime(0)
      localStorage.removeItem("surveyStep")
      localStorage.removeItem("surveyFormData")
      localStorage.removeItem("surveyStartTime")
    }
  }

  const handleStartSurvey = () => {
    setStartTime(Date.now())
    localStorage.setItem("surveyStartTime", Date.now().toString())
    nextStep()
  }

  const handleSubmit = async () => {
    alert(JSON.stringify(formData, null, 2))
    console.log(formData)
    await handleFormSubmit()
    resetSurvey()
  }

  const progress = (step / (inquiries.length + 1)) * 100

  const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API
  const baseID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID
  const tableName = process.env.NEXT_PUBLIC_AIRTABLE_NAME

  const handleFormSubmit = async () => {
    const fields = inquiries.reduce((acc, inquiries, index) => {
      const step = `step${Number(index) + 1}`
      acc[`${step}`] = formData[step]?.answer
      acc[`${step} rt`] = formData[step]?.responseTime
      return acc
    }, {})

    const data = { fields }

    console.log(data)

    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${baseID}/${tableName}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const responseData = await response.json()
      console.log("Airtable response:", responseData)
      alert("Form submitted successfully!")
      resetSurvey()
    } catch (error) {
      console.error("Error submitting form to Airtable:", error)
      alert("There was an error submitting the form. Please try again.")
    }
  }

  return (
    <Box pos="relative" minH="400px" p={4} borderRadius="lg">
      {step > 0 && (
        <Box pos="relative" mb={4}>
          <Progress
            h="20px"
            // eslint-disable-next-line react-hooks/rules-of-hooks
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
      )}

      {step === 0 && (
        <VStack spacing={4}>
          <Box>
            <Center mb="4">
              <Text fontSize="xl">Welcome to the survey!</Text>
            </Center>
            <Text align="justify" mb="8" mx="4">
              This survey will help us improve the usability of our site. Please
              note that your responses will be recorded, and the time it takes
              to complete the survey will also be tracked. The data collected
              will be used to enhance your experience and improve the site's
              usability. If you have any questions or feedback, please let us
              know by using the message button on the top bar. If you agree to
              participate, please click "Okay" to proceed with the survey.
            </Text>
          </Box>
          <Button onClick={handleStartSurvey}>Okay</Button>
        </VStack>
      )}
      {inquiries.map(
        (inquiry, index) =>
          step === index + 1 && (
            <SurveyStep
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
