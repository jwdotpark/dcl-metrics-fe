/* eslint-disable react/no-unescaped-entities */
import { Box } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { ProgressBar } from "./ProgressBar"
import { inquiries } from "./statics"
import { SurveyForm } from "./SurveyForm"
import { SurveyIntro } from "./SurveyIntro"
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
    if (window.confirm("Do you want to reset the survey?")) {
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

  const progress = (step / (inquiries.length + 1)) * 100

  const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API
  const baseID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID
  const tableName = process.env.NEXT_PUBLIC_AIRTABLE_NAME

  const handleSubmit = async () => {
    const fields = inquiries.reduce((acc, inquiries, index) => {
      const step = `step${Number(index) + 1}`
      acc[`${step}`] = formData[step]?.answer
      acc[`${step} rt`] = formData[step]?.responseTime
      return acc
    }, {})

    const data = { fields }

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

      alert("Form submitted successfully!")
      resetSurvey()
    } catch (error) {
      console.error("Error submitting form to Airtable:", error)
      alert("There was an error submitting the form. Please try again.")
    }
  }

  return (
    <Box pos="relative" minH="400px" p={4} borderRadius="lg">
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
      <SurveyForm
        step={step}
        prevStep={prevStep}
        nextStep={nextStep}
        handleSubmit={handleSubmit}
        resetSurvey={resetSurvey}
        formData={formData}
      />
    </Box>
  )
}
