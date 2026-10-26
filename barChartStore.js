var svg = d3.select("#svgStore")

// Label the X-axis
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width*.45)
    .attr("y", height-20)
    .attr("dy", ".75em")
    .text("Store");

// Label the Y-axis
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -height*.25)
    .attr("y", 0)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Revenue (in Thousands of USD)");

// Create the X-axis
var xStoreDomain = storeData.map(d => d.Store)
var xStoreScale = d3.scaleBand()
    .domain( xStoreDomain )
    .range([ margin.left, width - margin.right - margin.left ])
    .padding(0.5)
var xStoreAxis = d3.axisBottom(xStoreScale)
    .tickSizeOuter(0)

// render the x axis
svg.append('g')
    .attr('class', 'x-axis-stores')
    .attr('transform', `translate(0,${ height - margin.bottom })`)
    .call(xStoreAxis)

// Create the Y-axis
var yMax = d3.max(storeData, d => d.Revenue)
var yScale = d3.scaleLinear()
    .domain([ 0, yMax ])
    .range([ height - margin.bottom, margin.top ])
var yAxis = d3.axisLeft(yScale)
    .tickSizeOuter(0)

// render the Y axis
svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${ margin.left },0)`)
    .call(yAxis)

// Create bars
// FIXME your code here. Be sure to class the bar as "storeBar"
svg.append('g')
    .attr('class', 'bars')
    .selectAll('rect')
    .data(storeData)
    .join('rect')
        .attr('class', 'storeBar')
        .attr('x', d => xStoreScale(d.Store))
        .attr('y', d => yScale(d.Revenue))
        .attr('width', xStoreScale.bandwidth())
        .attr('height', d => yScale(0) - yScale(d.Revenue))
        .style('fill', '#7472c0')
    
// Mouseover/out events for store bars
d3.selectAll(".storeBar").on("mouseover", function(event)
{
    // FIXME your code here
    d3.select(this).style('fill', 'red')
})
.on("mouseout",function(event)
{
    // FIXME your code here
    d3.select(this).style('fill', '#7472c0')
});

// Helper function to keep the click handler shorter
function updateStoreAxis() {
    // FIXME your code here
    var x = xStoreScale.domain(storeData.map(function (d) {return d.Store;}))
    d3.selectAll(".storeBar")
        .attr("x", function(d) {return x(d.Store);});
    d3.select(".x-axis-stores").call(xStoreAxis);
}

// click event for the Store chart
var sortStoreDescending = true
var sortStoreChartByRevenueDescending = true
d3.select("#svgStore").on("mousedown", function(event)
{
    // FIXME your code here
    var coords = d3.pointer(event);
    var mouseX = coords[0];
    var mouseY = coords[1];

    if (mouseX < margin.left) {
        if (sortStoreChartByRevenueDescending) {
            storeData.sort(function(a,b) { return d3.descending(a.Revenue, b.Revenue); });
        } else {
            storeData.sort(function(a,b) { return d3.ascending(a.Revenue, b.Revenue); });
        }
        sortStoreChartByRevenueDescending = !sortStoreChartByRevenueDescending;
        updateStoreAxis();
    }
    else if (mouseY > height - margin.bottom) {
        if (sortStoreDescending) {
            storeData.sort(function(a,b) {return d3.descending(a.Store, b.Store); });

        } else {
            storeData.sort(function(a,b) {return d3.ascending(a.Store, b.Store); });

        }
        sortStoreDescending = !sortStoreDescending;
        updateStoreAxis();
    }
});
