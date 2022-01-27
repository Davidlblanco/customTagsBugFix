import React from 'react'
import { M3Field } from '../Fields/M3Field'
import { M3StateField } from '../Fields/M3StateField'

import styles from './SectionFormStyles.css'

export const RightColumn: StorefrontFunctionComponent = () => {
  return (
    <section className={styles.sectionWrapper}>
      <M3Field name="lastName" label="Sobrenome" />
      <M3Field name="homePhone" label="Celular" />
      <div className={styles.checkboxWrapper}>
        <M3Field name="stateRegistration" label="Inscrição Estadual" />
        <M3Field
          name="taxSituation"
          type="checkbox"
          value="Isento"
          label="Isento"
        />
      </div>
      <M3Field name="tradeName" label="Nome Fantasia" />
      <M3Field name="neighborhood" label="Bairro" />
      <M3Field name="number" label="Número" />
      <M3StateField name="state" label="Estado" />
    </section>
  )
}
