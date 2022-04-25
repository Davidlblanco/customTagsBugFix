import { useFormikContext } from 'formik'
import React from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import styles from './Steps.css'
import { FormFields } from '../B2bForm'
import { LeftColumn } from '../sections/LeftColumn'
import { RightColumn } from '../sections/RightColumn'
import { disableInputs } from '../../../utils/B2BFormVariables'
import isCnpjValid from '../../../utils/isCnpjValid'

export default function FormStep() {
  const { handleSubmit, isSubmitting, values } = useFormikContext<FormFields>()

  const validateCnpj = () =>{
    if(!isCnpjValid(values["corporateDocument"].replace(/ |\.|\\-/g, ''))){
      disableInputs()
    }
  }

  validateCnpj()

  return (
    <>
      <div className={styles.heading}>
        <ExtensionPoint id="form-heading" />
      </div>
      <h2 className={styles.title}>FAÇA PARTE</h2>
      <p className={styles.subtitle}>
        Para ser um Revendedor Santa Helena, cadastre-se no formulário abaixo.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formFields}>
          <div className={styles.formFieldsWrapper}>
            <LeftColumn />
            <RightColumn />
          </div>
        </div>
        <div className={styles.submitBtnWrapper}>
          <button
            className={styles.submitBtn}
            type="submit"
            disabled={isSubmitting}
          >
            CADASTRE-SE
          </button>
        </div>
      </form>
    </>
  )
}
