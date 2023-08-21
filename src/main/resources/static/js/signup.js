document.getElementById('nickname').addEventListener('blur', function() {
  const nickname = this.value;
  const apiEndpoint = 'https://localhost:8443/api/users/check-nickname/' + encodeURIComponent(nickname);

  fetch(apiEndpoint, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    const errorElement = document.getElementById('nickname-duplicated');

    if (data) {
      errorElement.style.display = 'block';
      this.classList.add('is-invalid');
    } else {
      errorElement.style.display = 'none';
      this.classList.remove('is-invalid');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
document.getElementById('email').addEventListener('blur', function() {
  const email = this.value;
  const apiEndpoint = 'https://localhost:8443/api/users/check-email/' + encodeURIComponent(email);
  const errorElement = document.getElementById('email-error');
  const emailVerificationButton = document.getElementById('email-verification-button');

  const isEmailFormat = (asValue) => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
  };

  if (!email || !isEmailFormat(email)) {
    errorElement.textContent = "이메일 형식이 올바르지 않습니다. 다시 입력해주세요.";
    errorElement.style.display = 'block';
    this.classList.add('is-invalid');
    emailVerificationButton.disabled = true;
    emailVerificationButton.classList.add('btn-disabled');
    return;
  }

  fetch(apiEndpoint, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    if (data) {
      errorElement.textContent = "이미 가입된 이메일이에요🥲";
      errorElement.style.display = 'block';
      this.classList.add('is-invalid');
      emailVerificationButton.disabled = true;
      emailVerificationButton.classList.add('btn-disabled');
    } else {
      errorElement.style.display = 'none';
      this.classList.remove('is-invalid');
      emailVerificationButton.disabled = false;
      emailVerificationButton.classList.remove('btn-disabled');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});


document.getElementById('email-verification-button').addEventListener('click', function(e) {
    e.preventDefault();

  // 인증번호 입력창 활성화
  document.getElementById('authNum').disabled = false;

  // 이메일 입력창 비활성화
  document.getElementById('email').disabled = true;

  // 이메일 발송 함수 호출
  emailSend();

});

function emailSend(){
    let clientEmail = document.getElementById('email').value;
    let emailYN = isEmail(clientEmail);  // 이메일 형식이 맞는지 검사
    const emailVerificationButton = document.getElementById('email-verification-button');

  console.log('입력 이메일: ' + clientEmail);

    if(emailYN) {
        alert('이메일 형식입니다.');

        $.ajax({
            type:"POST",
            url:"https://localhost:8443/api/email-verification/send",   //컨트롤러에서 받을 url
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({email: clientEmail}), // JSON 형태로 데이터 전송
            xhrFields: {
              withCredentials: true
          },
      
            success: function(data){
              if(data.status == 200) {
                  alert('인증 코드가 전송되었습니다 ! 🥳');
                  // 버튼 텍스트 변경 및 비활성화
                  emailVerificationButton.textContent = "발송완료";
                  emailVerificationButton.disabled = true;
                  emailVerificationButton.classList.add('btn-disabled');
              } else {
                  // 추가: 서버로부터의 오류 메시지를 사용하여 문제를 알림
                  alert('이메일 전송 실패: ' + data.message);
              }
          },
          error: function(jqXHR, textStatus, errorThrown){
              // 추가: 서버 응답의 오류 메시지 혹은 기본 메시지를 출력
              alert('이메일 전송 중 오류 발생: ' + (jqXHR.responseJSON && jqXHR.responseJSON.message) || textStatus);
          }
        });
    } else {
        alert('이메일 형식에 알맞게 입력해주세요');
    }
}

function isEmail(asValue) {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴  
}

document.getElementById('authNum').addEventListener('input', function() {
  const authNum = this.value;
  const verifyButton = document.getElementById('verify-button');
  const errorElement = document.getElementById('authNum-error');

  // 6자리 정확하게 입력되었는지 확인
  if (authNum.length === 6 && !isNaN(authNum)) {
    verifyButton.disabled = false;
    errorElement.style.display = 'none';
    this.classList.remove('is-invalid');
  } else {
    verifyButton.disabled = true;
  }
});

document.getElementById('authNum').addEventListener('blur', function() {
  const authNum = this.value;
  const errorElement = document.getElementById('authNum-error');

  // 6자리가 아닌 경우 에러 메시지 표시
  if (authNum.length !== 6 || isNaN(authNum)) {
    errorElement.textContent = "6자리의 인증번호를 입력해주세요.";
    errorElement.style.display = 'block';
    this.classList.add('is-invalid');
  }
});

document.getElementById('verify-button').addEventListener('click', function(e) {
  e.preventDefault();
  emailCertification();
});

function emailCertification(){
  let clientEmail = document.getElementById('email').value;
  let authNum = document.getElementById('authNum').value;
  const verifyButton = document.getElementById('verify-button');

  console.log('입력 이메일: ' + clientEmail);
  console.log('인증 코드: ' + authNum);

  $.ajax({
    type:"POST",
    url:"https://localhost:8443/api/email-verification/check",   //컨트롤러에서 받을 url
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({email: clientEmail, authNum: authNum}), // JSON 형태로 데이터 전송
    xhrFields: {
      withCredentials: true
  },

    success: function(result){
      console.log(result);
      if(result) {

          alert('인증 성공');
          document.getElementById('certificationYN').value = true;
          clientEmail.onchange = function() {
            document.getElementById('certificationYN').value = false;
          }
        // 인증 완료 후 버튼 텍스트 변경 및 비활성화
        verifyButton.textContent = "인증 완료";
        verifyButton.disabled = true;
        verifyButton.classList.add('btn-disabled');

        // 인증 완료 후 인증번호 입력창 비활성화
        document.getElementById('authNum').disabled = true;

      } else {
          // 추가: 서버로부터의 오류 메시지를 사용하여 문제를 알림
          alert('인증 실패: ' + result.message);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      alert('인증 중 오류 발생: ' + (jqXHR.responseJSON && jqXHR.responseJSON.message) || textStatus);
    }
  });
}

document.getElementById("password").addEventListener("blur", function() {
  let password = document.getElementById("password").value;
  let regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regex.test(password)) {
    document.getElementById("passwordMessage").textContent = "좋은 비밀번호입니다!";
    document.getElementById("passwordMessage").className = "text-success";
    document.getElementById("password-confirm").disabled = false;
  } else {
    document.getElementById("passwordMessage").textContent = "비밀번호가 규칙에 맞지 않습니다. 다시 입력해주세요.";
    document.getElementById("passwordMessage").className = "text-danger";
    document.getElementById("password-confirm").disabled = true;
  }
});

document.getElementById("password-confirm").addEventListener("blur", function() {
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("password-confirm").value;
  if (password === confirmPassword) {
    document.getElementById("confirmMessage").textContent = "비밀번호가 일치합니다!";
    document.getElementById("confirmMessage").className = "text-success";
    // 비밀번호와 비밀번호 확인 입력창 비활성화
    document.getElementById("password").disabled = true;
    document.getElementById("password-confirm").disabled = true;

    // 비밀번호 일치 시 회원가입 버튼 활성화
    document.getElementById("signup-button").disabled = false;
  } else {
    document.getElementById("confirmMessage").textContent = "비밀번호가 일치하지 않습니다. 다시 입력해주세요.";
    document.getElementById("confirmMessage").className = "text-danger";
  }
});
document.getElementById("togglePassword").addEventListener("click", function() {
  let passwordInput = document.getElementById("password");
  let toggleButton = document.getElementById("togglePassword");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.innerHTML = '<i class="fa fa-eye-slash" aria-hidden="true"></i>';
  } else {
    passwordInput.type = "password";
    toggleButton.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';
  }
});

document.getElementById("toggleConfirmPassword").addEventListener("click", function() {
  let confirmPasswordInput = document.getElementById("password-confirm");
  let toggleButton = document.getElementById("toggleConfirmPassword");
  if (confirmPasswordInput.type === "password") {
    confirmPasswordInput.type = "text";
    toggleButton.innerHTML = '<i class="fa fa-eye-slash" aria-hidden="true"></i>';
  } else {
    confirmPasswordInput.type = "password";
    toggleButton.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';
  }
});

document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  signUp();
});

function signUp(){
  let nickname = document.getElementById('nickname').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  console.log('닉네임: ' + nickname);
  console.log('이메일: ' + email);
  console.log('비밀번호: ' + password);

  $.ajax({
    type:"POST",
    url:"https://localhost:8443/api/users/sign-up",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({nickname: nickname, email: email, password: password}),

    success: function(response){
      console.log(response);
      alert('회원가입 성공');
      // window.location.href = '/'; // 회원가입 성공 후 메인 페이지로 이동
    },
    error: function(jqXHR, textStatus, errorThrown){
      alert('회원가입 중 오류 발생: ' + (jqXHR.responseJSON && jqXHR.responseJSON.message) || textStatus);
    }
  });
}

