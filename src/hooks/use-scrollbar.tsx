import { InitializationTarget, OverlayScrollbars } from 'overlayscrollbars';
import { useEffect } from 'react';


const config = {};

const useScrollbar = (root:React.MutableRefObject<null | InitializationTarget>) => {
  useEffect(() => {
    const scrollbars = OverlayScrollbars(root.current, config);

    return () => {
        scrollbars
    }
  }, [root]);
};

export { useScrollbar };