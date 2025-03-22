export interface I_MENU_ITEMS {
  name: string
  author: boolean
}

export enum MENU_ITEMS {
  REPORTAR = 'REPORTAR',
  ELIMINAR = 'ELIMINAR',
  ACTUALIZAR = 'ACTUALIZAR',
  CANCELAR = 'CANCELAR',
}

export const MENU_ITEMS_CARD: I_MENU_ITEMS[] = [
  {
    name: MENU_ITEMS.REPORTAR,
    author: false,
  },
  {
    name: MENU_ITEMS.ELIMINAR,
    author: true,
  },
  {
    name: MENU_ITEMS.ACTUALIZAR,
    author: true,
  },
  {
    name: MENU_ITEMS.CANCELAR,
    author: false,
  },
]
