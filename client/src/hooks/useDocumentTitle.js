import { useEffect } from "react";

const SITE_NAME = "Shopora";

const useDocumentTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title;

    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

export default useDocumentTitle;