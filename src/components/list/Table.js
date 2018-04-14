import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { renderChangePercenet } from '../../helpers'
import './Table.css'

const Table = (props) => {
  const { currencies, history, handleSort } = props

    return (
        <div className="Table-container">
        <table className="Table">
          <thead className="Table-head">
            <tr>
              <th onClick={handleSort.bind(null, 'name')} >Cryptocurrency</th>
              <th onClick={handleSort.bind(null, 'price')} >Price</th>
              <th onClick={handleSort.bind(null, 'marketCap')} >Market Cap</th>
              <th onClick={handleSort.bind(null, 'percentChange24h')} >24H Change</th>
            </tr>
          </thead>
          <tbody className="Table-body">
            {currencies.map((currency) => (
              <tr 
                key={currency.id}
                onClick={ () => history.push(`/currency/${currency.id}`)}
              >
                <td>
                  <span className="Table-rank">{currency.rank}</span>
                  {currency.name}
                </td>
                <td>
                  <span className="Table-dollar">$</span>
                  {currency.price}
                </td>
                <td>
                  <span className="Table-dollar">$</span>
                  {currency.marketCap}
                </td>
                <td>
                  {renderChangePercenet(currency.percentChange24h)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}

Table.propTypes = {
    currencies: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
}

export default withRouter(Table);