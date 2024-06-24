import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { useState } from 'react'
import { StyledImageContainer } from './CarouselPictures.styled'
import { useWidth } from '@/hook/useWidth'

interface CarouselPicturesProps {
    pictures: any[]
}

const CarouselPictures = ({ pictures }: CarouselPicturesProps) => {
    const theme = useTheme()
    const { isMobile } = useWidth()
    const [activeStep, setActiveStep] = useState(0)
    const maxSteps = pictures?.length | 0

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleStepChange = (step: number) => {
        setActiveStep(step)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ maxWidth: isMobile ? 200 : 400, flexGrow: 1 }}>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {pictures?.map((step, index) => (
                        <StyledImageContainer key={step.label}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                    component="img"
                                    sx={{
                                        height: isMobile ? 200 : 400,
                                        maxWidth: isMobile ? 200 : 400,
                                        overflow: 'hidden',
                                    }}
                                    src={step.url}
                                    alt={step.id}
                                />
                            ) : null}
                        </StyledImageContainer>
                    ))}
                </SwipeableViews>
            </Box>
            <MobileStepper
                sx={{ gap: 2 }}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        {!isMobile ? 'Siguiente' : ''}
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        {!isMobile ? 'Anterior' : ''}
                    </Button>
                }
            />
        </div>
    )
}

export default CarouselPictures
