"use client";
import { useState } from "react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  MoveRight,
} from "lucide-react";
import Link from "next/link";

type SupportHeaderProps = {
  backgroundImage: string;
};

const Support: React.FC<SupportHeaderProps> = ({ backgroundImage }) => {
  const [message, setMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <section
      className="relative h-screen text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(16,16,20,0.25), rgba(16,16,20,1)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full mx-auto px-4 justify-center items-center space-y-16 ">
        <div className="w-full flex justify-end pt-5">
          <div className="bg-[#180C2B]/80 text-[15px] justify-center flex  backdrop-blur-xl rounded-sm px-4 py-2   max-w-sm  items-center gap-3 shadow-lg ">
            Server status:{" "}
            <Check className="w-4 h-4 rounded-full bg-[#5BD865] text-[#180C2B] p-0.5" />
            <p className="text-[#5BD865] text-sm font-semibold">
              <Link href="/status">All systems operational</Link>
            </p>
          </div>
        </div>
        <div className="mb-8 flex justify-center items-center">
          <div className="bg-[#180C2B]/80 justify-center flex font-medium backdrop-blur-xl rounded-lg p-5  max-w-[780px]  items-start gap-5 shadow-lg ">
            <AlertCircle className="w-5.5 h-5.5 mt-2 text-yellow-300/80" />

            <div className="flex-1">
              <p
                className={`text-sm  text-gray-300 ${alertOpen ? "" : "line-clamp-2"}`}
              >
                Due to the large number of inquiries, our responses may take
                longer than usual. We will do our best to reply as quickly as
                possible. Thank you for your patience!
              </p>
            </div>

            <button
              onClick={() => setAlertOpen(!alertOpen)}
              className="ml-2"
              aria-label="Expand alert"
            >
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  alertOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
        <div className="text-center mb-10">
          <p className="text-xl  tracking-wide  mb-2">Epic Games Support</p>

          <h1 className="text-4xl md:text-5xl font-bold">How can we help?</h1>
        </div>{" "}
        <div className="w-full flex gap-3 justify-center items-center flex-row">
          {" "}
          <div className="w-full md:w-[780px] bg-[#180C2B]/30 backdrop-blur-lg rounded-md text-sm font-medium py-3 px-6 flex items-center gap-3 border border-gray-400/70 shadow-lg ">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your problem here"
              rows={1}
              className="flex-1 bg-transparent resize-none outline-none text-white placeholder-gray-400 max-h-40 overflow-y-auto"
            />
          </div>
          <button
            className="bg-[#251e48] justify-center flex font-medium backdrop-blur-xl rounded-full p-3"
            aria-label="Send"
          >
            <MoveRight className="w-4 h-5 text-gray-400" />
          </button>
        </div>
        <div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            By continuing, you agree to our{" "}
            <a
              href="https://www.epicgames.com/site/en-US/tos"
              target="_blank"
              className="underline text-white"
            >
              Terms
            </a>{" "}
            and acknowledge our{" "}
            <a
              href="https://www.epicgames.com/site/en-US/privacypolicy"
              target="_blank"
              className="underline text-white"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default Support;
