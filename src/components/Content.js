import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
const Content = () => {
  const [ans, setans] = useState([]);
  const [change, setChange] = useState('Submit');
  const [words, setWords] = useState([]);
  const [chart, setChart] = useState(null);
  const [enable, setEnableButton] = useState(false);
  const chartRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const chartgraph = {
      options: {
        chart: {
          id: "Terribly-Tiny-Tales-assignment",
        },
        plotOptions: {
          bar: {
            horizontal: false,
            distributed: true,
            columnWidth: "100%",
            barHeight: "100%",
          },
        },
        yaxis:{
          title: {
            text: "Frequency of words",
          },
        },
        xaxis: {
          title: {
            text: "Words",
          },
          categories: words,
        },
        legend:{
          position: 'bottom',
    offsetY: 10,
    markers: {
      radius: 12,
      width: 15,
      height: 15
    },
    itemMargin: {
      horizontal: 10,
      vertical: 5
    },
    onItemClick: {
      toggleDataSeries: true
    },
    onItemHover: {
      highlightDataSeries: true
    }
        }
      },
      series: [
        {
          name: "frequency",
          data: ans,
        },
      ],
    };
    setChart(chartgraph);
  }, [ans, words]);
  const exportMyFile = () => {
    if(chart === null){
      alert('You first need to Press Submit Button')
      return;
    }
    chartRef.current.chart.exportToCSV();
  };
  const fetchApiData = async () => {
    setIsLoading(true);
    if(change !== 'Submit'){
      setIsLoading(false)
      setChart(null)
      setChange('Submit')
      return;
    }
    setChange('Close')
    
    await fetch("https://www.terriblytinytales.com/test.txt")
      .then((res) => {
        if (res.ok) {
          return res.text();
        } else {
          throw new Error("Error: " + res.status);
        }
      })
      .then((data) => {
        data = data.toLowerCase();
        let segmenter = new Intl.Segmenter("en", { granularity: "word" });
        const words = [...segmenter.segment(data)]
          .filter((x) => x.isWordLike)
          .map((x) => x.segment);
        let freq = {};
        for (let i = 0; i < words.length; i++) {
          if (freq[words[i]] >= 1) {
            freq[words[i]] = freq[words[i]] + 1;
          } else {
            freq[words[i]] = 1;
          }
        }
        const sortedWords = Object.keys(freq)
          .sort(function (a, b) {
            return freq[b] - freq[a];
          })
          .splice(0, 20);
        const myArr = sortedWords.map((word) => freq[word]);
        setans(myArr);
        setWords(sortedWords);
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
    setEnableButton(true)
  };
  return (
    <div>
        <section>
        <article>Click on the submit button below to get API data !<br/>& Generate Histogram</article>
        <div className="button-menu">
          <button onClick={fetchApiData}>{change}</button>
          {enable && <button onClick={exportMyFile}>Export CSV</button>}
        </div>
      </section>
      <br />
      {isLoading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        ans.length > 0 &&
        chart && (
          <div className="graph-data">
            <Chart
              ref={chartRef}
              options={chart.options}
              series={chart.series}
              type="bar"
              className="histogram"
            />
          </div>
        )
      )}
    </div>
  )
}

export default Content