"use client";
import { useState } from "react";
import Dropdown from "./Dropdown";
import Single from "./Single";
import { isObject } from "@/utils/isObject";

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  label?: string;
  jsonPath?: string;
}

const JsonViewer = ({ data, label, jsonPath = "Root" }: IProps) => {
  const [isOpen] = useState<boolean>(jsonPath === "Root"); // Root is open by default, other nodes collapsed

  if (isObject(data)) {
    return (
      <Dropdown
        isOpen={isOpen}
        label={label || "Root"}
        children_count={Object.keys(data).length}
      >
        {Object.keys(data).map((key) => (
          <JsonViewer 
          key={key} 
          data={data[key]} 
          label={key} 
          jsonPath={`${jsonPath}.${key}`}
          />
        ))}
      </Dropdown>
    );
  }

  if (Array.isArray(data)) {
    return (
      <Dropdown
        isOpen={isOpen}
        label={label || "Array"}
        children_count={data.length}
      >
        {data.map((item, index) => (
          <JsonViewer 
          key={index} 
          data={item} 
          label={`Item ${index}`} 
          jsonPath={`${jsonPath}[${index}]`} 
          />
        ))}
      </Dropdown>
    );
  }

  return <Single 
  label={label || "Value"} 
  value={String(data)} 
  jsonPath={jsonPath}
  />;
};

export default JsonViewer;
