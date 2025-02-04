// ==============================|| DASHBOARD - TOTAL GROWTH BAR CHART ||============================== //

import { useGetCategorySentimentDistributionQuery } from "api/apiSlice";
import { useState } from "react";

const { data: data, isLoading: isLoading, error: error } = useGetCategorySentimentDistributionQuery();

const [goodReviews, setGoodReviews] = useState([]);
const [badReviews, setBadReviews] = useState([]);
const [categories, setCategories] = useState([])

useEffect(() => {
  if (data) {
    const cats = data.map((d) => d.category);
    const good = data.map((d) => d.good_reviews);
    const bad = data.map((d) => d.bad_reviews);
    console.log("cats=", cats);
    console.log("good=", good);
    console.log("bad=", bad);
    setCategories(cats);
    setGoodReviews(good);
    setBadReviews(bad);
  }
}, [data]);

const chartData = {
  height: 480,
  type: 'bar',
  options: {
    chart: {
      id: 'bar-chart',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: categories
    },
    legend: {
      show: true,
      fontFamily: `'Poppins', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    }
  },
  series: [
    {
      name: 'Good Reviews',
      data: goodReviews
    },
    {
      name: 'Bad Reviews',
      data: badReviews
    }
  ]
};
export default chartData;
