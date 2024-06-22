export function suggestStudyMethod(userPreferences, realTimeData, task) {
  let suggestedMethod;

  if (
    userPreferences.focusLevel === "High" &&
    realTimeData.noiseLevel === "Quiet"
  ) {
    suggestedMethod = "90-minute focus sessions";
  } else if (
    userPreferences.focusLevel === "Height" &&
    realTimeData.noiseLevel == "Noisy"
  ) {
    suggestedMethod = "52-17 method";
  } else if (
    userPreferences.focusLevel === "Low" &&
    realTimeData.noiseLevel == "Noisy" &&
    task == "High"
  ) {
    suggestedMethod = "3333";
  } else {
    suggestedMethod = "not match";
  }

  return suggestedMethod;
}
