import React, { useEffect, useState } from 'react'
import { filterByToDayDate, getAllEvents, isEventActive } from '../../controller/events';
import { IDataEvents } from '../../models/IDataEvents';
import EventItem from '../eventsItem/eventItem';

function Events() {

    const [eventsData, setEventsData] = useState<Array<IDataEvents> | null>(null)
    const [error, setError] = useState<boolean>(false)



    useEffect(() => {
        getAllEvents().then(data => {
            if (data !== null) {
                const events = filterByToDayDate(data)
                const eventsActive = isEventActive(events)
                setEventsData(eventsActive)
                setError(false)
            } else {
                setError(true)
            }
        }).catch(err => {
            setEventsData(null)
            setError(true)
        }
        )
        return () => {
        }
    }, [])

    if (!error && eventsData === null) {
        return (
            <div>Loading...</div>
        )
    }
    if (error && eventsData == null) {
        return (
            <div>Error... :-(</div>
        )
    }

    return (
        <div>
            {eventsData && eventsData.map(res => {
                return <EventItem
                    key={res.event_id}
                    category={res.category}
                    date_end={res.date_end}
                    date_start={res.date_start}
                    description={res.description}
                    event_id={res.event_id}
                    eventmedia={res.eventmedia}
                    status={res.status}
                    tickets={res.tickets}
                    title={res.title}
                />
            })}
        </div>
    )
}

export default Events
