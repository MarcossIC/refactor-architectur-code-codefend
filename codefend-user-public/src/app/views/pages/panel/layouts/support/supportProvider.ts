import { createContext } from 'react';
import { SupportProps } from '../../../../../data';

const SelectedTicket = createContext<SupportProps | null>(null);

export default SelectedTicket;
