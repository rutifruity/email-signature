import React from "react";

interface TemplatePickerProps {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
}

const TemplatePicker: React.FC<TemplatePickerProps> = ({
  selectedTemplate,
  setSelectedTemplate,
}) => {
  return (
    <div>
      <h3>Select Template</h3>
      <select
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
      >
        <option value="template1">Template 1</option>
        <option value="template2">Template 2</option>
      </select>
    </div>
  );
};

export default TemplatePicker;
