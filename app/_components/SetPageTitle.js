"use client";

import { useEffect } from "react";
import { usePageTitle } from "./PageTitleContext";

function SetPageTitle({ title }) {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle(title);
    return () => setTitle(null);
  }, [title, setTitle]);

  return null;
}

export default SetPageTitle;
