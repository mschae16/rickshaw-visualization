// const loadData = () => {
//   fetch('/api/v1/load_times')
//     .then(response => {
//       if (response.status !== 200) {
//         console.log(response);
//       }
//       return response;
//     })
//     .then(response => response.json())
//     .then(parsedResponse => {
//       const unpackData = (array, key) => {
//         return array.map(obj => Object.assign({}, { x: Date.parse(obj['time']), y: obj[key] }))
//       };
//
//       const palette = new Rickshaw.Color.Palette({ scheme: 'colorwheel' });
//       const graph = new Rickshaw.Graph({
//         element: document.querySelector('#chart'),
//         width: 1200,
//         height: 640,
//         renderer: 'line',
//         series: [
//           {
//             name: 'System load1',
//             data: unpackData(parsedResponse, 'mean_load1'),
//             color: palette.color()
//           },
//           {
//             name: 'System load5',
//             data: unpackData(parsedResponse, 'mean_load5'),
//             color: palette.color()
//           },
//           {
//             name: 'System load15',
//             data: unpackData(parsedResponse, 'mean_load15'),
//             color: palette.color()
//           }
//         ]
//       });
//
//       const xAxis = new Rickshaw.Graph.Axis.Time({
//         graph: graph,
//         ticksTreatment: 'glow',
//         timeFixture: new Rickshaw.Fixtures.Time.Local()
//       });
//
//       const yAxis = new Rickshaw.Graph.Axis.Y({
//         element: document.getElementById('y-axis'),
//         graph: graph,
//         orientation: 'left',
//         tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
//       });
//
//       const legend = new Rickshaw.Graph.Legend( {
//         element: document.getElementById('legend'),
//         graph: graph
//       });
//
//       const offsetForm = document.getElementById('offset-form');
//       offsetForm.addEventListener('change', (e) => {
//         const offsetMode = e.target.value;
//
//         if (offsetMode == 'lines') {
//                 graph.setRenderer('line');
//                 graph.offset = 'zero';
//         } else {
//                 graph.setRenderer('stack');
//                 graph.offset = offsetMode;
//         }
//         graph.render();
//       }, false);
//
//       return graph.render();
//     })
//     .catch( error => console.log(error) );
// }

// document.addEventListener('DOMContentLoaded', loadData);

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
