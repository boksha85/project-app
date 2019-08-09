import React, {Component} from 'react';
import "../css/drawing.css";
import CanvasJSReact from './../lib/canvasjs.react';
import ChartUtil from './../util/ChartUtil'

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const createNetworkData = (name, data) =>
{
  return {
    name: name,
    data: data
  }
};

const getOptionsForCanvas = (label, dataPoints) => {
  return {
    animationEnabled: true,
    theme: "light1", // "light1", "dark1", "dark2"
    title: {
      text: label
    },
    data: [{
      type: "pie",
      startAngle: -90,
      dataPoints: dataPoints
    }]
  };
};

export default class Drawing extends Component {
  constructor(props)
  {
    super(props);
  }

  render()
  {
    const network1Data = this.props.mails.unseenEmails;
    const network2Data = this.props.mails.pseudopolisEmails;
    const network3Data = this.props.mails.mendedDrumEmails;

    /* Get data points for charts */
    const getDataPointsForAllThreeNetworks = function () {
      let network1 = createNetworkData('Unseen', network1Data);
      let network2= createNetworkData('Pseudopolis', network2Data);
      let network3= createNetworkData('Mended Drum', network3Data);

      return ChartUtil.generateDataPointsForCharts(network1, network2, network3);
    };

    const getDataPointsForUnseenPseudopolisOverlapping = function () {
      let network1 = createNetworkData('Unseen', network1Data);
      let network2= createNetworkData('Pseudopolis', network2Data);

      return ChartUtil.generateDataPointsForCharts(network1, network2);
    };

    const getDataPointsForUnseenMendedDrumEmailsOverlapping = function () {
      let network1 = createNetworkData('Unseen', network1Data);
      let network2= createNetworkData('Mended Drum', network3Data);

      return ChartUtil.generateDataPointsForCharts(network1, network2);
    };

    const getDataPointsForPseudopolisMendedDrumEmailsOverlapping = function () {
      let network1 = createNetworkData('Pseudopolis', network2Data);
      let network2= createNetworkData('Mended Drum', network3Data);

      return ChartUtil.generateDataPointsForCharts(network1, network2);
    };

    return (
      <div className="drawing">
        <CanvasJSChart
          options={getOptionsForCanvas("Overlap Betweeen Social networks", getDataPointsForAllThreeNetworks())}
        />
        <CanvasJSChart options={
          getOptionsForCanvas("Overlap Betweeen Unseen and Pseudopolis networks", getDataPointsForUnseenPseudopolisOverlapping())
        }/>
        <CanvasJSChart options={
          getOptionsForCanvas("Overlap Between Unseen and Mended Drum networks", getDataPointsForUnseenMendedDrumEmailsOverlapping())
        }/>
        <CanvasJSChart options={
          getOptionsForCanvas("Overlap Between Pseudopolis and Mended Drum networks", getDataPointsForPseudopolisMendedDrumEmailsOverlapping())
        }/>

      </div>
    )
  }

}