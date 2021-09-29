import React from 'react'
import { Card } from 'react-bootstrap'
import { IDataEvents } from '../../models/IDataEvents';
import parser from 'html-react-parser'
import Moment from 'react-moment'
import Tickets from '../tickets/tickets';
function EventItem({
    title,
    event_id,
    description,
    date_start,
    date_end,
    tickets,
    eventmedia

}: IDataEvents) {
    return (
        <Card>
            {eventmedia && eventmedia.length > 0 && eventmedia[0].file_type && eventmedia[0].file_type === 'image' && eventmedia[0].file && (
                <Card.Img
                    src={`${eventmedia[0].file}`}
                    style={{ objectFit: 'cover', height: '350px', width: 'auto' }}
                />
            )}
            <Card.Body>
                <Card.Title className="my-4 ">
                    <h3 className="display-4 fw-bold">
                        {`${event_id} ${title}`}
                    </h3>
                </Card.Title>
                <Card.Subtitle className='row d-flex justify-content-around p-3 lead text-muted'>
                    <h2 className='col-lg-4'>
                        Start:  <Moment format={'DD/MM/YYYY hh:mm'}>
                            {date_start}
                        </Moment>
                    </h2>

                    <h2 className='col-lg-4'>
                        Koniec:  <Moment format={'DD/MM/YYYY hh:mm'}>
                            {date_end}
                        </Moment>
                    </h2>
                </Card.Subtitle>
                <div className='p-lg-4'>
                    {parser(description)}
                </div>
                {tickets && tickets.map(tic => {
                    return <Tickets
                        key={tic.cost + tic.name}
                        cost={tic.cost}
                        name={tic.name}
                        sell_start={tic.sell_start}
                        sell_end={tic.sell_end}
                    />
                })}
                <Card.Text className='p-lg-5'>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default EventItem
