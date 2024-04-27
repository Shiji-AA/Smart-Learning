import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Cards() {
  return (
    <>
      <style>{`
        /* Tailwind CSS styles */
        .cardlayout img {
          height: 280px;
        }
      `}</style>

      <Container className="mt-5">
        <h1
          className="text-center"
          style={{ textDecoration: "underline", color: "aqua" }}
        >
          Our Best Services
        </h1>
      </Container>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <Link to={"/studentquizpage"} style={{ textDecoration: "none" }}>
              <div className="row mt-3">
                <div className="col-md-2 ">
                  <img
                    className="bg-white mt-2 cardlayout"
                    style={{ width: "4rem" }}
                    alt=""
                  />
                </div>
                <div className="col-lg-10">
                  <h4 style={{ fontFamily: "Vollkorn serif", color: "grey" }}>
                    Learn Through Quizes
                  </h4>
                  <p
                    style={{
                      color: "#fff",
                      fontFamily: "Open Sans sans-serif",
                    }}
                  >
                    Quizzes are a great way to have fun, but they can also be
                    used as a tool for self-improvement. They can help you learn
                    more about yourself and how others view you.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-6">
            <Link to="/studentpdfs" style={{ textDecoration: "none" }}>
              <div className="row mt-3">
                <div className="col-md-2">
                  <img
                    className="bg-white mt-2 cardlayout"
                    style={{ width: "4rem" }}
                    alt=""
                  />
                </div>
                <div className="col-lg-10">
                  <h4 style={{ fontFamily: "Vollkorn serif", color: "grey" }}>
                    Download PDF Notes
                  </h4>
                  <p
                    style={{
                      color: "#fff",
                      fontFamily: "Open Sans sans-serif",
                    }}
                  >
                    Digitization not only increases time savings when accessing
                    a specific document, but also saves paper. When a student
                    uses PDF format to finish their work, they also protect
                    their authorship with support that prevents another author
                    from modifying a document that has already been prepared
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-6">
            <Link to="/chat" style={{ textDecoration: "none" }}>
              <div className="row mt-3">
                <div className="col-md-2 ">
                  <img
                    className="bg-white mt-2 cardlayout"
                    style={{ width: "4rem" }}
                    alt=""
                  />
                </div>
                <div className="col-lg-10">
                  <h4 style={{ fontFamily: "Vollkorn serif", color: "grey" }}>
                    Ask Your Doubts Anytime
                  </h4>
                  <p
                    style={{
                      color: "#fff",
                      fontFamily: "Open Sans sans-serif",
                    }}
                  >
                   Question-and-answer sessions are an excellent forum for persuasion. If you can shine in Q & A, your credibility will soar. Q & A is a golden opportunity to help confused or unconvinced listeners. You can further clarify your argument or give examples of your solution.
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-6">
            <Link to="/mentoring" style={{ textDecoration: "none" }}>
              <div className="row mt-3">
                <div className="col-md-2 ">
                  <img
                    className="bg-white mt-2 cardlayout"
                    style={{ width: "4rem" }}
                    alt=""
                  />
                </div>
                <div className="col-lg-10">
                  <h4 style={{ fontFamily: "Vollkorn serif", color: "grey" }}>
                    One-to-One Mentoring
                  </h4>
                  <p
                    style={{
                      color: "#fff",
                      fontFamily: "Open Sans sans-serif",
                    }}
                  >
                    Mentoring brings value at many levels for mentees, mentors, supervisors and the organization for which they work. Mentees have an opportunity to gain practical knowledge and insight from a seasoned employee who has achieved a level of expertise they aspire to attain
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
