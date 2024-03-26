import React, { useState } from 'react';

const FAQSection = () => {
  const [isOpen, setIsOpen] = useState([false, false, false]);

  const toggleAnswer = (index) => {
    setIsOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const faqData = [
    {
      question: 'How do I enroll in an online course?',
      answer: [
        'Browse our course catalog and select the course you want to enroll in.',
        'Click on the "Enroll Now" button on the course page.',
        'Follow the instructions to complete the enrollment process.',
      ],
    },
    {
      question: 'Are the online courses self-paced?',
      answer: [
        'Yes, most of our online courses are self-paced, allowing you to study at your own convenience.',
        'However, some courses may have set start and end dates.',
      ],
    },
    {
      question: 'How can I access course materials?',
      answer: [
        'Once you enroll in a course, you will gain access to the course materials through our online learning platform.',
        'Simply log in to your account and navigate to the course dashboard to view lectures, assignments, and other resources.',
      ],
    },
  ];

  return (
    <section className="py-6 bg-gray-50 sm:py-16 lg:py-24 mt-[-49px]">
      <div className="flex flex-col md:flex-row items-center justify-center flex-wrap">
        {/* FAQ Section */}
        <div className="w-full md:w-2/3 px-2">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => toggleAnswer(index)}
                  className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                >
                  <span className="flex text-lg font-semibold text-black">
                    {faq.question}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`w-6 h-6 text-gray-400 ${isOpen[index] && 'transform rotate-180'}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div
                  style={{ display: isOpen[index] ? 'block' : 'none' }}
                  className="px-4 pb-5 sm:px-6 sm:pb-6"
                >
                  <ul className="list-disc pl-6">
                    {faq.answer.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-base mt-9">
            Still have questions?{' '}
            <span className="cursor-pointer font-medium text-tertiary transition-all duration-200 hover:text-tertiary focus:text-tertiary hover-underline">
              Contact our support
            </span>
          </p>
        </div>  
      </div>
    </section>
  );
};

export default FAQSection;
