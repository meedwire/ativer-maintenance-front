import {useMemo, useState} from 'react';

interface IHelpers {
  setTrue: () => void;
  setFalse: () => void;
  toogle: () => void;
}

type IUseBoolean = [boolean, IHelpers];

export function useBoolean(initialState?: boolean): IUseBoolean {
  const [state, setState] = useState(initialState || false);

  return useMemo(() => {
    const setTrue = () => setState(true);
    const setFalse = () => setState(false);
    const toogle = () => setState(prev => !prev);

    return [state, {setTrue, setFalse, toogle}];
  }, [state]);
}
