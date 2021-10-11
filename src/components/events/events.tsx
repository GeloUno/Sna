import React, { useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import {
  filterByToDayDate,
  getAllEvents,
  isEventActive,
} from '../../controller/events';
import { IDataEvents } from '../../models/IDataEvents';
import { IErrorServer } from '../../models/IErrorServer';
import EventItem from '../eventsItem/eventItem';

function Events() {
  const [eventsData, setEventsData] = useState<Array<IDataEvents> | null>(null);

  const [error, setError] = useState<boolean>(false);
  const [errorServer, setErrorServer] = useState<IErrorServer | null>(null);

  useEffect(() => {
    getAllEvents()
      .then((data) => {
        if (data !== null && Array.isArray(data)) {
          const events = filterByToDayDate(data);
          const eventsActive = isEventActive(events);
          setEventsData(eventsActive);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        setEventsData(null);
        if (err?.message) {
          setErrorServer({
            message: err.message,
            status: err?.status,
          });
        }
        setError(true);
      });
    return () => {};
  }, []);

  if (!error && eventsData === null) {
    return (
      <div
        style={{ height: '50vh' }}
        className="d-flex justify-content-center align-items-center"
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (error && eventsData == null) {
    return (
      <div
        style={{ height: '50vh' }}
        className="d-flex justify-content-center align-items-center"
      >
        <Alert variant="danger">
          <Alert.Heading>
            {errorServer?.status && `${errorServer.status} | `} Ups..
          </Alert.Heading>
          <p>
            {errorServer?.message
              ? `${errorServer.message}`
              : `Coś poszło nie tak zapraszamy później`}
          </p>
        </Alert>
      </div>
    );
  }
  if (eventsData && eventsData.length === 0) {
    return (
      <div
        style={{ height: '50vh' }}
        className="d-flex justify-content-center align-items-center"
      >
        <Alert variant="warning">
          <Alert.Heading>Ups..</Alert.Heading>
          <p>Dzisiaj brak jakichkolwiek wydarzeń zostajesz w domu :-)</p>
        </Alert>
      </div>
    );
  }

  return (
    <div>
      {eventsData &&
        eventsData.map((res) => {
          return (
            <EventItem
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
          );
        })}
    </div>
  );
}

export default Events;
