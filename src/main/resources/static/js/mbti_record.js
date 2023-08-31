function calculateValue(input1, input2) {
  let value1 = document.getElementById(input1).value;

  if (value1) {
    if (value1 < 0 || value1 > 100) {
      alert("값은 0에서 100 사이여야 합니다.");
      document.getElementById(input1).value = "";
      return;
    }

    let value2 = 100 - value1;
    document.getElementById(input2).value = value2;
    document.getElementById(input1).disabled = true;
    document.getElementById(input2).disabled = true;
  }
  checkAllFieldsFilled();
}

function checkAllFieldsFilled() {
  let inputs = ['E', 'I', 'N', 'S', 'T', 'F', 'J', 'P'];
  for (let i = 0; i < inputs.length; i++) {
    if (!document.getElementById(inputs[i]).value) {
      return;
    }
  }
  document.getElementById('saveBtn').disabled = false;
}

function saveMBTI() {
  let data = {
    e_percent: parseInt(document.getElementById('E').value),
    n_percent: parseInt(document.getElementById('N').value),
    t_percent: parseInt(document.getElementById('T').value),
    j_percent: parseInt(document.getElementById('J').value),
  };

  const token = localStorage.getItem('token');

  fetch('https://localhost:8443/api/mbti/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert(data.message); // 성공시 alert 메시지 표시
      window.location.href = '/mbti-latest'; // mbti 결과 페이지로 이동
    } else {
      alert(data.message); // 실패시 alert 메시지 표시 (예: "Invalid Access Token")
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('요청 처리 중 오류가 발생했습니다.'); // 네트워크 오류나 기타 예외적인 상황에 대한 메시지
  });
}
