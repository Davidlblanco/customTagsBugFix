import React, { useState } from 'react'
import { Formik, FormikHelpers } from 'formik'

import styles from './B2bForm.css'
import { registerSchema } from './B2bFormRegisterSchema'
import saveData from './B2bFormSaveData'
import FormStep from './steps/FormStep'
import SuccessStep from './steps/SuccessStep'
import ErrorStep from './steps/ErrorStep'

export interface FormFields {
  corporateName: string
  stateRegistration: string
  tradeName: string
  corporateDocument: string
  homePhone: string
  firstName: string
  lastName: string
  postalCode: string
  email: string
  city: string
  street: string
  number: string
  neighborhood: string
  state: string
  taxSituation: string
}

const initialValues: FormFields = {
  corporateName: '',
  stateRegistration: '',
  tradeName: '',
  corporateDocument: '',
  homePhone: '',
  firstName: '',
  lastName: '',
  postalCode: '',
  email: '',
  city: '',
  street: '',
  number: '',
  neighborhood: '',
  state: 'Estado',
  taxSituation: '',
}

export const B2bForm: StorefrontFunctionComponent = () => {
  const [step, setStep] = useState<'form' | 'success' | 'error'>('form')

  const onSubmit = async (
    values: FormFields,
    { setSubmitting }: FormikHelpers<FormFields>
  ) => {
    try {
      await saveData(values)
      setSubmitting(false)
      setStep('success')
    } catch (error) {
      setSubmitting(false)
      setStep('error')
    }
  }

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <>
            {step === 'form' && <FormStep />}
            {step === 'success' && <SuccessStep />}
            {step === 'error' && <ErrorStep />}
          </>
        )}
      </Formik>
    </div>
  )
}
