import { useFormikContext } from 'formik'
import React, { useState } from 'react'
import { states } from '../../../utils/states'
import styles from './M3Field.css'
import { FormFields } from '../B2bForm'
import { FieldProps } from './M3Field'

export const M3StateField: StorefrontFunctionComponent<FieldProps> = ({
  name,
  label,
}: FieldProps) => {
  const [isOpen, setisOpen] = useState(false)

  const {
    values,
    touched,
    handleBlur,
    errors,
    setFieldValue,
  } = useFormikContext<FormFields>()

  const handleClick = () => {
    setisOpen(!isOpen)
  }

  return (
    <div className={styles.fieldGroup} id={name}>
      <label htmlFor={name} className={styles.fieldLabel}>
        {label}
      </label>
      <div
        role="menu"
        onKeyDown={() => {}}
        onClick={() => handleClick()}
        tabIndex={0}
        className={`${styles.fieldGroupDropdown} ${
          isOpen ? styles.fieldGroupDropdownOpen : ''
        }`}
      >
        {values[name]}
        <ul role="menu">
          {states.map((state, index) => {
            return (
              <li
                role="menuitem"
                key={state}
                tabIndex={index}
                onKeyPress={() => {}}
                onClick={() => {
                  handleBlur
                  setFieldValue(`${name}`, state)
                }}
              >
                {state}
              </li>
            )
          })}
        </ul>
      </div>
      <span className={styles.error}>
        {' '}
        {errors[name] && touched[name] && errors[name]}{' '}
      </span>
    </div>
  )
}
