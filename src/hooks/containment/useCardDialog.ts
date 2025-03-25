import { MENU_ITEMS } from '@/setting/post-card.data'
import { ref, type Ref } from 'vue'

export function useCardDialog() {
  const openMenu: Ref<boolean> = ref(false)
  const openConfirm: Ref<boolean> = ref(false)
  const isDelete: Ref<boolean> = ref(false)
  const isUpdate: Ref<boolean> = ref(false)

  const handleClickItems = (item: string) => {
    switch (item) {
      case MENU_ITEMS.CANCELAR: {
        openMenu.value = false
        break
      }
      case MENU_ITEMS.REPORTAR: {
        openMenu.value = false
        break
      }
      case MENU_ITEMS.ELIMINAR: {
        openConfirm.value = true
        openMenu.value = false
        break
      }
      case MENU_ITEMS.ACTUALIZAR: {
        isUpdate.value = true
        openMenu.value = false
        break
      }
    }
  }

  const handleClickConfirm = (status: boolean) => {
    status ? (isDelete.value = true) : (isDelete.value = false)
    openConfirm.value = false
  }

  return {
    handleClickItems,
    openMenu,
    openConfirm,
    handleClickConfirm,
    isDelete,
    isUpdate,
  }
}
