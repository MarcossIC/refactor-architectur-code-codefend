import { createContext } from 'react';
import { CloudApp, MobileApp } from '../../../../../data';

const SelectedCloud = createContext<CloudApp | null>(null);

export default SelectedCloud;
