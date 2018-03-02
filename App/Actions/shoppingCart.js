import * as types from './types'

export function incrementItem(item) {
  return {
    type: types.INCREMENT_ITEM,
    item,
  }
}
