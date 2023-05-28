import { Button, Form, Select } from "antd";
import React, { useState, useCallback, useMemo } from "react";
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
  const [form] = Form.useForm();
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
  return (
    <Form layout="vertical" form={form}>
      <Form.Item name="lang" label="选择你使用的语言">
        <Select placeholder="选择你使用的语言" onChange={handleChange}>
          {langOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="editor" label="代码">
        <AceEditor
          placeholder="在这里贴您的代码"
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
      </Form.Item>

      <Form.Item label="问题描述">
        <SimpleMdeReact
          options={autofocusNoSpellcheckerOptions}
          value={descContent}
          placeholder={"在这里贴您的代码"}
          events={events}
          onChange={mdChange}
        />
      </Form.Item>

      <Form.Item>
        <Button onClick={generateContent}>生成</Button>
      </Form.Item>
    </Form>
  );
};

export default ConfigPart;
