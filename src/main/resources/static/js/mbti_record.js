function calculateValue(input1, input2) {
  let value1 = document.getElementById(input1).value;
  if (value1) {
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
  }).then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
