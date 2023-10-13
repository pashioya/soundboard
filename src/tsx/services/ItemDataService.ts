import {Item} from '../../model/Item'
import axios from 'axios'

export const createItem = (item: Omit<Item, 'id'>) => {
    return axios.post('/items', item)
}

export const getItemsByBoardId = async (id: string) => {
    const board = await axios.get<Item[]>(`/soundboards/${id}/items`)
    return board.data
}

export const deleteItem = (id: number) => {
    return axios.delete(`/items/${id}`)
}