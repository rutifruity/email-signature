import React, { useState } from "react";
import axios from "axios";
import TemplatePicker from "./TemplatePicker";

interface Signature {
  html: string;
  plainText: string;
}

const SignatureForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    logoUrl: "",
  });
  const [template, setTemplate] = useState("template1");
  const [signature, setSignature] = useState<Signature>({
    html: "",
    plainText: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/signatures/generate",
      {
        templateName: template,
        userInfo,
      }
    );
    console.log("response.data", response.data);
    setSignature(response.data as Signature);
  };

  return (
    <div>
      <h3>Enter Your Information</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={userInfo.fullName}
          onChange={(e) =>
            setUserInfo({ ...userInfo, fullName: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={userInfo.phone}
          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Logo URL"
          value={userInfo.logoUrl}
          onChange={(e) =>
            setUserInfo({ ...userInfo, logoUrl: e.target.value })
          }
        />
        <TemplatePicker
          selectedTemplate={template}
          setSelectedTemplate={setTemplate}
        />
        <button type="submit">Generate Signature</button>
      </form>

      {signature.html && (
        <div>
          <h3>Generated Signature</h3>
          <div dangerouslySetInnerHTML={{ __html: signature.html }} />
          <pre>{signature.plainText}</pre>
        </div>
      )}
    </div>
  );
};

export default SignatureForm;
