import { MobileApp } from 'app/data';
import { createContext } from 'react';

const SelectedMobile = createContext<MobileApp | null>(null);

export default SelectedMobile;
