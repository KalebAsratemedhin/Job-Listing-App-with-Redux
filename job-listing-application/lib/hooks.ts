
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from './store'; // Adjust path as needed

// Typed useDispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch;

// Typed useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
