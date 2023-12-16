import { useEffect, useState } from "react";

export default function useCommandResult(
  service: Function,
  onError: (e?: Error) => void = () => false,
  onSuccess: (value: any) => void = () => {},
): [any, () => void] {
  const [state, setState] = useState<any>(null);
  const [rerunFlag, setRerunFlag] = useState<boolean>(true);
  const rerun = () => setRerunFlag(!rerunFlag);
  useEffect(() => {
    let ignore = false;
    service()
      .then((result: any) => {
        if (!ignore) {
          setState(result);
          onSuccess(result);
        }
      })
      .catch((e: Error) => {
        onError(e);
      });
    return () => {
      ignore = true;
    };
  }, [rerunFlag, setState]);
  return [state, rerun];
}
