import React, { useState, Fragment } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import RegisterPatient from "../components/Booking/RegisterPatient";
import SelectSchedule from "../components/Booking/SelectSchedule";
import ConfirmationForm from "../components/Booking/ConfirmationForm";

const steps = ["Patient Registration", "Select Schedule", "Confirmation Form"];

export default function Booking() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const initState = {
    fullname: "",
    nik: "",
    norm: "",
    address: "",
    dob: "",
    gender: "",
  };

  const [bookingPatient, setbookingPatient] = useState(initState);

  const isStepOptional = (step) => {
    return step === 3;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <RegisterPatient
            dataPatient={bookingPatient}
            setDataPatient={setbookingPatient}
          />
        );
      case 1:
        return <SelectSchedule />;
      case 2:
        return (
          <ConfirmationForm
            dataPatient={bookingPatient}
            setDataPatient={setbookingPatient}
          />
        );
      default:
        return "Unknown step";
    }
  }

  console.log(bookingPatient, "bookingPatient main");

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Booking Outpatient</h1>
      </div>
      <div className="bg-white py-5 rounded-md px-4">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <Fragment>
            <h1 className="text-lg my-4">
              All steps completed - you&apos;re finished
            </h1>
            <div className="flex">
              <div className="grow"></div>
              <button
                className="bg-maingreen-200 hover:bg-maingreen-100 text-white px-5 rounded-md"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {getStepContent(activeStep)}
            <div className="flex flex-row justify-between mx-8 pt-4">
              <button
                className={`${
                  activeStep === 0
                    ? "bg-gray-100 text-gray-200"
                    : " bg-mainorange-200 text-white hover:bg-mainorange-100"
                }    px-5 rounded-md`}
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </button>
              <div className="flex">
                {isStepOptional(activeStep) && (
                  <button
                    className="bg-maingreen-200 hover:bg-maingreen-100 text-white px-5 mr-2 rounded-md"
                    onClick={handleSkip}
                  >
                    Skip
                  </button>
                )}
                <button
                  className="bg-maingreen-200 hover:bg-maingreen-100 text-white px-5 rounded-md"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
