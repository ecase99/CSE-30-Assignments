// Ethan Tung, Ethan Case CMPM-35-01

function initialize() {

	// set the dimensions and margins of the graph
	var width = 450
		height = 450
		margin = 40

	// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
	var radius = Math.min(width, height) / 2 - margin/2
    
	// append the svg object to the div called 'my_dataviz'
	var svg = d3.select("#donutViz")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	svg.append("text")
		.text("")
		.attr("y", 20)
		.attr("x", 0)
		.attr("text-anchor", "middle")
		.attr("font-size", 20)
		.attr("font-family", "Nerko One")
		.attr("fill", '#59ab5b')
		.attr("id", "donut_type");

	svg.append("text")
		.text("")
		.attr("y", 0)
		.attr("x", 0)
		.attr("text-anchor", "middle")
		.attr("font-size", 40)
		.attr("font-family", "Nerko One")
		.attr('fill', '#59ab5b')
		.attr("id", "donut_count");
	

	var data = {"Maple Bar":1, "Raised Glaze":3, "Old Fashioned":2, "Chocolate":2, "Sprinkles":1, "Jelly":1}

	// set the color scale
	var color = d3.scaleOrdinal()
		.domain(data)
		.range(["#d5903c", "#eec068", "#e3996a", "#a2573c","#ef6db1","#ab40a2"]);

	var names = d3.scaleOrdinal()
		.domain(data)
		.range(["Maple Bar", "Raised Glaze", "Old Fashioned", "Chocolate","Sprinkles","Jelly"]);
    
	// Compute the position of each group on the pie:
	var pie = d3.pie()
		.value(function(d) {return d.value})

	var data_ready = pie(d3.entries(data))

	// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
	svg
		.selectAll('donut')
		.data(data_ready)
		.enter()
		.append('path')
		.attr("id", function(d){ return(d.index) })
		.attr('d', d3.arc()
			.innerRadius(80)         // This is the size of the donut hole
			.outerRadius(radius)
		)
		.data(data_ready)
		.attr('fill', function(d){ return(color(d.data.key)) })
		.attr("stroke", "white")
		.style("stroke-width", "2px")
		.style("opacity", 0.7)

	.on('mouseover',function(){

	d3.select("#donut_type").text(
		data_ready.find(element => element.index == this.id).data.key
	)

	d3.select("#donut_count").text(
		data_ready.find(element => element.index == this.id).data.value
	)

	d3.select(this)
		.transition()
		.duration(500)
		.attr('fill','#70e5a9')
		.attr('d', d3.arc()
			.innerRadius(80)
			.outerRadius(radius * 1.1)
		)
	})

	.on('mouseout',function () {
	d3.select(this)
		.transition()
		.duration(500)
		.attr('fill', function(d){ return(color(d.data.key)) })
		.attr('d', d3.arc()
			.innerRadius(80)
			.outerRadius(radius * 1)
		)
	svg.selectAll("text")
		.text("");
	})

}