var d3 = require("d3");

d3.csv('financials.csv', function(data) {
  console.log(data)
  // Variables
  var body = d3.select('#chart')
	var margin = { top: 50, right: 50, bottom: 50, left: 80 }
	var h = 1000 - margin.top - margin.bottom
	var w = 1000 - margin.left - margin.right
	// Scales
  var colorScale = d3.scale.category20();
  var xScale = d3.scale.linear()
    .domain([
    	d3.min(data,function (d) { return parseInt(d.price) }),
    	d3.max(data,function (d) { return parseInt(d.price) })
    	])
    .range([0,w])
    .clamp(true);
  var yScale = d3.scale.linear()
    .domain([
    	d3.min(data,function (d) { return parseInt(d.cap)/1000000 }),
    	d3.max(data,function (d) { return parseInt(d.cap)/1000000 })
    	])
    .range([h,0])
    .clamp(true);
	// SVG
	var svg = body.append('svg')
	    .attr('height',h + margin.top + margin.bottom)
	    .attr('width',w + margin.left + margin.right)
	  .append('g')
	    .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
	// X-axis
	var xAxis = d3.svg.axis()
	  .scale(xScale)
	  .ticks(20)
	  .orient('bottom')
  // Y-axis
	var yAxis = d3.svg.axis()
	  .scale(yScale)
	  .ticks(10)
	  .orient('left')
  // Circles

  d3.selectAll(".secFilter").on("change", update);
  update();
  function update() {
    var choices = [];
    d3.selectAll(".secFilter").each(function(d) {
      cb = d3.select(this);
      if(cb.property("checked")){
        choices.push(cb.property("value"));
      }
    });
    if(choices.length > 0){
      newData = data.filter(function(d, i){ return choices.includes(d.sector);});
    } else {
      newData = data;
    }

  circles = svg.selectAll('circle').data(newData);

      circles.enter()
    .append('circle')
      .attr('cx',function (d) { return xScale(d.price) })
      .attr('cy',function (d) { return yScale(parseInt(d.cap)/1000000) })
      .attr('r','10')
      .attr('fill',function (d,i) { return colorScale(i) })
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(300)
          .attr('r',20)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(300)
          .attr('r',10)
      })
    .append('title') // Tooltip
      .text(function (d) { return d.name +
                            '\nTicker: ' + d.symbol +
                            '\nSector: ' + d.sector +
                           '\nMarket Cap: $' + d.cap +
                           '\nPrice/share: $' + d.price });

      circles.exit().remove();
        }


  // X-axis
  svg.append('g')
      .attr('class','axis')
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxis)
    .append('text') // X-axis Label
      .attr('class','label')
      .attr('y',-10)
      .attr('x',w)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Price')
  // Y-axis
  svg.append('g')
      .attr('class', 'axis')
      .call(yAxis)
    .append('text') // y-axis Label
      .attr('class','label')
      .attr('transform','rotate(-90)')
      .attr('x',0)
      .attr('y',5)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Market Cap / Million')
})
