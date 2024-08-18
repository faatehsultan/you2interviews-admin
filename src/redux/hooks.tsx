import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';
import { selectCache, setCache } from './slices/cache.slice';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useCache = (key: string, defaultValue: any = undefined) => {
  const cache = useAppSelector(selectCache);
  const dispatch = useAppDispatch();

  if (!cache) {
    dispatch(setCache({ [key]: defaultValue }));
  }

  const _setCache = (value: any) => {
    dispatch(setCache({ ...cache, [key]: value }));
  };

  return {
    value: cache && cache[key as keyof typeof cache],
    set: _setCache,
  };
};
