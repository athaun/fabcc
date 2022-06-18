/**
 * AnyChart is lightweight robust charting library with great API and Docs, that works with your stack and has tons of chart types and features.
 *
 * Theme: darkTurquoise
 * Version: 2.0.0 (2019-04-26)
 * License: https://www.anychart.com/buy/
 * Contact: sales@anychart.com
 * Copyright: AnyChart.com 2019. All rights reserved.
 */
 (function() {
    "use strict";
  
    function a() {
      return window.anychart.color.setOpacity(this.sourceColor, 0.6, !0);
    }
    function b() {
      return window.anychart.color.darken(this.sourceColor);
    }
    function c() {
      return window.anychart.color.lighten(this.sourceColor);
    }
    var e = {
      palette: {
        type: "distinct",
        items: "#80deea #00acc1 #00838f #29b6f6 #0277bd #0277bd #8c9eff #9575cd #ce93d8 #8e24aa".split(
          " "
        )
      },
      defaultOrdinalColorScale: {
        autoColors: function(d) {
          return window.anychart.color.blendedHueProgression(
            "#b2dfdb",
            "#00838f",
            d
          );
        }
      },
      defaultLinearColorScale: { colors: ["#b2dfdb", "#00838f"] },
      defaultFontSettings: {
        fontFamily: 'sans-serif',
        fontColor: "#e0e0e0",
        fontSize: 12
      },
      defaultBackground: {
        fill: "#343A40",
     
        cornerType: "round",
        corners: 5
      },
      defaultAxis: {
        stroke: "#222529 0.8",
        labels: { enabled: !0 },
        ticks: { stroke: "#222529" },
        minorTicks: { stroke: "#222529" }
      },
      defaultGridSettings: { stroke: "#2f3235 0.8" },
      defaultMinorGridSettings: { stroke: "#2f3235 0.6" },
      defaultSeparator: { fill: "#222529" },
      defaultTooltip: {
        background: { fill: "#222529 0.9", stroke: "#222529 0.9", corners: 3 },
        fontColor: "#e0e0e0",
        fontSize: 12,
        title: { fontColor: "#bdbdbd", align: "center", fontSize: 14 },
        padding: { top: 10, right: 15, bottom: 10, left: 15 },
        separator: { margin: { top: 10, right: 10, bottom: 10, left: 10 } }
      },
      defaultColorRange: {
        stroke: "#222529",
        ticks: { stroke: "#222529", position: "outside", length: 7, enabled: !0 },
        minorTicks: {
          stroke: "#222529",
          position: "outside",
          length: 5,
          enabled: !0
        },
        marker: {
          padding: { top: 3, right: 3, bottom: 3, left: 3 },
          fill: "#222529"
        }
      },
      defaultScroller: {
        fill: "#3e3e3e",
        selectedFill: "#757575",
        thumbs: {
          fill: "#222529",
          stroke: "#222529",
          hovered: { fill: "#e0e0e0", stroke: "#757575" }
        }
      },
      chart: {
        defaultSeriesSettings: {
          base: {
            selected: {
              stroke: "1.5 #222529",
              markers: { stroke: "1.5 #222529" }
            }
          },
          lineLike: { selected: { stroke: "3 #222529" } },
          areaLike: { selected: { stroke: "3 #222529" } },
          marker: { selected: { stroke: "1.5 #222529" } },
          candlestick: {
            normal: {
              risingFill: "#80deea",
              risingStroke: "#80deea",
              fallingFill: "#00838f",
              fallingStroke: "#00838f"
            },
            hovered: {
              risingFill: c,
              risingStroke: b,
              fallingFill: c,
              fallingStroke: b
            },
            selected: {
              risingStroke: "3 #80deea",
              fallingStroke: "3 #00838f",
              risingFill: "#333333 0.85",
              fallingFill: "#333333 0.85"
            }
          },
          ohlc: {
            normal: { risingStroke: "#80deea", fallingStroke: "#00838f" },
            hovered: { risingStroke: b, fallingStroke: b },
            selected: { risingStroke: "3 #80deea", fallingStroke: "3 #00838f" }
          }
        },
        title: { fontSize: 14 },
        padding: { top: 20, right: 25, bottom: 15, left: 15 }
      },
      pieFunnelPyramidBase: {
        normal: { labels: { fontColor: null } },
        selected: { stroke: "1.5 #fafafa" },
        connectorStroke: "#757575",
        outsideLabels: { autoColor: "#e0e0e0" },
        insideLabels: { autoColor: "#343A40" }
      },
      cartesianBase: {
        defaultSeriesSettings: {
          box: {
            selected: {
              medianStroke: "#fafafa",
              stemStroke: "#fafafa",
              whiskerStroke: "#fafafa",
              outlierMarkers: {
                enabled: null,
                size: 4,
                fill: "#fafafa",
                stroke: "#fafafa"
              }
            }
          }
        },
        defaultXAxisSettings: { ticks: { enabled: !1 } },
        defaultYAxisSettings: { ticks: { enabled: !1 } },
        xAxes: [{}],
        xGrids: [],
        yGrids: [],
        yAxes: []
      },
      financial: { yAxes: [{}] },
      map: {
        unboundRegions: { enabled: !0, fill: "#616161", stroke: "#757575" },
        defaultSeriesSettings: {
          base: {
            normal: { stroke: c, labels: { fontColor: "#343A40" } },
            selected: { stroke: "1.5 #222529" }
          },
          connector: {
            normal: { markers: { stroke: "1.5 #222529" } },
            hovered: { markers: { stroke: "1.5 #222529" } },
            selected: {
              stroke: "1.5 #000",
              markers: { fill: "#000", stroke: "1.5 #222529" }
            }
          },
          bubble: { normal: { stroke: c }, hovered: { stroke: "1.5 #222529" } },
          marker: {
            normal: { labels: { fontColor: "#e0e0e0" }, stroke: "1.5 #222529" },
            hovered: { stroke: "1.5 #909090" }
          }
        }
      },
      sparkline: {
        padding: 0,
        background: { stroke: "#343A40" },
        defaultSeriesSettings: {
          area: { stroke: "1.5 #80deea", fill: "#80deea 0.5" },
          column: { fill: "#80deea", negativeFill: "#00838f" },
          line: { stroke: "1.5 #80deea" },
          winLoss: { fill: "#80deea", negativeFill: "#00838f" }
        }
      },
      bullet: {
        background: { stroke: "#343A40" },
        defaultMarkerSettings: { fill: "#80deea", stroke: "2 #80deea" },
        padding: { top: 5, right: 10, bottom: 5, left: 10 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        rangePalette: {
          items: ["#A4A4A4", "#8C8C8C", "#797979", "#616161", "#4E4E4E"]
        }
      },
      heatMap: {
        normal: { stroke: "1 #343A40", labels: { fontColor: "#212121" } },
        hovered: { stroke: "1.5 #343A40" },
        selected: { stroke: "2 #fafafa" }
      },
      treeMap: {
        normal: {
          headers: {
            background: { enabled: !0, fill: "#616161", stroke: "#757575" }
          },
          labels: { fontColor: "#212121" },
          stroke: "#757575"
        },
        hovered: {
          hoverHeaders: {
            fontColor: "#e0e0e0",
            background: { fill: "#757575", stroke: "#757575" }
          }
        },
        selected: { labels: { fontColor: "#fafafa" }, stroke: "2 #eceff1" }
      },
      stock: {
        padding: [20, 30, 20, 60],
        defaultPlotSettings: {
          xAxis: { background: { fill: "#616161 0.3", stroke: "#222529" } }
        },
        scroller: {
          fill: "none",
          selectedFill: "#222529 0.3",
          outlineStroke: "#222529",
          defaultSeriesSettings: {
            base: { selected: { stroke: a, fill: a } },
            lineLike: { selected: { stroke: a } },
            areaLike: { selected: { stroke: a, fill: a } },
            marker: { selected: { stroke: a } },
            candlestick: {
              normal: {
                risingFill: "#999 0.6",
                risingStroke: "#999 0.6",
                fallingFill: "#999 0.6",
                fallingStroke: "#999 0.6"
              },
              selected: {
                risingStroke: a,
                fallingStroke: a,
                risingFill: a,
                fallingFill: a
              }
            },
            ohlc: {
              normal: { risingStroke: "#999 0.6", fallingStroke: "#999 0.6" },
              selected: { risingStroke: a, fallingStroke: a }
            }
          }
        }
      }
    };
    window.anychart = window.anychart || {};
    window.anychart.themes = window.anychart.themes || {};
    window.anychart.themes.darkTurquoise = e;
  })();