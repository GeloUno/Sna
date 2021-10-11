import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { IDataEventsServer } from '../models/IDataEventsServer';
import { IDataEvents } from '../models/IDataEvents';
import { ThrowStatement } from 'typescript';
import { IErrorServer } from '../models/IErrorServer';

export async function getAllEvents(): Promise<Array<IDataEvents> | IErrorServer | null> {

    const maxage = 5 * 60;

    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json",
            // "Cache-Control": `max-age=${maxage}`,
            "Authorization": `Token ${process.env.REACT_APP_TOKEN}`
        },
    }

    try {
        const dataServer: IDataEventsServer = await axios.get(`${process.env.REACT_APP_URL}?format=json`, config)

        return dataServer.data.results

    } catch (error) {


        if (axios.isAxiosError(error)) {
            const dataError: IErrorServer = {
                message: error.response?.data?.detail,
                status: error.response?.status
            }
            throw dataError
        }
        throw null
    }
}


export function isToDayEvent(dateStart: Date, DateEnd: Date) {

    const dateToDay = new Date(Date.now())

    const dateStartTime = dateStart.getTime()
    const dateEndTime = DateEnd.getTime()
    const dateToDayTime = dateToDay.getTime()

    if (dateToDayTime <= dateEndTime && dateToDayTime >= dateStartTime) {
        return true
    } else {
        return false
    }
}


export function filterByToDayDate(events: Array<IDataEvents>): Array<IDataEvents> {

    const dataFilterByDateNowStartOrEnd: Array<IDataEvents> | undefined = events.filter(event => {

        const dataStart: Date = new Date(event.date_start)
        const dataEnd: Date = new Date(event.date_end)

        return isToDayEvent(dataStart, dataEnd)

    })
    return dataFilterByDateNowStartOrEnd
}

export function isEventActive(events: Array<IDataEvents>): Array<IDataEvents> {
    return events.filter(data => { return data.status === "active" })
}



