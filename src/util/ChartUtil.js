import Util from "./Util";

const createDataPointRow = (label, data) => {
  return {
    y: label,
    indexLabel: data
  };
};

const createNetworkChartObject = (network, overlapBetweenNetworks) =>
{
  let networkDataWithoutOverlapping = Util.calculateNetworkDataWithoutOverlapping(network.data, overlapBetweenNetworks);
  return  {label: network.name, data: networkDataWithoutOverlapping}
};
const getDataPointsForOverlapping = function (label, overlapData, network1DataWithoutOverlappingData,
                                                                         network2DataWithoutOverlappingData, network3DataWithoutOverlappingData) {
  let dataPoints = [];
  dataPoints.push(createDataPointRow(overlapData.length, label));
  dataPoints.push(createDataPointRow(Number(network1DataWithoutOverlappingData.data), network1DataWithoutOverlappingData.label));
  dataPoints.push(createDataPointRow(Number(network2DataWithoutOverlappingData.data), network2DataWithoutOverlappingData.label));
  if (network3DataWithoutOverlappingData)
    dataPoints.push(createDataPointRow(Number(network2DataWithoutOverlappingData.data), network3DataWithoutOverlappingData.label));

  return dataPoints;
};

export default class ChartUtil {
  static generateDataPointsForCharts = (network1, network2, network3) => {
    let label;
    let overlapBetweenNetworks;
    let overlapPercentageBetweenNetworks;
    let network3DataWithoutOverlappingData;
    /* Check if calculation needs to be done for 3 or 2 networks*/
    if (network3) {
      overlapBetweenNetworks = Util.calculateOverlapBetween3Arrays(network1.data, network2.data, network3.data);
      overlapPercentageBetweenNetworks = Util.calculatePercentageOfOverlapBetween3(network1.data, network2.data, network3.data);
      label = "Overlap Between " + network1.name + ", " + network2.name + " and " + network3.name + " networks (" + overlapPercentageBetweenNetworks + ")";
      network3DataWithoutOverlappingData = createNetworkChartObject(network3, overlapBetweenNetworks);
    }
    else {
      overlapBetweenNetworks = Util.calculateOverlapBetween2(network1.data, network2.data);
      overlapPercentageBetweenNetworks = Util.calculateOverlapPercentageBetween2(network1.data, network2.data);
      label = "Overlap Between " + network1.name + " and " + network2.name + " networks (" + overlapPercentageBetweenNetworks + ")";
    }

    let network1DataWithoutOverlappingData = createNetworkChartObject(network1, overlapBetweenNetworks);
    let network2DataWithoutOverlappingData = createNetworkChartObject(network2, overlapBetweenNetworks);


    return getDataPointsForOverlapping(label, overlapBetweenNetworks,
      network1DataWithoutOverlappingData, network2DataWithoutOverlappingData, network3DataWithoutOverlappingData);
  }
};


