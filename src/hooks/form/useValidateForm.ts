export function useValidateForm() {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const required = (v: string) => !!v || 'El campo es obligatorio'
  const email = (v: string) => emailRegex.test(v) || 'Ingrese un email valido'
  const minLength4 = (v: string) => v.length >= 4 || 'Minimo 4 caracteres'
  const maxLength20 = (v: string) => v.length <= 20 || 'Maximo 20 caracteres'

  return {
    required,
    email,
    minLength4,
    maxLength20,
  }
}
