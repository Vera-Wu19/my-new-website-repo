import React, { useState } from "react";
//import axios from "axios";
//import { openaiConfig, openAIApiKey, organizationID } from "../apiConfig";
import callOpenAIApi from "../api/openai";
import { Link } from "react-router-dom";
import "../App.css";

function ResumeService() {
  const [resumeText, setResumeText] = useState("");
  const [optimizedResume, setOptimizedResume] = useState("");
  const [industry, setIndustry] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setResumeText(event.target.value);
  };

  const handleIndustryChange = (event) => {
    setIndustry(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const limitedResumeText = resumeText.substring(0, 1000);

    /*const openaiConfig = {
      headers: {
        "Content-Type": "application/json",
        "OpenAI-Organization": organizationID,
        Authorization: `Bearer ${openAIApiKey}`,
      },
    };*/

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `请针对${industry}行业的${position}职位，提供专业的求职辅导，并优化以下简历内容：${limitedResumeText}。请仔细检查拼写错误、语法错误和其他格式或文体问题。如果简历经历过于简略，你可以适当修改润色和进行补充扩展。在最后为简历提供点评和修改意见等反馈。请在编辑过程中遵循最佳实践和行业标准，不要包含任何个人意见或偏好，也不要杜撰简历中未提到的信息。不需要列出参考文献或者信息来源。`,
        },
      ],
      temperature: 0.8,
      max_tokens: 2500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    try {
      /*const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        requestBody,
        openaiConfig
      );*/
      const response = await callOpenAIApi(requestBody);
      const optimizedResumeContent =
        response.data.choices[0].message.content.trim();
      setOptimizedResume(optimizedResumeContent);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        console.error("Error calling OpenAI API: ", error.response.data);
      } else {
        console.error("Error calling OpenAI API: ", error);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Navbar */}
          <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
              <Link to="/">
                <button className="btn btn-outline-light" type="button">
                  返回主页面
                </button>
              </Link>
              <h1 className="section-title mx-auto">简历优化润色服务</h1>
            </div>
          </nav>
        </div>
      </div>

      <div className="container resume-service mt-5">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="industry">意向行业</label>
            <input
              type="text"
              name="industry"
              value={industry}
              onChange={handleIndustryChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">意向职位</label>
            <input
              type="text"
              name="position"
              value={position}
              onChange={handlePositionChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="resumeText">
              请在下方输入或粘贴您的简历内容。请勿输入个人敏感信息。
            </label>
          </div>
          <div className="position-relative">
            <textarea
              name="resumeText"
              value={resumeText}
              onChange={handleInputChange}
              className="form-control"
              rows="10"
            />
            <span
              className="position-absolute end-0 bottom-0 pe-2 pb-2"
              style={{ fontSize: "0.8rem" }}
            >
              {resumeText.length}/1000
            </span>
          </div>

          {resumeText.length > 1000 && (
            <p className="text-danger">
              您输入的内容过长，将会被截断至1000个字符。
            </p>
          )}
          <button type="submit" className="cta-btn">
            优化简历
          </button>
        </form>
        <div className="optimized-resume mt-5">
          <h2 className="section-title">优化后的简历</h2>
          {loading ? (
            <p>您的简历反馈正在路上，请稍等……</p>
          ) : (
            <pre>{optimizedResume}</pre>
          )}
        </div>
      </div>
    </>
  );
}
export default ResumeService;
