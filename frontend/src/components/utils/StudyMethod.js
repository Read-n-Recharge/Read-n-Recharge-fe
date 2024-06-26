export function suggestStudyMethod(userPreferences, realTimeData, task) {
  let suggestedMethod;

  const noise = realTimeData.noiseLevel;
  const chronotype = userPreferences.chronotype;
  const stress = realTimeData.stressLevel;
  const complexity = task.complexity;

  const currentHour = new Date().getHours();
  //morning (6 AM to 12 PM)
  const isMorning = currentHour >= 6 && currentHour < 12;
  // night (8 PM to 2 AM)
  const isNight = currentHour >= 20 || currentHour < 2;

  if (
    (chronotype === "early_bird" && isMorning) ||
    (chronotype === "night_owl" && isNight)
  ) {
    if (complexity === "normal" || complexity === "low") {
      if (noise === "noisy" || stress === "high") {
        suggestedMethod = "Pomodoro Technique";
      } else {
        suggestedMethod = "90-minute focus method";
      }
    } else {
      suggestedMethod = "Pomodoro Technique";
    }
  }
  //Early bird at night or night owl in the morning
  else if (
    (chronotype === "early_bird" && isNight) ||
    (chronotype === "night_owl" && isMorning)
  ) {
    if (complexity === "normal" || complexity === "low") {
      if (noise === "noisy" || stress === "high") {
        suggestedMethod = "Pomodoro Technique";
      } else {
        suggestedMethod = "52-17 method";
      }
    } else {
      suggestedMethod = "90-minute focus method";
    }
  }
  // Default condition
  else {
    if (complexity === "normal") {
      suggestedMethod = "52-17 method";
    } else {
      suggestedMethod = "Pomodoro Technique";
    }
  }

  return suggestedMethod;
}
