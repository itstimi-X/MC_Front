// 서버에서 데이터를 가져오는 함수
async function fetchData() {
  const url = 'https://13.125.206.124:8443/api/mbti/chart';
  const token = localStorage.getItem('token');  // 로컬 스토리지에서 토큰 가져오기

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token  // 헤더에 토큰 추가
    }
  });

  const data = await response.json();

  const chartData = [];
  const chartLabels = [];

  for (let item of data) {
    const ePercent = item.e_percent;
    const nPercent = item.n_percent;
    const tPercent = item.t_percent;
    const jPercent = item.j_percent;

    // 각 축에 대한 점수를 계산합니다.
    const eScore = ePercent;
    const iScore = 100 - ePercent;
    const nScore = nPercent;
    const sScore = 100 - nPercent;
    const tScore = tPercent;
    const fScore = 100 - tPercent;
    const jScore = jPercent;
    const pScore = 100 - jPercent;

    // 차트 데이터에 변환된 점수를 추가합니다.
    chartData.push([iScore, eScore, sScore, nScore, fScore, tScore, pScore, jScore]);


    // 라벨 데이터 추가
    const dateLabel = item.reg_date.split('T')[0];
    const resultLabel = item.result_mbti;
    chartLabels.push(`${dateLabel} (${resultLabel})`);
  }

  drawChart(chartData, chartLabels);
}

// 데이터를 가져와 차트를 그리는 함수
function drawChart(data, labels) {
  const datasets = [];
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];

  for (let i = 0; i < data.length; i++) {
    datasets.push({
      label: labels[i],
      data: data[i],
      backgroundColor: colors[i % colors.length],
      borderColor: colors[i % colors.length],
      borderWidth: 1,
      fill: '-1'
    });
  }

  const ctx = document.getElementById('mbtiChart').getContext('2d');
  const myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['I', 'E', 'S', 'N', 'F', 'T', 'P', 'J'],
      datasets: datasets
    },
    options: {
      scale: {
        ticks: {
          beginAtZero: true,
          max: 100,
          stepSize: 10
        }
      }
    }
  });
}

fetchData();  // 페이지 로드 시 fetchData 호출

document.querySelector('.new-mbti-btn').addEventListener('click', function() {
  window.location.href = "/mbti-record";
});

document.querySelector('.inactive-tab').addEventListener('click', function() {
  window.location.href = '/mbti-latest';
});
