// document.getElementById('signup-form').addEventListener('submit', function(e) {
//     e.preventDefault();
//
//     const username = document.getElementById('username').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const passwordConfirm = document.getElementById('password-confirm').value;
//
//     if (password !== passwordConfirm) {
//         alert('비밀번호가 일치하지 않습니다.');
//         return;
//     }
//
//     const data = {
//         username: username,
//         email: email,
//         password: password
//     };
//
//     fetch('/signup', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert('회원가입 성공');
//             window.location.href = '/login';
//         } else {
//             alert('회원가입 실패');
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// });
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

document.getElementById('email-verification-button').addEventListener('click', function(e) {
    e.preventDefault();
    emailSend();
});

function emailSend(){
    let clientEmail = document.getElementById('email').value;
    let emailYN = isEmail(clientEmail);  // 이메일 형식이 맞는지 검사

    console.log('입력 이메일: ' + clientEmail);

    if(emailYN == true) {
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

document.getElementById('verify-button').addEventListener('click', function(e) {
  e.preventDefault();
  emailCertification();
});

function emailCertification(){
  let clientEmail = document.getElementById('email').value;
  let authNum = document.getElementById('authNum').value;

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
      if(result == true) {
          alert('인증 성공');
          document.getElementById('certificationYN').value = true;
          clientEmail.onchange = function() {
            document.getElementById('certificationYN').value = false;
          }
      } else {
          // 추가: 서버로부터의 오류 메시지를 사용하여 문제를 알림
          alert('인증 실패: ' + result.message);
      }
    }
  });
}


//   document.getElementById('email').addEventListener('blur', function() {
//     const email = this.value;
//     const apiEndpoint = 'https://myapi.com/check-email';
  
//     fetch(apiEndpoint, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email })
//     })
//     .then(response => response.json())
//     .then(data => {
//       const errorElement = document.getElementById('email-error');
  
//       if (data.exists) {
//         errorElement.style.display = 'block';
//         this.classList.add('is-invalid');
//       } else {
//         errorElement.style.display = 'none';
//         this.classList.remove('is-invalid');
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
//   });
  