import { Box, Steps, useSteps as useChakraSteps } from "@chakra-ui/react"
import * as React from "react"
import { LuCheck } from "react-icons/lu"

interface StepInfoProps {
  title?: React.ReactNode
  description?: React.ReactNode
}

export interface StepsItemProps
  extends Omit<Steps.ItemProps, "title">,
    StepInfoProps {
  completedIcon?: React.ReactNode
  icon?: React.ReactNode
}

export const StepsItem = React.forwardRef<HTMLDivElement, StepsItemProps>(
  function StepsItem(props, ref) {
    const { title, description, completedIcon, icon, ...rest } = props
    return (
      <Steps.Item {...rest} ref={ref}>
        <Steps.Trigger>
          <Steps.Indicator>
            <Steps.Status
              complete={completedIcon || <LuCheck />}
              incomplete={icon || <Steps.Number />}
            />
          </Steps.Indicator>
          <StepInfo title={title} description={description} />
        </Steps.Trigger>
        <Steps.Separator />
      </Steps.Item>
    )
  },
)

const StepInfo = (props: StepInfoProps) => {
  const { title, description } = props

  if (title && description) {
    return (
      <Box>
        <Steps.Title>{title}</Steps.Title>
        <Steps.Description>{description}</Steps.Description>
      </Box>
    )
  }

  return (
    <>
      {title && <Steps.Title>{title}</Steps.Title>}
      {description && (
        <Steps.Description>{description}</Steps.Description>
      )}
    </>
  )
}

interface StepsIndicatorProps {
  completedIcon: React.ReactNode
  icon?: React.ReactNode
}

export const StepsIndicator = React.forwardRef<
  HTMLDivElement,
  StepsIndicatorProps
>(function StepsIndicator(props, ref) {
  const { icon = <Steps.Number />, completedIcon } = props
  return (
    <Steps.Indicator ref={ref}>
      <Steps.Status complete={completedIcon} incomplete={icon} />
    </Steps.Indicator>
  )
})

export const StepsList = Steps.List
export const StepsRoot = Steps.Root
export const StepsContent = Steps.Content
export const StepsCompletedContent = Steps.CompletedContent
export const StepsNextTrigger = Steps.NextTrigger
export const StepsPrevTrigger = Steps.PrevTrigger

export const useSteps = useChakraSteps
