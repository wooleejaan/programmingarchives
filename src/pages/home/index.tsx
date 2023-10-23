import { useEffect } from "react";

import getHttpForTest from "@r/services/api/fetch/getHttpForTest";
import wrapperForFetch from "@r/services/api/fetch/wrapperForFetch";

export default function Home() {
  useEffect(() => {
    wrapperForFetch(getHttpForTest, console.log);
  }, []);

  return <div>home</div>;
}
