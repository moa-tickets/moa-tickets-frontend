import { createRoot } from 'react-dom/client';
import './app/styles/index.css';
import FrontApplication from './FrontApplication';

createRoot(document.getElementById('root')!).render(<FrontApplication />);
