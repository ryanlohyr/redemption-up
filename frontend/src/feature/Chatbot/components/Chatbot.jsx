"use client";

import { useChat } from "ai/react";
import React, { useEffect, useRef, useState } from "react";
import { Mic, X, Languages, ChevronDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BeatLoader from "react-spinners/BeatLoader";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ChatHeader from "./chatbotComponents/ChatHeader";
import { ChatBubble } from "./chatbotComponents/ChatBubble";
import ChatOptions from "./chatbotComponents/ChatOptions";
import { v4 as uuidv4 } from "uuid";

import { useLazyGetChatQuery } from "@/services/chatAPI";
import ChatInput from "./chatbotComponents/ChatInput";

export default function Chatbot() {
  const [language, setLanguage] = React.useState("english");
  const [open, setOpen] = useState(false);
  const [trigger, { data: chatData, isError }] = useLazyGetChatQuery();
  const [isNextChatLoading, setIsNextChatLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [chatArray, setChatArray] = useState([]);
  const sendButtonPressed = (text) => {
    if (!text) return;
    setChatArray((prevChatArray) => {
      return [...prevChatArray, { isMe: true, content: text }];
    });
    trigger({query: text, language: language});
    setIsNextChatLoading(true);
  };

  const renderHeading = () => {
    switch (language) {
      case 'chinese':
        return '您的聊天机器人助手';
      case 'melayu':
        return 'Pembantu chatbot anda';
      case 'tamil':
        return 'உங்கள் சாட்போட் உதவியாளர்';
      default: // English
        return 'Your chatbot assistant';
    }
  };

  const renderParagraph = () => {
    switch (language) {
      case 'chinese':
        return '您可以询问任何问题，从建议的退休计划到如何提高收入。';
      case 'melayu':
        return 'Anda boleh bertanya apa-apa sahaja daripada rancangan persaraan yang disyorkan hingga cara meningkatkan pendapatan anda.';
      case 'tamil':
        return 'பரிந்துரைக்கப்பட்ட ஓய்வூதியத் திட்டங்கள் முதல் உங்கள் வருமானத்தை அதிகரிப்பது வரை நீங்கள் ஏதேனும் கேட்கலாம்.';
      default: // English
        return 'You can ask anything ranging from suggested retirement plans to how you can boost your income.';
    }
  };

  const renderOptions = () => {
    switch (language) {
      case 'chinese':
        return [
          '哪些课程可以提高我的金融知识？',
          '债券安全吗？',
        ];
      case 'melayu':
        return [
          'Kursus apa yang boleh meningkatkan literasi kewangan saya?',
          'Adakah bon selamat?',
        ];
      case 'tamil':
        return [
          'எந்த பாடங்கள் என் நிதி அறிவை மேம்படுத்தலாம்?',
          'பாண்டுகள் பாதுகாப்பானவையா?',
        ];
      default: // English
        return [
          'What courses can improve my financial literacy?',
          'Are bonds safe?',
        ];
    }
  };

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // Adjust delay as needed
  }, [chatArray]);

  useEffect(() => {
    // dont update chat array if no content
    if (!chatData?.content) return;
    setIsNextChatLoading(false);
    setChatArray((prevChatArray) => {
      return [
        ...prevChatArray,
        {
          isMe: chatData.isMe,
          content: chatData.content,
        },
      ];
    });
  }, [chatData]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <ChatHeader />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white max-w-[351px] p-[0px] border rounded-lg">
        <div className="flex justify-center items-center border rounded-lg bg-[#171924] relative py-[29px] ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="absolute left-[15px] p-[4px] bg-white border rounded-xl w-[50px] h-[40px] flex justify-center items-center">
                <Languages className="text-black " />
                <ChevronDown className="w-[21px] text-black" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-16 ml-10">
              <DropdownMenuLabel>Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={language}
                onValueChange={setLanguage}
              >
                <DropdownMenuRadioItem className="text-left" value="english">
                  English
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="melayu">
                  Bahasa Melayu
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="tamil">
                  தமிழ் (Tamil)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="chinese">
                  中文 (Chinese)
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <h2 className="text-white text-bold text-[18px] max-w-[210px] text-center" >
            {renderHeading()}
          </h2>
          <div className="absolute right-8 top-8">
            <button
              onClick={() => {
                setOpen(false);
              }}
            >
              <X className="text-white" />
            </button>
          </div>
        </div>

        <ScrollArea className="mb-2 h-80 w-full text-black">
          {chatArray.length == 0 ? (
            <div className="text-[#BAB9B9] mt-[40px]  mx-auto text-center max-w-[284px]">
              <h2 className="font-bold text-[18px] ">{renderHeading()}</h2>
              <p className="text-[15px] mt-3">
                {renderParagraph()}
              </p>
              <ChatOptions
                options={renderOptions()}
                sendButtonPressed={sendButtonPressed}
              />
            </div>
          ) : (
            <div>
              {chatArray.map((chat) => {
                return (
                  <div
                    className={
                      !chat.isMe ? "transition animate-fade-in-down" : ""
                    }
                    key={uuidv4()}
                  >
                    <ChatBubble isMe={chat.isMe} content={chat.content} />
                  </div>
                );
              })}
              {isNextChatLoading && (
                <BeatLoader
                  className="ml-3"
                  size={10}
                  color="#171924"
                  speedMultiplier={0.5}
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>
        <ChatInput isNextChatLoading={isNextChatLoading} sendButtonPressed={sendButtonPressed} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
