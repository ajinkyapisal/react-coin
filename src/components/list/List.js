import React from "react";
import { handleResponse } from "../../helpers";
import { API_URL } from "../../config";
import Loading from "../common/Loading";
import Table from "./Table";
import Pagination from "./Pagination";

class List extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1,
      isAsc: false,
      sortColumn: "marketCap"
    };

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.customSort = this.customSort.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    this.setState({ loading: true });

    const { page } = this.state;

    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
      .then(handleResponse)
      .then(data => {
        const { currencies, totalPages } = data;
        this.setState({
          currencies: this.customSort(
            currencies,
            this.state.sortColumn,
            this.state.isAsc
          ),
          totalPages,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          error: error.errorMessage,
          loading: false
        });
      });
  }

  handlePaginationClick(direction) {
    let nextPage = this.state.page;
    nextPage = direction === "next" ? nextPage + 1 : nextPage - 1;
    this.setState({ page: nextPage }, () => {
      this.fetchCurrencies();
    });
  }

  customSort(currencies, sortColumn, isAsc) {
    const compare = (a, b) => {
      a = a[sortColumn].replace(/,/g, "");
      b = b[sortColumn].replace(/,/g, "");
      return a.localeCompare(b, undefined, { numeric: true });
    };
    return isAsc
      ? currencies.sort(compare)
      : currencies.sort(compare).reverse();
  }

  handleSort(colName, event) {
    const { currencies, isAsc } = this.state;
    const newCurrencies = this.customSort(currencies, colName, !isAsc);

    this.setState({
      currencies: newCurrencies,
      isAsc: !isAsc,
      sortColumn: colName
    });
  }

  render() {
    const { loading, error, currencies, page, totalPages } = this.state;

    if (loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }

    if (error) {
      return <div className="error">{error}</div>;
    }
    return (
      <div>
        <Table currencies={currencies} handleSort={this.handleSort} />
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePaginationClick={this.handlePaginationClick}
        />
      </div>
    );
  }
}

export default List;
