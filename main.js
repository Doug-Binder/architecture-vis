

var octogonPoints = "-25,-45   25,-45  50,-20  50,30 25,55 -25,55  -50,30  -50, -20"; 
var octogonTransform = "scale(.3)";
var hexagonPoints = "0,-125  108,-63.5 108,63.5 -10,125 -108,63.6 -108,-63.5" ;
var hexagonTransform = "scale(.10)"
var trianglePoints= octogonPoints;
var triangleTransform = 'scale(.1)';


var treeData = [
        {
        "name": "All Pods",
        "parent": "null",
        "level":"1",
        "children": [
          {
            "name": "MnDev",
            "parent": "All Pods",
            "level":"2",
            "children": [
              {
                "name": "Son of A",
                "parent": "Level 2: A",
                "level":"3"
              },
              {
                "name": "Daughter of A",
                "parent": "Level 2: A",
                  "level":"3",
              }
            ]
          },
          {
            "name": "Level 2: B",
            "parent": "All Pods",
            "level":"2"
          }
        ]
  }
]



var margin = {top: 20, right: 120, bottom: 20, left: 120},
 width = 960 - margin.right - margin.left,
 height = 500 - margin.top - margin.bottom;
 
var i = 0;

var tree = d3.layout.tree()
 .size([height, width]);

var diagonal = d3.svg.diagonal()
 .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
 .attr("width", width + margin.right + margin.left)
 .attr("height", height + margin.top + margin.bottom)
  .append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = treeData[0];
  
update(root);



function svgPoints(level){

    if(level == '1'){
    return octogonPoints;
    }
    if (level == '2'){
    return hexagonPoints;
    }
    if (level == '3'){
    return trianglePoints;
    }
}

function svgTransform(level){

    if(level == '1'){
    return octogonTransform;
    }
    if (level == '2'){
    return hexagonTransform;
    }
    if (level == '3'){
    return triangleTransform;
    }
}




function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
   links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Declare the nodesâ€¦
  var node = svg.selectAll("g.node")
   .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter the nodes.
  var nodeEnter = node.enter().append("g")
   .attr("class", "node")
   .attr("transform", function(d) { 
    return " translate(" + d.y + "," + d.x + ")"; });

  nodeEnter.append("polygon")
   .attr('points', function(d){return svgPoints(d.level);})
   .attr('transform',function(d){return svgTransform(d.level)})
   .attr("r", 10)
   .style("fill", "#fff");

  nodeEnter.append("text")
   .attr("x", function(d) { 
    return d.children || d._children ? -13 : 13; })
   .attr("dy", ".35em")
   .attr("text-anchor", function(d) { 
    return d.children || d._children ? "end" : "start"; })
   .text(function(d) { return d.name; })
   .style("fill-opacity", 1);

  // Declare the linksâ€¦
  var link = svg.selectAll("path.link")
   .data(links, function(d) { return d.target.id; });

  // Enter the links.
  link.enter().insert("path", "g")
   .attr("class", "link")
   .attr("d", diagonal);

}
