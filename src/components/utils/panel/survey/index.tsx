import {
  useColorModeValue,
  Box,
  Button,
  Flex,
  ButtonGroup,
  Spacer,
  useToast,
  Spinner,
} from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"
import {
  ATapiKey,
  ATbaseID,
  ATnewTableName,
} from "../../../../lib/data/constant"
import { ProgressBar } from "./ProgressBar"
import { inquiries } from "./statics"
import { SurveyConfirm } from "./SurveyConfirm"
import { SurveyIntro } from "./SurveyIntro"
import { SurveyReset } from "./SurveyReset"
import { SurveyStep } from "./SurveyStep"

const SurveyContainer = () => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [startTime, setStartTime] = useState(0)
  const [isResetOpen, setIsResetOpen] = useState(false)
  const [isSubmitOpen, setIsSubmitOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const onCloseReset = () => setIsResetOpen(false)
  const onCloseSubmit = () => setIsSubmitOpen(false)
  const cancelRef = useRef()
  const toast = useToast()

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
    setStep(0)
    setFormData({})
    setStartTime(0)
    localStorage.removeItem("surveyStep")
    localStorage.removeItem("surveyFormData")
    localStorage.removeItem("surveyStartTime")
    onCloseReset()
    onCloseSubmit()
  }

  const handleStartSurvey = () => {
    setStartTime(Date.now())
    localStorage.setItem("surveyStartTime", Date.now().toString())
    nextStep()
  }

  const progress = (step / (inquiries.length + 1)) * 100

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const fields = inquiries.reduce((acc, inquiry, index) => {
      const step = `step${Number(index) + 1}`
      const answer = formData[step]?.answer
      const correct = inquiry.answer === answer ? "correct" : "incorrect"
      acc[`${step}`] = answer
      acc[`${step} rt`] = formData[step]?.responseTime
      acc[`${step} answer`] = correct
      return acc
    }, {})

    const data = { fields }

    console.log("form data", data)

    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${ATbaseID}/${ATnewTableName}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${ATapiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      setIsSubmitting(false)
      setIsSubmitOpen(true)
    } catch (error) {
      console.error("Error submitting form to Airtable:", error)
      setIsSubmitting(false)
      toast({
        title: "There was an error submitting the form. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex
      direction="column"
      w="100%"
      h="100%"
      p="4"
      bg={useColorModeValue("gray.200", "gray.600")}
    >
      <Box h="370px">
        <Box pos="relative" h="100%" mb="4">
          <ProgressBar step={step} progress={progress} />
          <SurveyIntro step={step} handleStartSurvey={handleStartSurvey} />
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
        </Box>
        <Spacer />
        <Box>
          {step > 0 && (
            <Box mt="4">
              <Flex>
                <Box>
                  <ButtonGroup shadow="md" isAttached size="sm">
                    {step > 1 && (
                      <Button
                        colorScheme="yellow"
                        onClick={prevStep}
                        variant="outline"
                      >
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
                    <Button
                      mx="4"
                      colorScheme="green"
                      disabled={
                        !formData[`step${step}`]?.answer || isSubmitting
                      }
                      onClick={handleSubmit}
                      size="sm"
                    >
                      {isSubmitting ? <Spinner size="sm" /> : "Submit"}
                    </Button>
                  )}
                  <Button
                    shadow="md"
                    colorScheme="orange"
                    onClick={() => setIsResetOpen(true)}
                    size="sm"
                    variant="solid"
                  >
                    Reset
                  </Button>
                </Box>
              </Flex>
            </Box>
          )}
          <SurveyReset
            isResetOpen={isResetOpen}
            cancelRef={cancelRef}
            onCloseReset={onCloseReset}
            resetSurvey={resetSurvey}
          />
          <SurveyConfirm
            isSubmitOpen={isSubmitOpen}
            cancelRef={cancelRef}
            onCloseSubmit={onCloseSubmit}
            resetSurvey={resetSurvey}
          />
        </Box>
      </Box>
    </Flex>
  )
}

export default SurveyContainer
