import { useState } from "react";
import ConfigPart from "./component/ConfigPart";
import ShowContent from "./component/ShowContent";
import "./index.css";
function App() {
  const [content, setContent] = useState({});

  const handleGenerateContent = (newContent: object) => {
    setContent(newContent);
  };

  return (
    <>
      <section className="h-full w-full  ">
        <section className="flex  justify-center w-full gap-10 mt-[20px]">
          <div className="w-1/3">
            <h2>生成 区</h2>
            <ConfigPart onGenerateContent={handleGenerateContent}></ConfigPart>
          </div>
          <div className="w-[1px]">
            <div className="h-full w-full bg-gradient-to-r from-gray-300 to-white"></div>
          </div>
          <div className="w-1/3">
            <h2> 展示区 </h2>
            <ShowContent content={content}></ShowContent>
          </div>
        </section>
      </section>
    </>
  );
}

export default App;
