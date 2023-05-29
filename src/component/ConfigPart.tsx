import { Button, Form, Select } from "antd";
import React, { useState, useMemo } from "react";
import AceEditor from "react-ace";
import SimpleMDE from "easymde";
import SimpleMdeReact, { SimpleMdeToCodemirrorEvents } from "./SimpleMdeReact";
type LangOption = {
  value: string;
  label: string;
};

type ConfigPartProps = {
  onGenerateContent: (newContent: object) => void;
};
const ConfigPart: React.FC<ConfigPartProps> = ({ onGenerateContent }) => {
  const [lang, setLang] = useState("");
  const [codeContent, setCodeContent] = useState("");
  const [descContent, setDescContent] = useState("");
  const { Option } = Select;
  const langOptions: LangOption[] = [
    {
      value: "React",
      label: "React",
    },
    {
      value: "Vue3",
      label: "Vue3",
    },
    {
      value: "TypeScript",
      label: "TypeScript",
    },
    {
      value: "Nestjs",
      label: "Nestjs",
    },
    {
      value: "Go",
      label: "Go",
    },
    {
      value: "Java",
      label: "Java",
    },
  ];
  const handleChange = (e: any) => {
    console.log(e, "111");
    setLang(e);
  };
  const events = {
    focus: () => console.log("focus"),
  } as SimpleMdeToCodemirrorEvents;
  const codeEditorChange = (val: string) => {
    setCodeContent(val);
  };

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    } as SimpleMDE.Options;
  }, []);
  const mdChange = (value: string) => {
    setDescContent(value);
  };
  const generateContent = () => {
    // //
    // const str = `现在你是${lang}大师,请帮我解决下问题
    // 我的代码如下
    // ${codeContent},
    // 问题为
    // ${descContent}
    // 请你用较为严谨方式来帮我解决问题，代码可修改`;
    const contentObj = {
      language: lang,
      code: codeContent,
      desc: descContent,
    };
    onGenerateContent(contentObj);
  };
  const clearContent = () => {
    setDescContent("");
    setCodeContent("");
  };
  return (
    <>
      <div className="flex gap-2 mb-5 mt-5 w-[200px]">
        <Button onClick={generateContent}>生成</Button>
        <Button onClick={clearContent}>清空</Button>
      </div>

      <div className="h-full w-[200px] mb-[15px] ">
        <Select
          placeholder="选择你使用的语言"
          onChange={handleChange}
          className="w-[200px]"

        >
          {langOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </div>
      <section className=" w-full grid grid-cols-2 gap-10   ">
        <div>
          <AceEditor
            placeholder="在这里贴您的描述"
            mode="java"
            theme="github"
            name="blah2"
            onChange={codeEditorChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={codeContent}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>

        <div className="h-[200px]">
          <SimpleMdeReact
            options={autofocusNoSpellcheckerOptions}
            value={descContent}
            placeholder={"在这里贴您的描述"}
            events={events}
            onChange={mdChange}
          />
        </div>
      </section>
    </>
  );
};

export default ConfigPart;
