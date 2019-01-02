# stocks-data-visualization
[Live](http://caidading.com/stocks-data-visualization/)

### Background
This visulization is for the stock market. The first chart every circle represents a company, sorted by its market cap and stock price. The second chart is a line chart for Apple's historical price, also includes volume and average price.

### Functionality & MVP
with this visualization, users will be able to:
- [ ] filter by sectors and see all the stocks within these selected sectors on the graph
- [ ] hover cursor on individual circle to see detailed info
- [ ] choose to see different time horizon for the stock on the line chart(1w, 1m, 3m, 6m, 1y, 5y)
- [ ] move the cursor on the line to see the daily information about the stock 
- [ ] customize a specific time period by moving the boundries on the bottom indicator

### Architechture and Technologies
This project is implemented with the following technologies:

- `JavaScript`, `HTML`, `CSS` and `D3.js` 

![screenshot from 2019-01-01 22-13-56](https://user-images.githubusercontent.com/38970716/50579667-2fc43280-0e15-11e9-92a2-9d80b01ba8a7.png)

### Code Showcase
Create circle and append tooltip. Attach event listener for mouse over and mouse leave to add visual effect when user selects a circle
```Javascript
circles = svg.selectAll('circle').data(newData);

    circles.enter()
    .append('circle')
      .attr('cx',function (d) { return xScale(d.price) })
      .attr('cy',function (d) { return yScale(parseInt(d.cap)/1000000) })
      .attr('r', 10)
      .attr('fill',function (d,i) { return colorScale(i) })
      .on('mouseenter', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r',20)
      })
      .on('mouseleave', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r',10)
      })
    .append('title') // Tooltip
      .text(function (d) { return d.name +
                            '\nTicker: ' + d.symbol +
                            '\nSector: ' + d.sector +
                           '\nMarket Cap: $' + d.cap +
                           '\nPrice/share: $' + d.price });

      circles.exit().remove();
```
