import { useState } from "react";

import ImageSlider from "./components/image-slider";
import { LoadMoreData } from "./components/load-more-data";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <ImageSlider
        url={"https://picsum.photos/v2/list"}
        page={"1"}
        limit={"4"}
      /> */}

      <LoadMoreData />
    </>
  );
}

export default App;
