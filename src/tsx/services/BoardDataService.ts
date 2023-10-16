import axios from 'axios'
import {Board} from '../../model/Board'

export const getBoards = async () => {
    const boards = await axios.get<Board[]>('/soundboards')
    return boards.data
}

export const getBoardById = async (id: string) => {
    const board = await axios.get<Board>(`/soundboards/${id}`)
    return board.data
}

export const deleteBoard = async (id: string) => {
    await axios.delete(`/soundboards/${id}`)
}

