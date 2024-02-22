import { useState } from "react";

import ImageSlider from "./components/image-slider";
import { LoadMoreData } from "./components/load-more-data";
import TreeView from "./components/tree-view";
import menus from "./components/tree-view/data";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <ImageSlider
        url={"https://picsum.photos/v2/list"}
        page={"1"}
        limit={"4"}
      /> */}

      {/* <LoadMoreData /> */}

      <TreeView menus={menus} />
    </>
  );
}

export default App;
