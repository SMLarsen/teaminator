var unassigned;

// ArrayOfPersonIds, ArrayOfPairingObjects, Number -> ArrayOfGroups
// Initialize groups with pairs of unassigned members
function startGroups (pairings, numGroups) {
  var groups = [];
  for (var i = 0; i < numGroups; i++) {
    groups[i] = getUnassignedPair(pairings, unassigned);
    unassigned = unassigned.filter( (person) => person !== groups[i][0] && person !== groups[i][1] );
  }
  return groups;
}

function getUnassignedPair (pairings) {
  var pair = pairings.find((pairing) => 
    unassigned.indexOf(pairing.person1) > -1 && 
    unassigned.indexOf(pairing.person2) > -1);
  return [ pair.person1, pair.person2 ];
}

function setUnassigned(unassignedArr) {
  unassigned = unassignedArr;
}

// Assign new members to groups while unassigned exist
function fillGroups(groups, pairings) {
  var member;
  var i = 0;
  while(unassigned.length) {
    member = getNextMember(groups[i], pairings);
    groups[i].push(member);
    unassigned = unassigned.filter( (person) => person !== member );
    i = ++i % groups.length;
  }
  return groups;
}

function getNextMember(group, pairings) {
  var pairing = pairings.find((pairing) => {
    return (unassigned.indexOf(pairing.person1) > -1 && group.indexOf(pairing.person2) > -1) || 
           (unassigned.indexOf(pairing.person2) > -1 && group.indexOf(pairing.person1) > -1)
  });

  return unassigned.indexOf(pairing.person1) > -1 ? pairing.person1 : pairing.person2;
}

function makeGroups(unassignedArr, pairings, numGroups) {
  setUnassigned(unassignedArr);
  var groups = startGroups(pairings, numGroups);
  groups = fillGroups(groups, pairings);
  // console.log('Pair index:', pairCounter(groups, pairings));
  return groups;
}

function pairCounter(groups, pairings) {
  var pairIndex = [];
  var pairs = []; 
  for (var i = 0, len = groups.length; i < len; i++) {
    pairs = pairings.filter((pairing) => groups[i].indexOf(pairing.person1) > -1 && groups[i].indexOf(pairing.person2) > -1 )
    pairIndex.push(pairs.reduce(countPairs, 0));
  }
  return pairIndex;
}

function countPairs(total, pair) {
  return total += pair.pairings;
}

module.exports = {
  setUnassigned: setUnassigned,
  startGroups: startGroups,
  getUnassignedPair: getUnassignedPair,
  fillGroups: fillGroups,
  makeGroups: makeGroups,
  pairCounter: pairCounter
};
