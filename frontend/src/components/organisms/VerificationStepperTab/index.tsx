import { Grid } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { OwnerDirectorDetails } from '../../../utils/types'
import { ConfirmDirectorOwner } from '../ConfirmOwnerConfirmDirector'
import { PurposeComponent } from '../../molecules/Purpose'
import { getPurposes } from '../../../apis/library'

export interface VerificationStepperTabProps {
  directors?: OwnerDirectorDetails[]
  owners?: OwnerDirectorDetails[]
  onContinueClick: (
    directorsList: OwnerDirectorDetails[],
    ownersList: OwnerDirectorDetails[],
    reason: string
  ) => void
  onBackClick: () => void
  isComingBack: boolean
}

const newPerson: OwnerDirectorDetails = {
  firstName: '',
  lastName: '',
  dateOfBirth: null,
  countryOfResidence: '',
}

export const VerificationStepperTab = (props: VerificationStepperTabProps) => {
  const { directors, owners, onContinueClick, onBackClick, isComingBack } = props
  const [screenNumber, setScreenNumber] = useState(isComingBack ? 1 : 0)
  const [purposeData,setPurposeData] = useState<{id:string,purposeType:string}[]>()
  const [reason, setReason] = useState('');
  useEffect(()=>{
    const getPurposeData = async () => {
      try {
        const purposes =  await getPurposes();
        if (purposes.length) {
          setPurposeData(purposes);
        }
      } catch (error) {
        console.error(error);
      }
    } 
    getPurposeData();
  },[])
  const handleContinueClick = useCallback((arg:string) => {
    const purpose = purposeData?.find(purpose=>purpose.purposeType === arg);
    setReason(purpose?.id as string);
    setScreenNumber(1)
  }, [reason,purposeData]);
  const handleContinueClickScreen1 = useCallback((directors:OwnerDirectorDetails[],owners:OwnerDirectorDetails[])=>{
    onContinueClick(directors, owners, reason)
  },[screenNumber])
  const handleBackClick = useCallback(() => {
    setScreenNumber(0)
  },[screenNumber])
  return (
    <Grid
      width={'100%'}
      display="flex"
      justifyContent={'center'}
      data-testid="verification-stepper"
      height='821px'
    >
      <Grid width="788px">
        {screenNumber === 0 ? (
          <PurposeComponent
            continueClickHandler={handleContinueClick}
            backClickHandler={onBackClick}
          />
        ) : (
          <ConfirmDirectorOwner
            directors={directors}
            owners={owners}
            onContinueClick={handleContinueClickScreen1}
            onBackClick={handleBackClick}
            screenNo={isComingBack? 1: 0}
          />
        )}
      </Grid>
    </Grid>
  )
}
