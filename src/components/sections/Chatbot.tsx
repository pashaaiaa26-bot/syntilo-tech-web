"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, User, Bot, Loader2 } from "lucide-react";
import styles from "./Chatbot.module.css";

interface Message {
  sender: "bot" | "user";
  text: string;
  isTyping?: boolean;
}

const PRESET_FAQS = [
  {
    question: "How does Syntilo Tech deliver software so fast?",
    answer: "We utilize advanced AI-driven workflows combined with strict pre-built component libraries and compilation pipelines. By automating boilerplate code generation, routing, and deployment configurations, we focus 100% of our energy on custom business logic, allowing us to deploy complete platforms in weeks instead of months."
  },
  {
    question: "Is the code scalable and secure?",
    answer: "Absolutely. Every line of code is written in strict TypeScript. We implement absolute type safety, input sanitization, and parameterized ORM queries to eliminate common security flaws. The architecture is modular, meaning internal teams can easily maintain and extend the software as the company scales."
  },
  {
    question: "What industries do you specialize in?",
    answer: "We specialize in data-rich, operationally complex sectors. Our primary focus is on Clinic Management systems, Gym Check-in and Billing platforms, Travel Agency routing portals, and RideEcho mobility tracking dashboards. However, our modular architecture is fully agnostic and ready for any SaaS or internal portal niche."
  }
];

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Welcome to Syntilo Tech. I'm your AI solutions coordinator. Ask me anything about our automated engineering processes or founder Sheraz Pasha."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isBotLoading, setIsBotLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotLoading]);

  // Simulate typing effect
  const typeMessage = (text: string) => {
    setIsBotLoading(false);
    const newMessage: Message = { sender: "bot", text: "", isTyping: true };
    setMessages((prev) => [...prev, newMessage]);

    let index = 0;
    const interval = setInterval(() => {
      setMessages((prev) => {
        const copy = [...prev];
        const lastMsg = copy[copy.length - 1];
        if (lastMsg && lastMsg.sender === "bot") {
          lastMsg.text = text.substring(0, index);
        }
        return copy;
      });
      index += 3; // speed up typing slightly

      if (index > text.length) {
        clearInterval(interval);
        setMessages((prev) => {
          const copy = [...prev];
          const lastMsg = copy[copy.length - 1];
          if (lastMsg) lastMsg.isTyping = false;
          return copy;
        });
      }
    }, 20);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsBotLoading(true);

    setTimeout(() => {
      // Analyze text for custom response
      const query = text.toLowerCase();
      let response = "";

      if (query.includes("founder") || query.includes("sheraz") || query.includes("pasha")) {
        response = "Syntilo Tech was founded by Sheraz Pasha, an experienced software engineer and systems architect. Sheraz established the agency to bridge the gap between slow legacy development methodologies and modern AI automation capabilities.";
      } else if (query.includes("price") || query.includes("cost") || query.includes("calculator")) {
        response = "Our projects are quoted on a transparent, flat-fee basis, generally ranging from $20k to $35k depending on complexity. Use our ROI Calculator section above to generate a custom timeline and cost estimation!";
      } else if (query.includes("stack") || query.includes("react") || query.includes("next")) {
        response = "Our stack is built on Next.js, React, strict TypeScript, and Node.js. Databases are managed with PostgreSQL and Prisma ORM, deployed to serverless environments (AWS/Vercel) for 99.9% uptime guarantees.";
      } else {
        response = "That is a great question! While I am optimized for common developer inquiries, I recommend booking a discovery call. Our founder Sheraz Pasha can review this technical detail with you directly. You can use the form below to lock in a time.";
      }

      typeMessage(response);
    }, 1500); // Shimmer duration
  };

  const handlePresetClick = (faq: typeof PRESET_FAQS[0]) => {
    if (isBotLoading) return;
    setMessages((prev) => [...prev, { sender: "user", text: faq.question }]);
    setIsBotLoading(true);

    setTimeout(() => {
      typeMessage(faq.answer);
    }, 1200);
  };

  return (
    <section id="faq" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Text */}
          <div className={styles.leftCol}>
            <span className="gradient-accent-text font-bold text-sm tracking-wider uppercase">Interactive Support</span>
            <h2 className={styles.title}>Have Questions? Meet Our Coordinator.</h2>
            <p className={styles.subtitle}>
              Interact with our FAQ agent to learn more about how we compile secure platforms at superhuman speeds. Choose a pre-set node below or ask a custom question.
            </p>

            <div className={styles.presetContainer}>
              <p className={styles.presetTitle}>PRE-LOADED DISCOVERY NODES:</p>
              <div className={styles.presetButtons}>
                {PRESET_FAQS.map((faq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePresetClick(faq)}
                    disabled={isBotLoading}
                    className={styles.presetBtn}
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Chat Widget */}
          <div className={styles.chatCard}>
            <div className={styles.chatHeader}>
              <div className={styles.botIcon}>
                <Bot size={20} />
              </div>
              <div>
                <h3 className={styles.botName}>Syntilo Agent</h3>
                <p className={styles.botStatus}>Online • Ready to answer</p>
              </div>
            </div>

            {/* Message Area */}
            <div className={styles.messageArea}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${styles.messageWrapper} ${
                    msg.sender === "user" ? styles.userWrapper : styles.botWrapper
                  }`}
                >
                  <div className={styles.avatar}>
                    {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={styles.bubble}>
                    <p>{msg.text}</p>
                    {msg.isTyping && <span className={styles.cursor}>|</span>}
                  </div>
                </div>
              ))}

              {/* Shimmering Skeleton Loader */}
              {isBotLoading && (
                <div className={`${styles.messageWrapper} ${styles.botWrapper}`}>
                  <div className={styles.avatar}>
                    <Bot size={14} />
                  </div>
                  <div className={`${styles.bubble} ${styles.shimmerBubble}`}>
                    <div className="shimmer" style={{ width: "160px", height: "12px", borderRadius: "4px", marginBottom: "8px" }} />
                    <div className="shimmer" style={{ width: "240px", height: "12px", borderRadius: "4px", marginBottom: "8px" }} />
                    <div className="shimmer" style={{ width: "120px", height: "12px", borderRadius: "4px" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className={styles.inputArea}
            >
              <input
                type="text"
                placeholder="Ask about pricing, tech stack, or founder..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isBotLoading}
                className={styles.input}
              />
              <button
                type="submit"
                disabled={isBotLoading || !inputValue.trim()}
                className={styles.sendBtn}
              >
                {isBotLoading ? <Loader2 size={16} className={styles.loadingRotate} /> : <Send size={16} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
