export function suggestStudyMethod(userPreferences, realTimeData, task) {
  let suggestedMethod;

  const noise = realTimeData.noiseLevel;
  const complexity = task.complexity;
  const chronotype = userPreferences.chronotype;
  const stress = realTimeData.stressLevel;

  const currentHour = new Date().getHours();
  //morning (6 AM to 12 PM)
  const isMorning = currentHour >= 6 && currentHour < 12;
  // night (8 PM to 2 AM)
  const isNight = currentHour >= 20 || currentHour < 2;

  if (
    (chronotype === "early_bird" && isMorning) ||
    (chronotype === "night_owl" && isNight)
  ) {
    if (complexity !== "high") {
      if (noise === "noisy" || stress === "high") {
        suggestedMethod = "Pomodoro Technique";
      } else {
        suggestedMethod = "90-minute focus method";
      }
    } else {
      suggestedMethod = "52-17 method";
    }
  } else if (
    (chronotype === "early_bird" && isNight) ||
    (chronotype === "night_owl" && isMorning)
  ) {
    if (complexity !== "high") {
      if (noise === "noisy" || stress === "high") {
        suggestedMethod = "52-17 method";
      } else {
        suggestedMethod = "Pomodoro Technique";
      }
    } else {
      suggestedMethod = "90-minute focus method";
    }
  }

  return suggestedMethod;
}
