function findConnection() {
  let nodes = [];
  let links = [];
  let i = 0;

  // Find all unique cc cards
  ccData.forEach((card) => {
    const { last4ccnum } = card;

    // Check if the card is already in the nodes array
    const includes = nodes.some((obj) =>
      Object.values(obj).includes(last4ccnum)
    );
    if (!includes) {
      nodes.push({ node: i, name: last4ccnum });
      i += 1;
    }
  });

  // Find all unique cc cards
  loyaltyData.forEach((card) => {
    const { loyaltynum } = card;

    // Check if the card is already in the nodes array
    const includes = nodes.some((obj) =>
      Object.values(obj).includes(loyaltynum)
    );
    if (!includes) {
      nodes.push({ node: i, name: loyaltynum });
      i += 1;
    }
  });

  ccData.map((cc) => {
    const foundCc = nodes.find((obj) => obj.name === cc.last4ccnum);

    let cc_date = new Date(cc.timestamp);
    loyaltyData.forEach((loyalty) => {
      const foundLoyalty = nodes.find((obj) => obj.name === loyalty.loyaltynum);

      let loyalty_date = new Date(loyalty.timestamp);

      if (
        datesAreOnSameDay(cc_date, loyalty_date) &&
        cc.location == loyalty.location &&
        cc.price == loyalty.price
      ) {
        const foundDuplicate = links.find(
          (link) =>
            link.source === foundCc.node && link.target === foundLoyalty.node
        );

        if (foundDuplicate) {
          foundDuplicate.value += 1;
        } else {
          links.push({
            source: foundCc.node,
            target: foundLoyalty.node,
            value: 1,
          });
        }
      }
    });
  });
  console.log(links);
  console.log(nodes);

  let data = { nodes, links };
  drawSankey(data);
}

function drawSankey(data) {
  const width = 800;
  const height = 900;

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const svg = d3
    .select("#chart-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Set the sankey diagram properties
  var sankey = d3.sankey().nodeWidth(36).nodePadding(290).size([width, height]);

  sankey.nodes(data.nodes).links(data.links).layout(1);

  // add in the links
  var link = svg
    .append("g")
    .selectAll(".link")
    .data(data.links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", sankey.link())
    // .style("stroke-width", function (d) {
    //   return Math.max(1, d.dy);
    // })
    .attr("fill", (d, i) => colorScale(i))
    .attr("stroke", "#000")
    .style("stroke-width", (d) => d.value)
    // .sort(function (a, b) {
    //   return b.dy - a.dy;
    // });

  // add in the nodes
  var node = svg
    .append("g")
    .selectAll(".node")
    .data(data.nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    })
    .call(
      d3
        .drag()
        .subject(function (d) {
          return d;
        })
        .on("start", function () {
          this.parentNode.appendChild(this);
        })
        .on("drag", dragmove)
    );

  // add the rectangles for the nodes
  node
    .append("rect")
    .attr("height", function (d) {
      return d.value;
    })
    .attr("width", sankey.nodeWidth())
    .style("fill", function (d, i) {
      return colorScale(i);
    })
    .style("stroke", function (d, i) {
      return colorScale(i);
    })
    // Add hover text
    // .append("title")
    // .text(function (d) {
    //   return d.name
    // });
    .append("title") // Append <title> element
    .text((d) => d.name); // Set the text of the title

  // add in the title for the nodes
  node
    .append("text")
    .attr("x", 0)
    .attr("y", function (d) {
      return d.dy / 2;
    })
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .attr("transform", null)
    .text(function (d) {
      return d.name;
    })
    .filter(function (d) {
      return d.x < width / 2;
    })
    .attr("x", 6 + sankey.nodeWidth())
    .attr("text-anchor", "start");

  // the function for moving the nodes
  function dragmove(d) {
    d3.select(this).attr(
      "transform",
      "translate(" +
        d.x +
        "," +
        (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) +
        ")"
    );
    sankey.relayout();
    link.attr("d", sankey.link());
  }
}

const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();
