export default class Util {
  static calculateOverlapBetween3Arrays = (network1, network2, network3) => {
    return (network1.filter(val => network2.includes(val))).filter(val => network3.includes(val));
  };
  static calculatePercentageOfOverlapBetween3 = (network1, network2, network3) => {
    let overLapBetweenAll = (network1.filter(val => network2.includes(val))).filter(val => network3.includes(val)).length;
    return ((overLapBetweenAll / (network1.length + network2.length + network3.length) * 100) + "%");
  };
  static calculateNetworkDataWithoutOverlapping = (networkData, overlapAllData) => {
    return networkData.length - overlapAllData.filter(val => networkData.includes(val)).length;
  };

  static calculateOverlapBetween2 = (network1, network2) => {
    return  network1.filter(val => network2.includes(val));
  };

  static calculateOverlapPercentageBetween2 = (network1, network2) => {
    let overlap = network1.filter(val => network2.includes(val));
    return (overlap.length / (network1.length + network2.length) * 100) + "%";
  };
};

