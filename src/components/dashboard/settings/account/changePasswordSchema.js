import { object, string, ref } from 'yup'

export const ChangePasswordSchema = object().shape({
  oldPassword: string().required('Obligatorio'),
  newPassword: string().required('Obligatorio').min(8, 'Mínimo 8 caracteres'),
  /* .matches(/^\S*$/, "No se permite el uso de espacios"), */
  repeatPassword: string().when('newPassword', {
    is: val => val && val.length > 0,
    then: string().equals([ref('newPassword')], 'Los campos deben coincidir')
  })
})
