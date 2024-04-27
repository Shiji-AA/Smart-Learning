import chat from "../../../assets/chat.png";
import quiz from "../../../assets/quiz.jpeg";
import videocall1 from "../../../assets/videocall1.jpg";
import certificateimage from "../../../assets/cerificateimage.jpg";
import { Link } from "react-router-dom";

interface AbcProps {
  courseId: string | undefined;
}

function Abc({ courseId }: AbcProps) {
  return (
    <>
      <div className="h-screen w-screen bg-gray-100 flex flex-col justify-center ">
        <h1
          className="text-center"
          style={{ textDecoration: "underline", color: "blue" }}
        >
          Our Best Services
        </h1>

        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {/* CHAT */}
          <div className="bg-slate-800 text-white rounded-m w-full md:w-[calc(40%-2rem)] lg:w-[calc(46%-2rem)] space-y-4 p-10 bg-blue-400">
            {/* <Link to={`/chat/${courseId}`}> */}
              <div className="flex space-x-4 items-center">
                <div className="w-12 h-12">
                  <img
                    alt="avatar"
                    src={chat}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex space-x-2 items-center">
                    <h2 className="text-base"> CHAT </h2>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-m leading-6 text-slate-300">
                  Question-and-answer sessions are an excellent forum for
                  persuasion. If you can shine in Q & A, Q & A is a golden
                  opportunity to help confused or unconvinced listeners. You can
                  further clarify your argument or give examples of your
                  solution.
                </p>
              </div>
            {/* </Link> */}
          </div>

          {/* VIDEO CALL */}
          <div className="bg-slate-800 text-white rounded-m w-full md:w-[calc(50%-2rem)] lg:w-[calc(46%-2rem)] space-y-4 p-10 bg-blue-400">
            <Link to={`/videocalluser/${courseId}`}>
              <div className="flex space-x-4 items-center">
                <div className="w-12 h-12">
                  <img
                    alt="avatar"
                    src={videocall1}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex space-x-2 items-center">
                    <h2 className="text-base"> VIDEOCALL</h2>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-m leading-6 text-slate-300">
                  Mentoring brings value at many levels for mentees, mentors,
                  supervisors and the organization. Mentees have an opportunity
                  to gain practical knowledge and insight from a seasoned
                  employee who has achieved a level of expertise they aspire to
                  attain
                </p>
              </div>
            </Link>
          </div>

          {/* CERTIFICATES */}
          <div className="bg-slate-800 text-white rounded-m w-full md:w-[calc(50%-2rem)] lg:w-[calc(46%-2rem)] space-y-6 p-10 bg-blue-400">
            <Link to ={`/downloadcertificate/${courseId}`}>
            <div className="flex space-x-4 items-center">
              <div className="w-12 h-12">
                <img
                  alt="avatar"
                  src={certificateimage}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex space-x-2 items-center">
                  <h2 className="text-base"> CERTIFICATES</h2>
                </div>
              </div>
            </div>

            <div>
              <p className="text-m leading-6 text-slate-300">
                Certificates are at the parallel universe was the advice of
                alarm, commanded to a conscious ship. Processors experiment with
                paralysis!
              </p>
            </div>
            </Link>
           
          </div>

          {/*  QUIZ */}

          <div className="bg-slate-800 text-white rounded-m w-full md:w-[calc(50%-2rem)] lg:w-[calc(46%-2rem)] space-y-6 p-10 bg-blue-400">
            <Link to= {`/getquiz/${courseId}`}>
            <div className="flex space-x-4 items-center">
              <div className="w-12 h-12">
                <img
                  alt="avatar"
                  src={quiz}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex space-x-2 items-center">
                  <h2 className="text-base">QUIZ</h2>
                </div>
              </div>
            </div>
            <div>
              <p className="text-m leading-6 text-slate-300">
                Quizzes are a great way to have fun, but they can also be used
                as a tool for self-improvement. They can help you learn more
                about yourself and how others view you.
              </p>
            </div>
            </Link>           
          </div>
        </div>
      </div>
    </>
  );
}

export default Abc;
