import { ref, type Ref } from 'vue'

export function useDialogConfirm() {
  const openConfirm: Ref<boolean> = ref(false)
  const isDelete: Ref<boolean> = ref(false)

  const handleClickConfirm = (status: boolean) => {
    status ? (isDelete.value = true) : (isDelete.value = false)
    openConfirm.value = false
  }

  return {
    openConfirm,
    isDelete,
    handleClickConfirm,
  }
}
