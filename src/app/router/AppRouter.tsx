import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './HomePage';
import { RoomPage } from './RoomPage';
import { ROUTES } from '@shared/constants';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path="/room/:id" element={<RoomPage />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
};