// login.js

window.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.querySelector(".btn");
  const emailInput = document.querySelector("input[type='email']");
  const passwordInput = document.querySelector("input[type='password']");

  loginBtn.addEventListener("click", function () {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
      alert("이메일 또는 비밀번호를 입력해주세요.");
      return;
    }

    const payload = {
      email: email,
      password: password
    };

    fetch("https://localhost:8443/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // 성공적으로 로그인하면 토큰 값을 저장하거나 사용할 수 있습니다.
        localStorage.setItem("token", data.token); // 토큰을 로컬 스토리지에 저장
        alert("로그인에 성공하였습니다.");
        // 로그인 성공 후 최근 mbti 조회 페이지로 이동
        window.location.href = '/mbti-latest';
      } else {
        alert(data.errorMessage || "로그인에 실패하였습니다.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("로그인 중 문제가 발생하였습니다.");
    });
  });
});
