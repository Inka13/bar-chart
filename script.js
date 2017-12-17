document.addEventListener('DOMContentLoaded',function(){
      req=new XMLHttpRequest();
      req.open("GET",'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json',true);
      req.send();
      req.onload=function(){
        const dataset = [];
        json=JSON.parse(req.responseText);
        const minDate = new Date(json.data[0][0]);
        const maxDate = new Date(json.data[json.data.length-1][0]);
        json.data.forEach(function(d) {
          dd=d[0].split('-');
          dataset.push([dd[0],dd[1],d[1]]);
        });
        const w = window.innerWidth;
        const h = window.innerHeight-50;
        const padding = 60;
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const xScale = d3.scaleTime()
                     .domain([minDate, maxDate])
                     .range([padding, w - padding]);
        const yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, (d) => d[2])])
                     .range([h-padding, padding]);
        const svg = d3.select("div")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
        svg.selectAll("rect")
           .data(dataset)
           .enter()
          .append("rect")
          .attr("x", (d, i) => padding + Math.round((w-padding-padding)/dataset.length*i), 2)
          .attr("y", (d, i) =>  yScale(d[2]))
          .attr("width", Math.round((w-2*padding)/dataset.length), 2)
          .attr("height", (d, i) => h-padding-yScale(d[2]))
          .attr("fill", "steelblue")
          .attr("class", "bar")
          .append("title")
          .text((d) => "GDP: $" + d[2] + " billion - " + d[0] + ", " + months[Number(d[1])-1]);
        const xAxis = d3.axisBottom(xScale);
        svg.append("g")
          .attr("transform", "translate(0," + (h - padding) + ")")
          .call(xAxis);
        const yAxis = d3.axisLeft(yScale);
        svg.append("g")
          .attr("transform", "translate(0" + padding + ")")
          .call(yAxis);
     };
  });
