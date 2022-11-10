// ORDER OF PARAMETERS
// #explModeValue=wlm&typology=57&dateFrom=2022-10-29&dateTo=2022-11-04&selectedTimeFramePar=Latest%207%20days&filterDataParams=photographed%3Atrue%3BinContest%3Atrue%3BonWiki%3Atrue&showDeltaPar=false&selectedRegion=Calabria&selectedProvince=Catanzaro&selectedMunicipality=Girifalco
// explorationModePar,
// filterDataParams,
// showDeltaPar,
// typology,
// selectedTimeFramePar,
// dateFrom,
// dateTo,
// selectedRegion,
// selectedProvince,
// selectedMunicipality,

export function readParams(asPath) {
  const paramString = asPath.split("#")[1];
  let parameters = {};
  if (paramString) {
    parameters = Object.fromEntries(
      paramString
        .split("&")
        .map((d) => d.split("=").map((dd) => decodeURIComponent(dd)))
    );
  }
  // console.log(parameters)
  return parameters;
}
