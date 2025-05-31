import React, { useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Progress } from './progress';

/**
 * Props for a single step in the multi-step form.
 */
export interface MultiStepFormStep {
  id: string;
  title: string;
  content: ReactNode; // The content of the step (e.g., a form section)
  schema?: any; // TODO: Add Zod or similar schema for validation
}

/**
 * Multi-step form wizard with progress indicator.
 * @param {object} props
 * @param {MultiStepFormStep[]} props.steps - Array of form steps.
 * @param {(data: any) => void} props.onSubmit - Callback function on form submission.
 * @param {string} [props.className] - Additional class names.
 */
export interface MultiStepFormProps {
  steps: MultiStepFormStep[];
  onSubmit: (data: any) => void; // TODO: Define precise data type based on step schemas
  className?: string;
}

export function MultiStepForm({
  steps,
  onSubmit,
  className,
}: MultiStepFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // TODO: Add state for form data across all steps
  // TODO: Add state for validation errors

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    // TODO: Perform validation for the current step
    // if (validationFails) return;
    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // TODO: Collect data from all steps and call onSubmit
      onSubmit({}); // Placeholder
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className={cn('space-y-6', className)}>
      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Step {currentStepIndex + 1} of {steps.length}</span>
          <span>{currentStep.title}</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Current Step Content */}
      <div className="border rounded-md p-6 bg-card">
        {currentStep.content}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {!isFirstStep && (
          <Button variant="outline" onClick={handleBack} type="button">
            Back
          </Button>
        )}
        <div className="flex-grow"></div> {/* Spacer */}
        <Button onClick={handleNext} type={isLastStep ? "submit" : "button"}>
          {isLastStep ? 'Submit' : 'Next'}
        </Button>
      </div>

      {/* TODO: Dynamic form fields */}
      {/* TODO: Field dependencies and conditional rendering */}
      {/* TODO: Real-time validation with custom rules */}
      {/* TODO: Form auto-save and recovery */}
      {/* TODO: Drag-and-drop field reordering */}
    </div>
  );
}