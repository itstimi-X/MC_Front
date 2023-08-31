document.addEventListener('DOMContentLoaded', function() {
  // 토큰 가져오기
  const token = localStorage.getItem('token');

  // MBTI 데이터 가져오기
  fetch('https://localhost:8443/api/mbti/latest', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(response => {
    if (!response.ok) { // 에러 처리
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (!data || data.length === 0) { // 데이터가 없는 경우
      document.querySelector('.no-mbti-message').style.display = "block";
      document.querySelector('.mbti-display').style.display = "none";  // MBTI 그래프 숨기기
    } else {
      document.querySelector('.mbti-date').innerText = "등록일 : " + data.reg_date.split('T')[0];
      document.querySelector('.mbti-result').innerText = data.result_mbti;

    let eValue = data.e_percent;
    let iValue = 100 - eValue;
    let nValue = data.n_percent;
    let sValue = 100 - nValue;
    let tValue = data.t_percent;
    let fValue = 100 - tValue;
    let jValue = data.j_percent;
    let pValue = 100 - jValue;

    // E/I
    if(eValue === 50){
      document.querySelector('.e-bar').style.width = '50%';
      document.querySelector('.i-bar').style.width = '50%';
    } else if(eValue > 50){
      document.querySelector('.e-bar').style.width = `${eValue}%`;
      document.querySelector('.i-bar').style.width = '0%';
    } else {
      document.querySelector('.e-bar').style.width = '0%';
      document.querySelector('.i-bar').style.width = `${100 - eValue}%`;
      document.querySelector('.i-bar').style.right = '0';
    }

// N/S
    if(nValue === 50){
      document.querySelector('.n-bar').style.width = '50%';
      document.querySelector('.s-bar').style.width = '50%';
    } else if(nValue > 50){
      document.querySelector('.n-bar').style.width = `${nValue}%`;
      document.querySelector('.s-bar').style.width = '0%';
    } else {
      document.querySelector('.n-bar').style.width = '0%';
      document.querySelector('.s-bar').style.width = `${100 - nValue}%`;
      document.querySelector('.s-bar').style.right = '0';
    }

// T/F
    if(tValue === 50){
      document.querySelector('.t-bar').style.width = '50%';
      document.querySelector('.f-bar').style.width = '50%';
    } else if(tValue > 50){
      document.querySelector('.t-bar').style.width = `${tValue}%`;
      document.querySelector('.f-bar').style.width = '0%';
    } else {
      document.querySelector('.t-bar').style.width = '0%';
      document.querySelector('.f-bar').style.width = `${100 - tValue}%`;
      document.querySelector('.f-bar').style.right = '0';
    }

// J/P
    if(jValue === 50){
      document.querySelector('.j-bar').style.width = '50%';
      document.querySelector('.p-bar').style.width = '50%';
    } else if(jValue > 50){
      document.querySelector('.j-bar').style.width = `${jValue}%`;
      document.querySelector('.p-bar').style.width = '0%';
    } else {
      document.querySelector('.j-bar').style.width = '0%';
      document.querySelector('.p-bar').style.width = `${100 - jValue}%`;
      document.querySelector('.p-bar').style.right = '0';
    }


    document.getElementById('e-percentage').innerText = `${eValue}%`;
    document.getElementById('i-percentage').innerText = `${iValue}%`;
    document.getElementById('n-percentage').innerText = `${nValue}%`;
    document.getElementById('s-percentage').innerText = `${sValue}%`;
    document.getElementById('t-percentage').innerText = `${tValue}%`;
    document.getElementById('f-percentage').innerText = `${fValue}%`;
    document.getElementById('j-percentage').innerText = `${jValue}%`;
    document.getElementById('p-percentage').innerText = `${pValue}%`;

      document.querySelector('.no-mbti-message').style.display = "none";
      document.querySelector('.mbti-display').style.display = "block";  // MBTI 그래프 보이기
    }
  })
  .catch(error => {
    console.error('Error fetching MBTI data:', error);
    // 에러 처리 및 사용자에게 에러 메시지 표시
    alert('등록된 MBTI 결과가 없습니다. MBTI 결과를 등록해주세요.');
    window.location.href = "/mbti-record";
  });
});

document.querySelector('.new-mbti-btn').addEventListener('click', function() {
  window.location.href = "/mbti-record";
});
