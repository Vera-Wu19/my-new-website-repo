import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div>
      <header>
        <div className="container">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="求职汪" />
          </Link>
          <nav>
            <ul>
              <li>
                <Link to="resume-service">简历修改服务</Link>
              </li>
              <li>
                <Link to="interview-service">面试模拟服务</Link>
              </li>
              <li>
                <a href="#about-us">关于我们</a>
              </li>
              <li>
                <a href="#contact-us">联系我们</a>
              </li>
              <li>
                <Link to="register-login">登录/注册</Link>
              </li>
            </ul>
          </nav>
          <div className="toggle-menu">
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>
      <section className="hero">
        <div className="container">
          <h1>追寻你的职场梦想！</h1>
          <p>
            求职汪是你忠实的求职伙伴，我们运用当下最先进的AI技术，提供简历修改润色和面试模拟服务，为你解决求职难和面试慌，助你实现职业目标。
          </p>
        </div>
      </section>
      <section className="resume-editing">
        <div className="container">
          <h2>简历润色</h2>
          <p>
            上传你的简历，我们会提供超有范儿的建议，让你的简历瞬间升级，吸引招聘经理的注意！
          </p>
          <Link to="/resume-service" className="cta-btn">
            快来试试
          </Link>
        </div>
      </section>
      <section className="interview-simulation">
        <div className="container">
          <h2>面试模拟</h2>
          <p>
            通过我们的面试模拟，你可以获得丰富的面试经验，锻炼自己的应变能力和沟通技巧，变得更加自信、从容、出色！
          </p>
          <Link to="/interview-service" className="cta-btn">
            快来试试
          </Link>
        </div>
      </section>
      <section className="about-us" id="about-us">
        <div className="container">
          <h2>关于我们</h2>
          <p>
            求职汪是一支充满朝气和活力的年轻团队，我们的使命是帮助求职者解决求职难和面试慌的问题，用AI赋能，为职场打call！
            我们承诺不会侵犯用户的个人隐私。用户上传的简历只会保留在本地，求职汪无权查看。
            祝大家都求职顺利，offer多多！
          </p>
        </div>
      </section>
      <section className="contact-us" id="contact-us">
        <div className="container">
          <h2>联系我们</h2>
          <p>
            有任何问题或建议吗？快来发邮件给我们吧，我们会在72小时内回复你！
          </p>
        </div>
      </section>
      <footer>
        <div className="container">
          <p>&copy; 2023 Jobsdog. All rights reserved.</p>
          <nav>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Use</a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Home;
