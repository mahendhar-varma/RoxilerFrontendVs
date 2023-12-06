import { Component } from "react";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import { ThreeDots } from "react-loader-spinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "./index.css";
import TableItem from "../TableItem";

const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class Home extends Component {
  state = {
    pageNo: 1,
    search: "",
    selectValue: monthsList[2],
    month: 3,
    tableDataList: [],
    statsData: {},
    barChartList: [],
    pieChartList: [],
  };

  componentDidMount() {
    this.getRequiredData();
    this.getStatsData();
  }

  onMonthChange = () => {
    this.getRequiredData();
    this.getStatsData();
  };

  onFormSubmit = () => {
    this.getRequiredData();
  };

  getMonth = (value) => {
    let month;
    switch (value) {
      case monthsList[0]:
        month = 1;
        break;
      case monthsList[1]:
        month = 2;
        break;
      case monthsList[2]:
        month = 3;
        break;
      case monthsList[3]:
        month = 4;
        break;
      case monthsList[4]:
        month = 5;
        break;
      case monthsList[5]:
        month = 6;
        break;
      case monthsList[6]:
        month = 7;
        break;
      case monthsList[7]:
        month = 8;
        break;
      case monthsList[8]:
        month = 9;
        break;
      case monthsList[9]:
        month = 10;
        break;
      case monthsList[10]:
        month = 11;
        break;
      case monthsList[11]:
        month = 12;
        break;
      default:
        month = 3;
    }
    return month;
  };

  getRequiredData = async () => {
    const { search, pageNo, selectValue } = this.state;
    const month = this.getMonth(selectValue);
    console.log(month);

    const apiUrl = `https://rolixerapp.onrender.com/home/?month=${month}&search=${search}&page_no=${pageNo}`;

    try {
      const responseData = await axios.get(apiUrl);
      this.setState({ tableDataList: responseData.data });
    } catch (error) {
      console.log(error.response);
    }
  };

  addSearchValue = (event) => {
    this.setState({ search: event.target.value });
  };

  changeSelectItem = (event) => {
    this.setState({ selectValue: event.target.value }, this.onMonthChange);
  };

  loadNextPage = () => {
    this.setState(
      (prevState) => ({
        pageNo: prevState.pageNo + 1,
      }),
      this.getRequiredData
    );
  };

  loadPrevPage = () => {
    const { pageNo } = this.state;
    if (pageNo > 1) {
      this.setState(
        (prevState) => ({
          pageNo: prevState.pageNo - 1,
        }),
        this.getRequiredData
      );
    }
  };

  getStatsData = async () => {
    const { selectValue } = this.state;
    const month = this.getMonth(selectValue);
    const apiUrl = `https://rolixerapp.onrender.com/home/response/?month=${month}`;

    try {
      const responseData = await axios.get(apiUrl);
      const data = responseData.data;
      this.setState({
        statsData: data.statistics,
        barChartList: data.priceRange,
        pieChartList: data.category,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  render() {
    const {
      selectValue,
      pageNo,
      statsData,
      barChartList,
      pieChartList,
      tableDataList,
    } = this.state;
    const { totalPrice, totalNotSoldItems, totalSoldItems } = statsData;

    const check = tableDataList.length !== 0;
    const checkBarChart = barChartList.length !== 0;
    const checkPieChart = pieChartList.length !== 0;

    const colorGenerator = () => {
      const letters = "0123456789AaBbCcDdEeFf";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 22)];
      }
      return color;
    };

    return (
      <div className="mainContainer">
        <div className="titleContainer">
          <p className="title">Transaction Dashboard</p>
        </div>
        <div>
          <div className="responseChangeContainer">
            <form className="form" onClick={this.onFormSubmit}>
              <input
                type="text"
                id="title"
                className="inputElement"
                placeholder="Search transaction"
                onChange={this.addSearchValue}
              />
              <button type="submit" className="searchButton">
                <BiSearch className="searchIcon" />
              </button>
            </form>
            <select
              className="selectElement"
              onChange={this.changeSelectItem}
              value={selectValue}
            >
              {monthsList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="table">
            <ul className="tableRow tableHeadRow">
              <li className="tableText">ID</li>
              <li className="tableTitle">Title</li>
              <li className="tableDescription">Description</li>
              <li className="tableText">Price</li>
              <li className="tableText">Category</li>
              <li className="tableText">Sold</li>
              <li className="tableText">Image</li>
            </ul>
            <ul className="tableRow">
              {check ? (
                tableDataList.map((item) => (
                  <>
                    <TableItem data={item} key={item.id} />
                    <hr className="line" />
                  </>
                ))
              ) : (
                <div className="">
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                  />
                </div>
              )}
            </ul>
          </div>

          <div className="responseChangeContainer">
            <p className="text">Page: {pageNo}</p>
            <>
              <button
                type="button"
                className="searchButton btn text"
                onClick={this.loadNextPage}
              >
                Next
              </button>
              <p>-</p>
              <button
                type="button"
                className="searchButton btn text"
                onClick={this.loadPrevPage}
              >
                Previous
              </button>
            </>
            <p className="text">Per Page: 10</p>
          </div>
        </div>
        <div className="mainStatsContainer">
          <div className="statsContainer">
            <h1 className="head">Statistics - {selectValue}</h1>
            <div className="statsDataContainer">
              <div className="labelContainer">
                <p className="statText">Total Sale: </p>
                <p className="statText">{totalPrice}</p>
              </div>
              <div className="labelContainer">
                <p className="statText">Total Sold Item: </p>
                <p className="statText">{totalSoldItems}</p>
              </div>
              <div className="labelContainer">
                <p className="statText">Total not Sold Item: </p>
                <p className="statText">{totalNotSoldItems}</p>
              </div>
            </div>
          </div>
          <div className="statsContainer">
            <h1 className="head">Bar Chart Stats - {selectValue}</h1>
            {checkBarChart ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartList} margin={{ top: 5 }}>
                  <XAxis
                    dataKey="priceRange"
                    tick={{ stroke: "gray", strokewidth: 1 }}
                  />
                  <YAxis tick={{ stroke: "gray", strokewidth: 0 }} />
                  <Legend wrapperStyle={{ padding: 20 }} />
                  <Bar
                    dataKey="totalPriceRangeItems"
                    name="Price range"
                    fill="#1f77b4"
                    barSize="15%"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="green"
                  ariaLabel="loading"
                />
              </div>
            )}
          </div>
          <div className="statsContainer">
            <h1 className="head">Pie Chart Stats - {selectValue}</h1>
            {checkPieChart ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    cx="70%"
                    cy="40%"
                    data={pieChartList}
                    startAngle={0}
                    endAngle={360}
                    innerRadius="40%"
                    outerRadius="70%"
                    dataKey="totalCategoryItems"
                  >
                    {pieChartList.map((item) => (
                      <Cell
                        name={item.category}
                        fill={colorGenerator()}
                        key={item.category}
                      />
                    ))}
                  </Pie>
                  <Legend
                    iconType="circle"
                    layout="vertical"
                    verticalAlign="top"
                    align="right"
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="green"
                  ariaLabel="loading"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
