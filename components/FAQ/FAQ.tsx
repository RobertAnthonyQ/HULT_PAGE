"use client";
import React, { useState, useEffect, useRef } from "react";
import { Terminal, Send, SquareTerminal } from "lucide-react";

const FAQS = [
  {
    id: "01",
    question: "check eligibility",
    answer:
      "STUDENTS CURRENTLY ENROLLED AT PUCP.\nTEAMS OF 3-4 MEMBERS.\nONE MEMBER MUST BE FLUENT IN ENGLISH.\nREADY TO DISRUPT THE STATUS QUO.",
  },
  {
    id: "02",
    question: "view deadlines",
    answer:
      "REGISTRATION CLOSES: OCT 15.\nON-CAMPUS FINALS: NOV 20.\nREGIONAL SUMMIT: MARCH 2025.\nGLOBAL ACCELERATOR: JULY 2025.",
  },
  {
    id: "03",
    question: "judging criteria",
    answer:
      "PROFITABLE: MUST GENERATE REVENUE.\nIMPACTFUL: NET POSITIVE ON ENVIRONMENT/SOCIETY.\nSCALABLE: ABILITY TO GROW EXPONENTIALLY.",
  },
];

const TypingText: React.FC<{ text: string; onComplete?: () => void }> = ({
  text,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
        onComplete?.();
      }
    }, 2); // Ultra-fast technical typing
    return () => clearInterval(intervalId);
  }, [text, onComplete]);

  return (
    <span className="whitespace-pre-line text-green-400 font-mono text-sm md:text-base leading-relaxed">
      {displayedText}
    </span>
  );
};

const StreamingText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <span className="whitespace-pre-line text-green-400 font-mono text-sm md:text-base leading-relaxed">
      {text}
      <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1 align-middle"></span>
    </span>
  );
};

interface Message {
  id: string;
  type: "system" | "user";
  content: React.ReactNode;
  isStreaming?: boolean;
  text?: string; 
}

