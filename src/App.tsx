import { useState } from "react";
import ConfigPart from "./component/ConfigPart";
import ShowContent from "./component/ShowContent";
import { Divider } from 'antd';
import "./index.css";
function App() {
  const [content, setContent] = useState({});

  const handleGenerateContent = (newContent: object) => {
    setContent(newContent);
  };

  return (
    <>
      <section className="h-full w-full flex justify-center items-center flex-col ">
        <section className=" w-[60%]  mr-[50px] ml-[50px] flex  justify-center items-center     mt-[20px] flex-col">
          <div className=" w-full flex flex-col items-center">
            <h2>生成 区</h2>
            <ConfigPart onGenerateContent={handleGenerateContent}></ConfigPart>
          </div>
          <Divider className="w-full"></Divider>
          <div className=" h-1/2 w-full flex flex-col items-center  ">
            <h2> 展示区 </h2>
            <ShowContent content={content} ></ShowContent>
          </div>
        </section>
      </section>
    </>
  );
}

export default App;
