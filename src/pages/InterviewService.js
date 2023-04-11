import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import { openaiConfig, openAIApiKey, organizationID } from "../apiConfig";
import callOpenAIApi from "../api/openai";

async function callOpenAIApiLocal(requestBody) {
  try {
    const response = await callOpenAIApi(requestBody);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.error);
    }
  } catch (error) {
    console.error("Error while calling OpenAI API:", error);
    throw error;
  }
}

function InterviewService() {
  useEffect(() => {
    const savedQuestionsFromStorage =
      JSON.parse(localStorage.getItem("savedQuestions")) || [];
    setSavedQuestions(savedQuestionsFromStorage);
  }, []);

  const saveQuestion = () => {
    setSavedQuestions([...savedQuestions, interviewQuestions]);
    localStorage.setItem(
      "savedQuestions",
      JSON.stringify([...savedQuestions, interviewQuestions])
    );
  };

  const [savedQuestions, setSavedQuestions] = useState([]);

  const [interviewQuestions, setInterviewQuestions] = useState([]);

  const [formData, setFormData] = useState({
    position: "",
    industry: "",
    difficulty: "",
    level: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `为一个${formData.industry}行业的${formData.level}级别的${formData.position}职位生成1个${formData.difficulty}难度的面试问题和3个相应的回答。固定格式为：“面试问题：……回答1：……回答2：……回答3：……”`,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    const parseText = (text) => {
      let lines = text.split("\n");
      let questions = [];
      let question = null;

      console.log("Lines:", lines);

      lines.forEach((line) => {
        console.log("Processing line:", line);

        if (/^面试问题：/.test(line)) {
          if (question !== null) {
            questions.push(question);
          }
          question = { question: line, answer: [] };
        } else if (/^回答\d：/.test(line) && question !== null) {
          question.answer.push(line + "\n");
        }
      });

      if (question !== null) {
        questions.push(question);
      }

      console.log("Questions array:", questions);
      setInterviewQuestions(questions);
    };

    try {
      /*const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        requestBody,
        openaiConfig
      );*/
      const response = await callOpenAIApi(requestBody);
      console.log("API Response Object:", response);
      console.log("API Response:", response.data);
      const responseText = response.data.choices[0].message.content;
      console.log("API Response Text:", responseText);
      parseText(responseText);

      if (
        !response.data.choices ||
        !response.data.choices[0] ||
        !response.data.choices[0].message.content
      ) {
        console.error("Unexpected API response:", response.data);
        setLoading(false);
        return;
      }

      setLoading(false);
    } catch (error) {
      console.error("Error calling OpenAI API: ", error);
      setLoading(false);
    }
  };
  console.log("Interview questions state:", interviewQuestions);

  const [answerVisibility, setAnswerVisibility] = useState(
    Array(interviewQuestions.length).fill(false)
  );
  useEffect(() => {
    setAnswerVisibility(Array(interviewQuestions.length).fill(false));
  }, [interviewQuestions]);

  const toggleAnswer = (index) => {
    const newAnswerVisibility = [...answerVisibility];
    newAnswerVisibility[index] = !newAnswerVisibility[index];
    setAnswerVisibility(newAnswerVisibility);
  };

  const deleteQuestion = (index) => {
    const newSavedQuestions = [...savedQuestions];
    newSavedQuestions.splice(index, 1);
    setSavedQuestions(newSavedQuestions);
  };

  return (
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
            <h1 className="section-title mx-auto">面试模拟服务</h1>
          </div>
        </nav>
      </div>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <form onSubmit={handleSubmit} className="form mt-3">
            {/* 各个表单 */}
            {/* ... */}
            <div className="form-group">
              <input
                type="text"
                name="position"
                placeholder="职位"
                value={formData.position}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="industry"
                placeholder="行业"
                value={formData.industry}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">请选择难度</option>
                <option value="容易">容易</option>
                <option value="中等">中等</option>
                <option value="困难">困难</option>
              </select>
            </div>
            <div className="form-group">
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">请选择职位等级</option>
                <option value="internship">实习生（internship）</option>
                <option value="entry-level">入门职位（entry-level）</option>
                <option value="junior-level">初级职位（junior-level）</option>
                <option value="mid-level">中级职位（mid-level）</option>
                <option value="senior-level">高级职位（senior-level）</option>
                <option value="managerial-level">
                  管理职位（managerial-level）
                </option>
                <option value="executive-level">
                  高管职位（executive-level）
                </option>
              </select>
            </div>
            <button type="submit" className="cta-btn btn btn-primary">
              开始模拟
            </button>
          </form>
        </div>
        {/* Main Content */}
        <div className="col-md-9 col-lg-10 main-content">
          <h1 className="section-title">面试问题和回答</h1>
          <div>{loading && <p>AI面试官正在思考问题，请稍等……</p>}</div>
          <div className="card-wrapper">
            <ul className="interview-questions-list">
              {interviewQuestions.map((item, index) => (
                <li key={index} className="interview-question">
                  <p>{item.question}</p>
                  {answerVisibility[index] &&
                    item.answer.map((ans, ansIdx) => <p key={ansIdx}>{ans}</p>)}
                  <button onClick={() => toggleAnswer(index)}>
                    {answerVisibility[index] ? "隐藏答案" : "显示答案"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={saveQuestion} className="cta-btn btn btn-primary">
            保存
          </button>
          <div className="sidebar">
            <h1>有参考价值的面试问题</h1>
            <div className="card-wrapper">
              {/* 有参考价值的面试问题 */}
              {/* ... */}
              <ul className="saved-questions-list">
                {savedQuestions.map((questionGroup, index) => (
                  <li key={index} className="saved-question">
                    {questionGroup.map((item, idx) => (
                      <div key={idx}>
                        <p>{item.question}</p>
                        <p>{item.answer}</p>
                      </div>
                    ))}
                    <button onClick={() => deleteQuestion(index)}>删除</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewService;
