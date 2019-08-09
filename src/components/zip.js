import React, {Component} from 'react';

export default class ZipCode extends Component {
  constructor(props)
  {
    super(props);
    this.zipCodes = this.mapMostOccuredZipCode(this.props.zipCodes, 10);

  }

  mapMostOccuredZipCode = (zipCodes, numberToMap) => {

    let counts = zipCodes.reduce(function (obj, val) {
      obj[val] = (obj[val] || 0) + 1;
      return obj;
    }, {});

    let array = [];
    let sorted = Object.keys(counts).sort(function (a, b) {
      return counts[b] - counts[a];
    });
    let it;
    for (it = 0; it < numberToMap; it++)
    {
      if (sorted[it])
      {
        let zip = {code: sorted[it], count: counts[sorted[it]]};

        array.push(zip);
      }
    }
    return array;
  };

  render()
  {
    const rows = this.zipCodes.map((zip) =>
      (
        <tr key={zip.code}>
          <td>{zip.code}</td>
          <td>{zip.count}</td>
        </tr>
      ));

    return (
      <table className="table table-hover table-fixed">
        <thead className="thead-dark">
        <tr>
          <th>Zip Code</th>
          <th>Number of users registered</th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
    )
  }
}