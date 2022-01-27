/* eslint-disable import/no-nodejs-modules */
const changeInputs = [
  'postalCode',
  'city',
  'street',
  'state',
  'number',
  'email',
  'corporateName',
  'tradeName',
  'neighborhood',
]

const disableInputs = () => {
  changeInputs.map((item) => {
    if (!document || document == null) return

    const $elementInput: any = document.getElementById(item) ?? undefined
    if(!$elementInput) return 

    if(!notDisabledInputs.includes(item)){
      $elementInput.disabled = true
    }


    if($elementInput.tagName == "DIV"){
      $elementInput.classList.add("disabled")
    }
  })
}

const notDisabledInputs = ['email']

export { changeInputs, notDisabledInputs, disableInputs }
