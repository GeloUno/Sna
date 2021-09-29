import React from 'react'
import { ITickets } from '../../models/ITickets';
import Moment from 'react-moment';
import Button from '@restart/ui/esm/Button';

function Tickets({
    name,
    sell_start,
    sell_end,
    cost
}: ITickets) {
    return (
        <div>
            <h2 className='display-5 p-2'><small className='lead'>Nazwa biletu:</small>{name}</h2>
            <h2 className='display-3  p-2'><small className='lead'>cena:</small>{cost} PLN</h2>
            <p className='lead text-muted'>
                <small className='lead  p-2'> {`start sprzedaży: `}</small>
                <Moment format={'DD/MM/YYYY hh:mm'}>
                    {sell_start}
                </Moment>
            </p>
            <p className='lead text-muted  p-2'>
                <small className='lead'> {` konec sprzedaży: `}</small>
                <Moment format={'DD/MM/YYYY hh:mm'}>
                    {sell_end}
                </Moment>
            </p>
            <Button className='btn btn-primary'>Kup Teraz</Button>
        </div>
    )
}

export default Tickets
