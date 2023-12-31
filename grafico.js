
import Chart from 'chart.js/auto';







const baseUrl = 'https://api.themoviedb.org/3/movie/popular?';
const accessKey = 'api_key=a8363138fc36bbcadc4ed748ae7ccc8f';
const language = 'language=es-COL';

export const generateExAPIChart = async () => {
  try {
    // Generación de datos
    const url = new URL(`${baseUrl}${accessKey}&${language}`);
    const response = await fetch(url.toString());
    const dataResponse = await response.json();
    console.log('Conexión correcta', dataResponse);

    const filteredData = dataResponse.results
      .sort(function (a, b) {
        return b.vote_count - a.vote_count;
      })
      .slice(0, 10);

    // Generación de gráfica
    const myChartAPIArea = document.querySelector('#mychart');
    if (myChartAPIArea) {
      new Chart(myChartAPIArea, {
        type: 'bar',
        data: {
          labels: filteredData.map((row) => row.title),
          datasets: [
            {
              label: 'Top 10 películas más votadas',
              data: filteredData.map((row) => row.vote_count),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
  }
};