const FAQ: React.FC = () => {
  const [history, setHistory] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initial system message
    setHistory([
      {
        id: "init",
        type: "system",
        content: (
          <div className="text-gray-400 text-sm mb-4">
            Last login: {new Date().toDateString()} on ttys000
            <br />
            Hult_Prize_System v2.4.0 initialized...
            <br />
            Type 'help' or select a command to begin.
          </div>
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTyping, isLoading]);

  const handleSend = async (text: string, predefinedAnswer?: string) => {
    if (!text.trim()) return;

    const cmd = text.trim().toLowerCase();

    // Clear command handles immediately
    if (cmd === "cls" || cmd === "clear") {
      setHistory([]);
      setInputValue("");
      return;
    }

    // Add user message
    const newMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: text,
    };
    
    // We update history with the user message first
    const updatedHistory = [...history, newMessage];
    setHistory(updatedHistory);
    setInputValue("");
    
    // If predefined answer exists (shortcuts), use it
    if (predefinedAnswer) {
        setIsTyping(true);
        setTimeout(() => {
            setHistory(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                type: "system",
                content: <TypingText text={predefinedAnswer} onComplete={() => setIsTyping(false)} />
            }]);
        }, 50);
        return;
    }

    // Command Interpreter for specific static commands
    let staticResponse = null;
    switch (cmd) {
        case "help":
            staticResponse = "AVAILABLE COMMANDS:\n  help        : Display this help message\n  clear / cls : Clear the terminal screen\n  ls / dir    : List available implementation protocols\n  whoami      : Display current session user\n  date        : Display system status time\n  pwd         : Print working directory";
            break;
        case "ls":
        case "dir":
        case "ll":
            staticResponse = FAQS.map(f => 
              `-rwxr-xr-x  1 root  admin  ${f.answer.length.toString().padStart(4, ' ')}  ${new Date().toLocaleDateString()}  ${f.question.replace(/\s+/g, '_')}.sh`
            ).join("\n");
            break;
        case "whoami":
            staticResponse = "guest@hult-prize-portal";
            break;
        case "date":
            staticResponse = new Date().toUTCString();
            break;
        case "pwd":
            staticResponse = "/var/www/hult_prize/public_access";
            break;
        case "cd":
            staticResponse = "bash: cd: restricted shell environment";
            break;
        case "sudo":
            staticResponse = "guest is not in the sudoers file. This incident will be reported.";
            break;
        default:
            // Check for ./script aliases
             const foundFaq = FAQS.find(f => 
                text.includes(f.question) || 
                text.includes(f.question.replace(/\s+/g, '_'))
             );
             if (foundFaq) staticResponse = foundFaq.answer;
             else if (cmd.startsWith("./")) staticResponse = `bash: ${text}: No such file or directory`;
    }

    if (staticResponse) {
        setIsTyping(true);
        setTimeout(() => {
            setHistory(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                type: "system",
                content: <TypingText text={staticResponse!} onComplete={() => setIsTyping(false)} />
            }]);
        }, 50);
        return;
    }

    // AI Streaming Response
    setIsLoading(true);
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                messages: [
                    { role: 'user', content: text }
                ]
            }),
        });

        if (!response.body) throw new Error("No response body");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let accumulatedText = "";
        
        // Add a placeholder message for the stream
        const streamId = (Date.now() + 1).toString();
        setHistory(prev => [...prev, {
            id: streamId,
            type: "system",
            content: "",
            isStreaming: true,
            text: ""
        }]);

        while (!done) {
            const { value, done: DONE } = await reader.read();
            done = DONE;
            const chunkValue = decoder.decode(value, { stream: true });
            accumulatedText += chunkValue;

            setHistory(prev => prev.map(msg => 
                msg.id === streamId 
                ? { ...msg, text: accumulatedText, content: <StreamingText text={accumulatedText} /> }
                : msg
            ));
            
            // Simulate slower streaming for "hacker" effect
            await new Promise(resolve => setTimeout(resolve, 40));
        }
    } catch (error) {
        setHistory(prev => [...prev, {
            id: Date.now().toString(),
            type: "system",
            content: <TypingText text="Error: Connection to Hult_Net failed." />
        }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend(inputValue);
    }
  };

  const focusInput = () => {
    if (!isTyping && !isLoading) {
        inputRef.current?.focus();
    }
  };

  // Placeholder animation logic
  const [placeholder, setPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const placeholders = [
    "cuándo es el evento de pitch?",
    "cuándo se entregan los entregables?",
    "cuántos equipos pasan a la final?",
    "help",
    "./check_eligibility.sh"
  ];

  useEffect(() => {
    if (hasInteracted) {
        setPlaceholder("");
        return;
    }

    if (isPaused) return;

    const currentText = placeholders[placeholderIndex];
    const speed = isDeleting ? 30 : 50;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setPlaceholder(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setPlaceholder(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, 1500); // Wait before deleting
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, isPaused, placeholderIndex, placeholders, hasInteracted]);

  return (
    <section id="faq" className="w-full min-h-screen flex flex-col items-center justify-center bg-void px-4 py-12 md:py-20 relative font-mono overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <h2 className="text-5xl md:text-7xl font-black text-center mb-12 md:mb-10 text-white uppercase tracking-tighter z-10 leading-[0.85] flex flex-col md:flex-row items-center justify-center md:gap-4">
        <span className="opacity-90">CONSULTAS</span>
        <span className="text-hult-pink text-6xl md:text-8xl">ONLINE</span>
      </h2>

      <div 
        className="relative w-full max-w-3xl bg-[#090909] border border-white/10 shadow-2xl overflow-hidden rounded-lg z-10 flex flex-col h-[500px] cursor-text"
        onClick={focusInput}
      >
        {/* Terminal Header */}
        <div className="bg-[#111] px-4 py-3 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="text-gray-500 text-xs flex items-center gap-2">
            <SquareTerminal size={12} /> HULT_SHELL — zsh — 80x24
          </div>
        </div>

        {/* Terminal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 font-mono text-base md:text-lg space-y-2" ref={scrollRef}>
          {history.map((msg) => (
            <div key={msg.id} className="w-full break-words">
              {msg.type === "user" ? (
                <div className="flex items-start gap-2 text-white">
                  <span className="text-hult-pink shrink-0">guest@hult:~$</span>
                  <span>{msg.content}</span>
                </div>
              ) : (
                <div className="flex items-start gap-2 text-green-400 pl-0 mt-1 mb-4">
                  <span className="shrink-0 opacity-50">{">"}</span>
                  <div className="w-full">{msg.content}</div>
                </div>
              )}
            </div>
          ))}
          
          {(isTyping || isLoading) && (
             <div className="flex items-start gap-2 text-green-400 mt-1">
                 <span className="shrink-0 opacity-50">{">"}</span>
                 <span className="animate-pulse">
                     <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mx-0.5 animate-bounce [animation-delay:-0.3s]"></span>
                     <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mx-0.5 animate-bounce [animation-delay:-0.15s]"></span>
                     <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mx-0.5 animate-bounce"></span>
                 </span>
             </div>
          )}

          {/* Active Input Line */}
          {!isTyping && !isLoading && (
            <div className="flex items-start gap-2 text-white mt-2">
                <span className="text-hult-pink shrink-0">guest@hult:~$</span>
                <div className="relative flex-1 flex items-center gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            if (!hasInteracted) setHasInteracted(true);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="w-full bg-transparent border-none outline-none text-white font-mono p-0 focus:ring-0 placeholder:text-white/20"
                    />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSend(inputValue);
                        }}
                        className={`md:hidden p-1.5 transition-colors ${inputValue.trim() ? "text-hult-pink hover:text-white cursor-pointer" : "text-gray-600 cursor-not-allowed opacity-50"}`}
                        disabled={!inputValue.trim()}
                    >
                        <Send size={22} />
                    </button>
                </div>
            </div>
          )}
        </div>


      </div>
    </section>
  );
};

export default FAQ;
