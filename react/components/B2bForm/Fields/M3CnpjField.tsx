import { useFormikContext } from 'formik'
import React, { useEffect} from 'react'
import InputMask from 'react-input-mask'
import styles from './M3Field.css'
import { FormFields } from '../B2bForm'
import { FieldProps } from './M3Field'
import axios from 'axios'
import isCnpjValid from '../../../utils/isCnpjValid'
import { changeInputs, disableInputs } from '../../../utils/B2BFormVariables'

export const M3CnpjField: StorefrontFunctionComponent<FieldProps> = ({
  type,
  name,
  label,
}: FieldProps) => {
  const {
    values,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setErrors,
    errors,
  } = useFormikContext<FormFields>()

  const cnpjValue = values[name].replace(/ |\.|\\-/g, '') 

  useEffect(() => {
    const setInputValues = (data: any) => {
      disableInputs()
      changeInputs.map((item) => {
        setFieldValue(item, data[item])
        if(data[item] === "" || !data[item] || data[item] === null){
          const $elementInput: any = document.getElementById(item) ?? undefined
          if(!$elementInput) return 
  
          $elementInput.disabled = false
  
          if($elementInput.tagName == "DIV"){
            $elementInput.classList.remove("disabled")
          }
        }
      })
    }

    const removeInputBlocked = () =>{
      changeInputs.map((item) => {

        if (!document || document == null) return

        const $elementInput: any = document.getElementById(item) ?? undefined
        if(!$elementInput) return 

        $elementInput.disabled = false

        if($elementInput.tagName == "DIV"){
          $elementInput.classList.remove("disabled")
        }
      })
    }

    const cnpjData = async () => {
      let res = null
      if (
        cnpjValue == undefined ||
        cnpjValue == null ||
        cnpjValue == ''
      )
        return res

      if (
        isCnpjValid(cnpjValue)
      ) {
        
        const cnpj = cnpjValue.replace(/[^0-9]/g, '')

        try {
          res = await axios.get(`/v1/register/getCnpj/${cnpj}`)
        } catch (error) {
          setErrors({corporateDocument: "CNPJ não encontrado."})
          return 
        }

        if (!res.data) return

        setInputValues(res.data)
        
      }else{
        removeInputBlocked()
      }

      return res
    }

    cnpjData()
  }, [cnpjValue, setErrors, setFieldValue])

  return (
    <div
      className={`${styles.fieldGroup} ${errors[name] &&
        touched[name] &&
        styles.fieldGroupError}`}
      id={name}
    >
      <label htmlFor={name} className={styles.fieldLabel}>
        {label}
      </label>
      <InputMask
        mask="99.999.999/9999-99"
        type={type ? type : 'text'}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        className={styles.fieldInput}
      />
      <span className={styles.error}>
        {' '}
        {errors[name] && touched[name] && errors[name]}{' '}
      </span>
    </div>
  )
}
