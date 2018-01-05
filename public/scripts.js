// const loadData = () => {
//   fetch('/api/v1/usage')
//     .then( response => {
//       if (response.status !== 200) {
//         console.log(response);
//       }
//       return response;
//     })
//     .then(response => response.json())
//     .then(parsedResponse => {
//       const unpackData = (arr, key) => {
//         return arr.map(obj => obj[key])
//       }
//       const firstTrace = {
//         type: 'scatter',
//         mode: 'lines',
//         name: 'Mean User Usage',
//         x: unpackData(parsedResponse, 'time'),
//         y: unpackData(parsedResponse, 'mean_usage_user'),
//         line: {color: '#17BECF'}
//       }
//       const secondTrace = {
//         type: "scatter",
//         mode: "lines",
//         name: 'Mean System Usage',
//         x: unpackData(parsedResponse, 'time'),
//         y: unpackData(parsedResponse, 'mean_usage_system'),
//         line: {color: '#7F7F7F'}
//       }
//       const data = [firstTrace, secondTrace];
//       const layout = {
//         title: 'Local CPU Usage',
//       };
//       return Plotly.newPlot('graphs-container', data, layout);
//     })
//     .catch( error => console.log(error) );
// }

// $(window).on('load', loadData);

var seriesData = [ [], [], [] ];
var random = new Rickshaw.Fixtures.RandomData(150);

for (var i = 0; i < 150; i++) {
  random.addData(seriesData);
}

var palette = new Rickshaw.Color.Palette({ scheme: 'colorwheel' });

var graph = new Rickshaw.Graph({
  element: document.querySelector('.graphs-container'),
  width: 900,
  height: 500,
  renderer: 'area',
  stroke: true,
  preserve: true,
  series: [
    {
      color: palette.color(),
      data: seriesData[0],
      name: 'Moscow'
    },
    {
      color: palette.color(),
      data: seriesData[1],
      name: 'Shanghai'
    },
    {
      color: palette.color(),
      data: seriesData[2],
      name: 'Amsterdam'
    }
  ]
});

graph.render();

var preview = new Rickshaw.Graph.RangeSlider({
  graph: graph,
  element: document.getElementById('preview')
});

var hoverDetail = new Rickshaw.Graph.HoverDetail({
  graph: graph,
  xFormatter: function(x) {
    return new Date( x * 1000).toString();
  }
});

var legend = new Rickshaw.Graph.Legend({
  graph: graph,
  element: document.getElementById('legend')
});

var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
  graph: graph,
  legend: legend
});

var order = new Rickshaw.Graph.Behavior.Series.Order({
  graph: graph,
  legend: legend
});

var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
  graph: graph,
  legend: legend
});

var smoother = new Rickshaw.Graph.Smoother({
  graph: graph,
  element: document.getElementById('smoother')
});

var ticksTreatment = 'glow';

var xAxis = new Rickshaw.Graph.Axis.Time({
  graph: graph,
  ticksTreatment: ticksTreatment,
  timeFixture: new Rickshaw.Fixtures.Time.Local()
});

xAxis.render();

var yAxis = new Rickshaw.Graph.Axis.Y({
  graph: graph,
  ticksTreatment: ticksTreatment,
  tickFormat: Rickshaw.Fixtures.Number.formatKMBT
});

yAxis.render();

var controls = new RenderControls({
  graph: graph,
  element: document.querySelector('form')
});

// add some data every so often

setInterval( function() {
  random.removeData(seriesData);
  random.addData(seriesData);
  graph.update();
}, 3000);

var previewXAxis = new Rickshaw.Graph.Axis.Time({
  graph: preview.previews[0],
  timeFixture: new Rickshaw.Fixtures.Time.Local(),
  ticksTreatment: ticksTreatment
});

previewXAxis.render();
