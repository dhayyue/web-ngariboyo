import Swal from 'sweetalert2'

export const showAlert = async ({
  icon = 'success',
  title = '',
  text = '',
  confirmButtonText = 'OK'
} = {}) => {
  return Swal.fire({
    icon,
    title,
    text,
    confirmButtonText,
    confirmButtonColor: '#0d3b66'
  })
}

export const showConfirm = async (title, text = '') => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0d3b66',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, lanjutkan',
    cancelButtonText: 'Batal'
  })

  return result.isConfirmed
}
