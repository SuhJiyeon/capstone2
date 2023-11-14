import React, { useState } from "react";

export const fetchSignUp = async ({ username, name, nickname, email, password }) => {
  const response = await fetch("https://www.assac.shop/api/user/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      name,
      nickname,
      email,
      password,
    }),
  });

  if (response.ok) {
    console.log("회원가입이 완료되었습니다.");
  } else {
    throw new Error("회원가입에 실패했습니다.");
  }
};

const SignForm = () => {
  const [account, setAccount] = useState({
    username: "",
    name: "",
    nickname: "",
    email: "",
    password: "",
  });

  const onChangeAccount = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitAccount = async () => {
    try {
      await fetchSignUp(account);
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <div>
      <input
        name="username"
        type="text"
        placeholder="아이디"
        value={account.username}
        onChange={onChangeAccount}
      />
      <input
        name="name"
        type="text"
        placeholder="이름"
        value={account.name}
        onChange={onChangeAccount}
      />
      <input
        name="nickname"
        type="text"
        placeholder="닉네임"
        value={account.nickname}
        onChange={onChangeAccount}
      />
      <input
        name="email"
        type="email"
        placeholder="이메일"
        value={account.email}
        onChange={onChangeAccount}
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        value={account.password}
        onChange={onChangeAccount}
      />
      <button onClick={onSubmitAccount}>회원가입완료</button>
    </div>
  );
};

export default SignForm;
