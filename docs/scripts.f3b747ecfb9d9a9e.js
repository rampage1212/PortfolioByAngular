function createTree() {
  treeJSON = d3.json("flare.json", function (g) {
    console.log(g),
      (g = {
        name: "interests",
        children: [
          { name: "art", children: [{ name: "design" }, { name: "painting" }] },
          {
            name: "sports",
            children: [
              {
                name: "design",
                children: [{ name: "design" }, { name: "painting" }],
              },
              {
                name: "painting",
                children: [{ name: "design" }, { name: "painting" }],
              },
            ],
          },
          {
            name: "sports",
            children: [
              {
                name: "design",
                children: [{ name: "design" }, { name: "painting" }],
              },
              {
                name: "painting",
                children: [{ name: "design" }, { name: "painting" }],
              },
            ],
          },
          {
            name: "sports",
            children: [
              {
                name: "design",
                children: [{ name: "design" }, { name: "painting" }],
              },
              {
                name: "painting",
                children: [{ name: "design" }, { name: "painting" }],
              },
            ],
          },
          {
            name: "sports",
            children: [
              {
                name: "design",
                children: [{ name: "design" }, { name: "painting" }],
              },
              {
                name: "painting",
                children: [{ name: "design" }, { name: "painting" }],
              },
            ],
          },
          {
            name: "sports",
            children: [
              {
                name: "design",
                children: [{ name: "design" }, { name: "painting" }],
              },
              {
                name: "painting",
                children: [{ name: "design" }, { name: "painting" }],
              },
            ],
          },
          {
            name: "sports",
            children: [
              {
                name: "design",
                children: [{ name: "design" }, { name: "painting" }],
              },
              {
                name: "painting",
                children: [{ name: "design" }, { name: "painting" }],
              },
            ],
          },
        ],
      }),
      console.log(g),
      console.log("running");
    var o,
      f = 0,
      L = 0,
      h = 750,
      m = $(window).width(),
      p = $(window).height();
    $(window).resize(function () {
      (m = $(window).width()),
        (p = $(window).height()),
        console.log("doc height is " + $(window).height());
    });
    var s = d3.layout.tree(),
      v = d3.svg.diagonal().projection(function (e) {
        return [e.y, e.x];
      });
    (function k(e, t, a) {
      if (e) {
        t(e);
        var c = a(e);
        if (c) for (var d = c.length, u = 0; u < d; u++) k(c[u], t, a);
      }
    })(
      g,
      function (e) {
        f = Math.max(e.name.length, f);
      },
      function (e) {
        return e.children && e.children.length > 0 ? e.children : null;
      }
    ),
      console.log(f);
    var r = d3.behavior
        .zoom()
        .scaleExtent([0.1, 3])
        .on("zoom", function Y() {
          i.attr(
            "transform",
            "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"
          );
        }),
      D = d3
        .select("#tree-container")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("class", "overlay")
        .call(r);
    function _(e) {
      e.children &&
        ((e._children = e.children),
        e._children.forEach(_),
        (e.children = null));
    }
    var N = function () {
      var e = [];
      null !== draggingNode &&
        null !== selectedNode &&
        (e = [
          {
            source: { x: selectedNode.y0, y: selectedNode.x0 },
            target: { x: draggingNode.y0, y: draggingNode.x0 },
          },
        ]);
      var t = i.selectAll(".templink").data(e);
      t
        .enter()
        .append("path")
        .attr("class", "templink")
        .attr("d", d3.svg.diagonal())
        .attr("pointer-events", "none"),
        t.attr("d", d3.svg.diagonal()),
        t.exit().remove();
    };
    function S(e) {
      (scale = r.scale()),
        (x = -e.y0),
        (y = -e.x0),
        (x = x * scale + m / 2),
        (y = y * scale + p / 2),
        d3
          .select("g")
          .transition()
          .duration(h)
          .attr(
            "transform",
            "translate(" + x + "," + y + ")scale(" + scale + ")"
          ),
        r.scale(scale),
        r.translate([x, y]);
    }
    function B(e) {
      A(
        (e = (function W(e) {
          return (
            e.children
              ? ((e._children = e.children), (e.children = null))
              : e._children &&
                ((e.children = e._children), (e._children = null)),
            e
          );
        })(e))
      ),
        S(e);
    }
    function A(e) {
      var t = [1],
        a = function (n, l) {
          l.children &&
            l.children.length > 0 &&
            (t.length <= n + 1 && t.push(0),
            (t[n + 1] += l.children.length),
            l.children.forEach(function (J) {
              a(n + 1, J);
            }));
        };
      a(0, o);
      var c = 25 * d3.max(t),
        d = (s = s.size([c, m])).nodes(o).reverse(),
        u = s.links(d);
      d.forEach(function (n) {
        n.y = n.depth * (10 * f);
      }),
        (node = i.selectAll("g.node").data(d, function (n) {
          return n.id || (n.id = ++L);
        }));
      var w = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function (n) {
          return "translate(" + e.y0 + "," + e.x0 + ")";
        })
        .on("click", B);
      w
        .append("circle")
        .attr("class", "nodeCircle")
        .attr("r", 5)
        .style("fill", function (n) {
          return n._children ? "lightsteelblue" : "";
        }),
        w
          .append("text")
          .attr("x", function (n) {
            return n.children || n._children ? -10 : 10;
          })
          .attr("dy", ".35em")
          .attr("class", "nodeText")
          .attr("text-anchor", function (n) {
            return n.children || n._children ? "end" : "start";
          })
          .text(function (n) {
            return n.name;
          })
          .style("fill-opacity", 0),
        w
          .append("circle")
          .attr("class", "ghostCircle")
          .attr("r", 30)
          .attr("opacity", 0.2)
          .style("fill", "red")
          .attr("pointer-events", "mouseover")
          .on("mouseover", function (n) {
            !(function (e) {
              (selectedNode = e), N();
            })(n);
          })
          .on("mouseout", function (n) {
            (selectedNode = null), N();
          }),
        node
          .select("text")
          .attr("x", function (n) {
            return n.children || n._children ? -10 : 10;
          })
          .attr("text-anchor", function (n) {
            return n.children || n._children ? "end" : "start";
          })
          .text(function (n) {
            return n.name;
          }),
        node
          .select("circle.nodeCircle")
          .attr("r", 2)
          .style("fill", function (n) {
            return n._children ? "lightsteelblue" : "#fff";
          }),
        node
          .transition()
          .duration(h)
          .attr("transform", function (n) {
            return "translate(" + n.y + "," + n.x + ")";
          })
          .select("text")
          .style("fill-opacity", 1);
      var T = node
        .exit()
        .transition()
        .duration(h)
        .attr("transform", function (n) {
          return "translate(" + e.y + "," + e.x + ")";
        })
        .remove();
      T.select("circle").attr("r", 0),
        T.select("text").style("fill-opacity", 0);
      var C = i.selectAll("path.link").data(u, function (n) {
        return n.target.id;
      });
      C.enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", function (n) {
          var l = { x: e.x0, y: e.y0 };
          return v({ source: l, target: l });
        }),
        C.transition().duration(h).attr("d", v),
        C.exit()
          .transition()
          .duration(h)
          .attr("d", function (n) {
            var l = { x: e.x, y: e.y };
            return v({ source: l, target: l });
          })
          .remove(),
        d.forEach(function (n) {
          (n.x0 = n.x), (n.y0 = n.y);
        });
    }
    var i = D.append("g");
    r.scale(1.7),
      console.log(r.scale() + "SDFDSFDSF"),
      ((o = g).x0 = p / 2),
      (o.y0 = 0),
      (function E(e) {
        e.children && (e.children.forEach(E), _(e));
      })(o),
      A(o),
      S(o);
  });
}
