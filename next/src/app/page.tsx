"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface DataType {
  role: string;
  content: string;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("여기에 대답 표시");
  const [testQuestion, setTestQuestion] = useState("");
  const [testAnswer, setTestAnswer] = useState([
    {
      role: "system",
      content:
        "넌 블로그를 제작해주는 assistant야 블로그를 작성하기 위해 날짜와 음식을 받아 분위기를 포함해 글을 작성해 주고 날짜와 음식이 없으면 날짜와 음식을 입력해 달라고 요청해 그리고 user에게 그 외의 요청이 오면 전 블로그 제작 assestant입니다. 라고 대답해",
    },
  ]);
  const [picQuestion, setPicQuestion] = useState("");
  const [picAnswer, setPicAnswer] = useState("");

  // 사진
  const handleOnPicSubmit = (e: any) => {
    e.preventDefault();
    fetch(
      `http://localhost:4000/gpt-service/photo-analysis?question=${encodeURIComponent(
        picQuestion
      )}`
    )
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        // console.log(data);
        setPicAnswer(data);
      });
  };

  // 글 작성 fine-tuning model
  const test = (e: any) => {
    e.preventDefault();
    let data = {
      role: "user",
      content: testQuestion,
    };
    const messageArray: DataType[] = [];
    testAnswer.map((item) => {
      messageArray.push(item);
    });
    messageArray.push(data);
    fetch(
      `http://localhost:4000/gpt-service/answer?data=${encodeURIComponent(
        JSON.stringify(messageArray)
      )}`
    )
      .then((res) => {
        return res.json();
      })
      .then((item: DataType) => {
        // 받아온 데이터 타입도 DataType과 동일
        messageArray.push(item);
        setTestAnswer(messageArray);
      });
    setTestQuestion("");
  };

  return (
    <div className="flex flex-col space-y-5 px-10 py-10 h-screen">
      <h1>opneAI</h1>
      <div className="flex flex-col space-y-5">
        <form onSubmit={test} className="space-x-5">
          <input
            type="text"
            value={testQuestion}
            onChange={(e) => setTestQuestion(e.target.value)}
            className="text-black"
          />
          <button type="submit" className="bg-gray-500 w-20">
            글 작성
          </button>
        </form>

        <div>
          {testAnswer.slice(1).map((data, index) => (
            <div className="flex flex-row space-x-2" key={index}>
              <h1>{data.role}:</h1>
              <h1>{data.content}</h1>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          setTestAnswer([
            {
              role: "system",
              content:
                "넌 블로그를 제작해주는 assistant야 블로그를 작성하기 위해 날짜와 음식을 받아 분위기를 포함해 글을 작성해 주고 날짜와 음식이 없으면 날짜와 음식을 입력해 달라고 요청해 그리고 user에게 그 외의 요청이 오면 전 블로그 제작 assestant입니다. 라고 대답해",
            },
          ]);
        }}
        className="w-20 bg-gray-500"
      >
        초기화
      </button>

      <div className="pt-10 space-y-5">
        <h1>사진분석</h1>
        <Image src={"/pic1.png"} width={450} height={200} alt="restaurant" />
        <form onSubmit={handleOnPicSubmit} className="space-x-5">
          <input
            type="text"
            value={picQuestion}
            onChange={(e) => setPicQuestion(e.target.value)}
            className="text-black"
          />
          <button className="w-20 bg-gray-500" type="submit">
            <h1>분석</h1>
          </button>
        </form>
        <h1>{picAnswer}</h1>
      </div>
    </div>
  );
}
