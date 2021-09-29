import { ITickets } from "./ITickets";
import { IEventmedia } from "./IEventsMedia";

export interface IDataEvents {
    event_id: number;
    category: number;
    title: string;
    // title_en: string | null;
    // title_de: string | null;
    // title_es: string | null;
    // title_fr: string | null;
    description: string;
    // description_en: string | null;
    // description_de: string | null;
    // description_es: string | null;
    // description_fr: string | null;
    status: string;
    date_start: string;
    date_end: string;
    tickets: [ITickets] | null;
    eventmedia: Array<IEventmedia> | null;
}
