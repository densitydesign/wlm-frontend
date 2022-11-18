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
  return parameters;
}

export function writeParams(props) {
  const parameters = {};
  if (props.explorationMode) {
    parameters.explorationModePar = encodeURIComponent(
      props.explorationMode.value
    );
  }
  if (props.showDelta !== undefined) {
    parameters.showDeltaPar = encodeURIComponent(props.showDelta);
  }
  if (props.filterData) {
    parameters.filterDataParams = encodeURIComponent(
      props.filterData.map((d) => d.label + ":" + d.active.toString()).join(";")
    );
  }
  if (props.typology) {
    parameters.typologyId = encodeURIComponent(props.typology.id);
  }
  if (props.selectedTimeFrame) {
    parameters.selectedTimeFrameLabel = encodeURIComponent(
      props.selectedTimeFrame.label
    );
  }
  // not useful
  // if (props.dateFrom) {
  //   parameters.dateFrom = encodeURIComponent(props.dateFrom);
  // }
  // if (props.dateTo) {
  //   parameters.dateTo = encodeURIComponent(props.dateTo);
  // }

  if (props.selectedRegion) {
    parameters.selectedRegionLabel = encodeURIComponent(
      props.selectedRegion.label
    );
  }
  if (props.selectedProvince) {
    parameters.selectedProvinceLabel = encodeURIComponent(
      props.selectedProvince.label
    );
  }
  if (props.selectedMunicipality) {
    parameters.selectedMunicipalityLabel = encodeURIComponent(
      props.selectedMunicipality.label
    );
  }

  //
  const temp = [];
  for (const key in parameters) {
    temp.push(key + "=" + parameters[key]);
  }
  const hashUrl = "#" + temp.join("&");
  location.replace(hashUrl);
}

// {
//   explorationModePar,
//   filterDataParams,
//   showDeltaPar,
//   typology,
//   selectedTimeFramePar,
//   dateFrom,
//   dateTo,
//   selectedRegion,
//   selectedProvince,
//   selectedMunicipality,
// }
