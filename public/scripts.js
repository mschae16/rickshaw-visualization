const loadData = () => {
  fetch('/api/v1/usage')
    .then( response => {
      if (response.status !== 200) {
        console.log(response);
      }
      return response;
    })
    .then(response => response.json())
    .then(parsedResponse => {
      const unpackData = (arr, key) => {
        return arr.map(obj => obj[key])
      }
      const firstTrace = {
        type: 'scatter',
        mode: 'lines',
        name: 'Mean User Usage',
        x: unpackData(parsedResponse, 'time'),
        y: unpackData(parsedResponse, 'mean_usage_user'),
        line: {color: '#17BECF'}
      }
      const secondTrace = {
        type: "scatter",
        mode: "lines",
        name: 'Mean System Usage',
        x: unpackData(parsedResponse, 'time'),
        y: unpackData(parsedResponse, 'mean_usage_system'),
        line: {color: '#7F7F7F'}
      }
      const data = [firstTrace, secondTrace];
      const layout = {
        title: 'Local CPU Usage',
      };
      return Plotly.newPlot('graphs-container', data, layout);
    })
    .catch( error => console.log(error) );
}

// $(window).on('load', loadData);

var data = [ { x: 1910, y: 92228531 }, { x: 1920, y: 106021568 }, { x: 1930, y: 123202660 }, { x: 1940, y: 132165129 }, { x: 1950, y: 151325798 }, { x: 1960, y: 179323175 }, { x: 1970, y: 203211926 }, { x: 1980, y: 226545805 }, { x: 1990, y: 248709873 }, { x: 2000, y: 281421906 }, { x: 2010, y: 308745538 } ];

var graph = new Rickshaw.Graph( {
        element: document.querySelector("#graphs-container"),
        width: 580,
        height: 250,
        series: [ {
                color: 'steelblue',
                data: data
        } ]
} );

graph.render();
