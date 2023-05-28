import React, {  useEffect } from "react";
import Prism from "prismjs";
import { Button, message } from "antd";
import "prismjs/components/prism-javascript"; // 对 JavaScript 高亮
import "prismjs/components/prism-css"; // 对 CSS 高亮
import "prismjs/themes/prism-tomorrow.css"; // 使用一个主题
import ReactMarkdown from "react-markdown";
type ShowContentProps = {
  content: object;
};

const ShowContent: React.FC<ShowContentProps> = ({ content }) => {
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    Prism.highlightAll();
  }, [content.code, content.language]);

  const copyPreContent = () => {
    // 找到页面上的第一个pre标签
    const preElement = document.getElementById("gfc");

    // 确保找到了pre标签
    if (preElement) {
      let text = preElement.textContent;
      const phrasesToBreak = ["内容如下","问题描述如下", "代码如下"];
      phrasesToBreak.forEach((phrase) => {
        const regex = new RegExp(phrase, "g");
        text = text.replace(regex, `${phrase}\n`);
      });
      // 将pre标签的内容复制到剪贴板
      navigator.clipboard
        .writeText(text)
        .then(() => {
          // 成功复制到剪贴板后可以在此进行其他操作，如显示消息
          messageApi
            .open({
              type: "success",
              content: "复制成功",
            })
            .then((r) => "");
          // console.log("Text copied to clipboard", text);
        })
        .catch((err) => {
          // 处理可能出现的错误
          console.error("Failed to copy text: ", err);
        });
    }
  };

  return (
    <>
      <Button onClick={copyPreContent}> 复制</Button>
      {contextHolder}
      <pre id="gfc">
        <div>
          现在你是{content.language}
          大师,请你用严谨安全的方式来帮我解决问题,可以对代码进行修改 内容如下
        </div>
        <div>问题描述如下</div>
        <ReactMarkdown>{content.desc}</ReactMarkdown>
        <div>代码如下</div>
        <code className={`language-${content.language}`}>{content.code}</code>
      </pre>
    </>
  );
};

export default ShowContent;
