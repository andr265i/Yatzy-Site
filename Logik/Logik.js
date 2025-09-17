export * from "./Logik.js";

// Face values of the 5 dice.
// 1 <= values[i] <= 6.
export let values = [0, 0, 0, 0, 0];
// Number of times the 5 dice have been thrown.
// 0 <= throwCount <= 3.
export let throwCount = 0;

export let holds = [false, false, false, false, false, false];

/**
 * Sets the 5 face values of the dice. Pre: values contains 5 face values in
 * [1..6]. Note: This method is only meant to be used for test, and
 * therefore has package visibility.
 */
export function setValues(values) {
  for (let i = 0; i < 5; i++) {
    values[i] = values[i];
  }
}

/**
 * Resets the throw count.
 */
export function resetThrowCount() {
  throwCount = 0;
}

/**
 * Rolls the 5 dice. Only roll dice that are not hold. Pre: holds contain 5
 * boolean values.
 */
export function throwDice(holds) {
  for (let i = 0; i < 5; i++) {
    if (!holds[i]) {
      values[i] = Math.floor(Math.random() * 6) + 1;
    }
  }
  throwCount++;
}

/**
 * Return all results possible with the current face values.<br/>
 * The order of the results is the same as on the score board.<br/>
 * Note: This is an optional method. Comment this method out,<br/>
 * if you don't want use it.
 */
export function getResults() {
  let results = Array(15).fill(0); //let results = new int[15]();
  for (let i = 0; i <= 5; i++) {
    results[i] = this.sameValuePoints(i + 1);
  }
  results[6] = this.onePairPoints();
  results[7] = this.twoPairPoints();
  results[8] = this.threeSamePoints();
  results[9] = this.fourSamePoints();
  results[10] = this.fullHousePoints();
  results[11] = this.smallStraightPoints();
  results[12] = this.largeStraightPoints();
  results[13] = this.chancePoints();
  results[14] = this.yatzyPoints();

  return results;
}

// -------------------------------------------------------------------------

// Return an int[7] containing the frequency of face values.
// Frequency at index v is the number of dice with the face value v, 1 <= v <= 6.
// Index 0 is not used.
// Note: This method can be used in several of the following methods.
export function frequency() {
  let faceFrequency = Array(7).fill(0); // Ændret her fra []
  for (let i = 0; i < 5; i++) {
    faceFrequency[values[i]]++;
  }
  return faceFrequency;
}

/**
 * Return same-value points for the given face value.<br/>
 * Returns 0, if no dice has the given face value.<br/>
 * Pre: 1 <= value <= 6;
 */
export function sameValuePoints(value) {
  let freq = frequency();
  let points = 0;

  if (freq[value] > 0) {
    points = freq[value] * value;
  }

  return points;
}

/**
 * Return points for one pair (for the face value giving the highest points).<br/>
 * Return 0, if there aren't 2 dice with the same face value.
 */
export function onePairPoints() {
  let freq = frequency(); //Ændret frequency freq man må ikke kalde det det samme som funktionen
  let points = 0;

  for (let i = 1; i < 7; i++) {
    if (freq[i] >= 2) {
      points = i * 2;
    }
  }
  return points;
}

/**
 * Return points for two pairs<br/>
 * (for the 2 face values giving the highest points).<br/>
 * Return 0, if there aren't 2 dice with the same face value<br/>
 * and 2 other dice with the same but different face value.
 */
export function twoPairPoints() {
  let freq = frequency();
  let lowPair = 0;
  let highPair = 0;
  let points = 0;

  for (let i = 6; i >= 1; i--) {
    if (freq[i] >= 2) {
      if (highPair === 0) {
        highPair = i * 2;
        if (freq[i] >= 4) {
          lowPair = i * 2;
        }
      } else if (lowPair === 0) {
        lowPair = i * 2;
      }
    }
  }
  if (lowPair > 0 && highPair > 0) {
    points = lowPair + highPair;
  }
  return points;
}

/**
 * Return points for 3 of a kind.<br/>
 * Return 0, if there aren't 3 dice with the same face value.
 */
export function threeSamePoints() {
  let freq = frequency();
  let points = 0;

  for (let i = 1; i < 7; i++) {
    if (freq[i] >= 3) {
      points = i * 3;
    }
  }
  return points;
}

/**
 * Return points for 4 of a kind.<br/>
 * Return 0, if there aren't 4 dice with the same face value.
 */
export function fourSamePoints() {
  let freq = frequency();
  let points = 0;

  for (let i = 1; i < 7; i++) {
    if (freq[i] >= 4) {
      points = i * 4;
    }
  }
  return points;
}

/**
 * Return points for full house.<br/>
 * Return 0, if there aren't 3 dice with the same face value<br/>
 * and 2 other dice with the same but different face value.
 */
export function fullHousePoints() {
  let freq = frequency();
  let treeOFAKind = 0;
  let twoOfAKind = 0;
  let points = 0;

  for (let i = 1; i < 7; i++) {
    if (freq[i] == 2) {
      twoOfAKind = i * 2;
    } else if (freq[i] == 3) {
      treeOFAKind = i * 3;
    }
  }

  if (treeOFAKind > 0 && twoOfAKind > 0) {
    points = treeOFAKind + twoOfAKind;
  }
  return points;
}

/**
 * Return points for small straight.<br/>
 * Return 0, if the dice aren't showing 1,2,3,4,5.
 */
export function smallStraightPoints() {
  let smallStraight = frequency();
  let points = 0;
  let isStraight = true;

  for (let i = 1; i <= 5; i++) {
    if (smallStraight[i] != 1) {
      isStraight = false;
    }
  }

  if (isStraight) {
    points = 15;
  }
  return points;
}

/**
 * Return points for large straight.<br/>
 * Return 0, if the dice aren't showing 2,3,4,5,6.
 */
export function largeStraightPoints() {
  let largeStraight = frequency();
  let points = 0;
  let isStraight = true;

  for (let i = 2; i <= 6; i++) {
    if (largeStraight[i] != 1) {
      isStraight = false;
    }
  }

  if (isStraight) {
    points = 20;
  }
  return points;
}

/**
 * Return points for chance (the sum of face values).
 */
export function chancePoints() {
  let points = 0;

  for (let i = 0; i < 5; i++) {
    points += values[i];
  }
  return points;
}

/**
 * Return points for yatzy (50 points).<br/>
 * Return 0, if there aren't 5 dice with the same face value.
 */
export function yatzyPoints() {
  let points = 0;
  let freq = frequency();

  for (let i = 1; i < 7; i++) {
    if (freq[i] == 5) {
      points = 50;
    }
  }
  return points;
}

//let holds = [false, false, false, false, false, false];

//throwDice(holds);

//for (let i = 0; i < values.length; i++) {
//  console.log(values[i]);
//}

//console.log(sameValuePoints(2));

//console.log(onePairPoints());
//console.log(twoPairPoints());
//console.log(threeSamePoints());
//console.log(fourSamePoints());
//console.log(fullHousePoints());
//console.log(smallStraightPoints());
//console.log(largeStraightPoints());
//console.log(chancePoints());
//console.log(yatzyPoints());

//Ændret Ændret frequency freq man må ikke kalde det det samme som funktionen og funktion Frcequancy første linje til:  let faceFrequency = Array(7).fill(0);
