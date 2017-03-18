var makeGroups = require('../server/modules/make-groups.js');

describe('Make Groups', function() {
  var pairings1 = [
    { person1: 1, person2: 2, pairings: 0 },
    { person1: 1, person2: 3, pairings: 0 },
    { person1: 1, person2: 4, pairings: 0 },
    { person1: 1, person2: 5, pairings: 0 },
    { person1: 1, person2: 6, pairings: 0 },
    { person1: 2, person2: 3, pairings: 0 },
    { person1: 2, person2: 4, pairings: 0 },
    { person1: 2, person2: 5, pairings: 0 },
    { person1: 2, person2: 6, pairings: 0 },
    { person1: 3, person2: 4, pairings: 0 },
    { person1: 3, person2: 5, pairings: 0 },
    { person1: 3, person2: 6, pairings: 0 },
    { person1: 4, person2: 5, pairings: 0 },
    { person1: 4, person2: 6, pairings: 0 },
    { person1: 5, person2: 6, pairings: 0 }
  ];
  
  var pairings2 = [
    { person1: 1, person2: 3, pairings: 0 },
    { person1: 1, person2: 4, pairings: 0 },
    { person1: 1, person2: 5, pairings: 0 },
    { person1: 1, person2: 6, pairings: 0 },
    { person1: 2, person2: 3, pairings: 0 },
    { person1: 2, person2: 4, pairings: 0 },
    { person1: 2, person2: 5, pairings: 0 },
    { person1: 2, person2: 6, pairings: 0 },
    { person1: 3, person2: 5, pairings: 0 },
    { person1: 3, person2: 6, pairings: 0 },
    { person1: 4, person2: 5, pairings: 0 },
    { person1: 4, person2: 6, pairings: 0 },
    { person1: 5, person2: 6, pairings: 0 },
    { person1: 1, person2: 2, pairings: 1 },
    { person1: 3, person2: 4, pairings: 1 },
  ];

  var pairings3 = [
    { person1: 1, person2: 3, pairings: 0 },
    { person1: 1, person2: 4, pairings: 0 },
    { person1: 1, person2: 5, pairings: 0 },
    { person1: 1, person2: 6, pairings: 0 },
    { person1: 1, person2: 7, pairings: 0 },
    { person1: 1, person2: 8, pairings: 0 },
    { person1: 2, person2: 3, pairings: 0 },
    { person1: 2, person2: 4, pairings: 0 },
    { person1: 2, person2: 5, pairings: 0 },
    { person1: 2, person2: 6, pairings: 0 },
    { person1: 2, person2: 7, pairings: 0 },
    { person1: 2, person2: 8, pairings: 0 },
    { person1: 3, person2: 5, pairings: 0 },
    { person1: 3, person2: 6, pairings: 0 },
    { person1: 3, person2: 7, pairings: 0 },
    { person1: 3, person2: 8, pairings: 0 },
    { person1: 4, person2: 5, pairings: 0 },
    { person1: 4, person2: 6, pairings: 0 },
    { person1: 4, person2: 7, pairings: 0 },
    { person1: 4, person2: 8, pairings: 0 },
    { person1: 5, person2: 6, pairings: 0 },
    { person1: 5, person2: 7, pairings: 0 },
    { person1: 5, person2: 8, pairings: 0 },
    { person1: 6, person2: 7, pairings: 0 },
    { person1: 6, person2: 8, pairings: 0 },
    { person1: 7, person2: 8, pairings: 0 },
    { person1: 1, person2: 2, pairings: 1 },
    { person1: 3, person2: 4, pairings: 1 },
  ];

  var unassigned = [1,2,3,4,5,6];

  // var startGroups = makeGroups.startGroups;
  // var getUnassignedPair = makeGroups.getUnassignedPair;

  describe('startGroups', function() {
    it('should add the first pairs to each group', function () {
      makeGroups.setUnassigned(unassigned);
      expect(makeGroups.startGroups(pairings1, 2)).toEqual([ [1,2], [3,4]]);

      makeGroups.setUnassigned(unassigned);
      expect(makeGroups.startGroups(pairings2, 2)).toEqual([ [1,3], [2,4]]);

      makeGroups.setUnassigned(unassigned);
      expect(makeGroups.startGroups(pairings2, 3)).toEqual([ [1,3], [2,4], [5,6]]);

    });

  });

  describe('getUnassignedPair', function() {
    it('should return an array of the people in the first unassigned pairing', function() {
      makeGroups.setUnassigned(unassigned);

      expect(makeGroups.getUnassignedPair(pairings1)).toEqual([1,2]);
      expect(makeGroups.getUnassignedPair(pairings2)).toEqual([1,3]);

    });
  });

  describe('fillGroups', function() {
    it('should fill groups with the remaining unassigned people', function () {
      makeGroups.setUnassigned([5,6]);
      expect(makeGroups.fillGroups([ [1,2], [3,4]], pairings1)).toEqual([ [1,2,5], [3,4,6] ]);

      makeGroups.setUnassigned([5,6]);
      expect(makeGroups.fillGroups([ [1,3], [2,4]], pairings2)).toEqual([ [1,3,5], [2,4,6] ]);
    })
  });

  describe('makeGroups', function() {
    it('should make a given number of groups', function () {
      expect(makeGroups.makeGroups([1,2,3,4,5,6], pairings1, 2)).toEqual([ [1,2,5], [3,4,6] ]);
      expect(makeGroups.makeGroups([1,2,3,4,5,6], pairings2, 2)).toEqual([ [1,3,5], [2,4,6] ]);
      expect(makeGroups.makeGroups([1,2,3,4,5,6,7,8], pairings3, 2)).toEqual([ [1,3,5,7], [2,4,6,8] ]);
      expect(makeGroups.makeGroups([1,2,3,4,5,6,7,8], pairings3, 3)).toEqual([ [1,3,7], [2,4,8], [5,6]]);
    })
  });

   var pairings4 = [
    { person1: 1, person2: 3, pairings: 0 },
    { person1: 1, person2: 4, pairings: 0 },
    { person1: 1, person2: 5, pairings: 0 },
    { person1: 1, person2: 6, pairings: 0 },
    { person1: 2, person2: 3, pairings: 1 },
    { person1: 2, person2: 4, pairings: 1 },
    { person1: 2, person2: 5, pairings: 1 },
    { person1: 2, person2: 6, pairings: 2 },
    { person1: 3, person2: 5, pairings: 2 },
    { person1: 3, person2: 6, pairings: 2 },
    { person1: 4, person2: 5, pairings: 3 },
    { person1: 4, person2: 6, pairings: 3 },
    { person1: 5, person2: 6, pairings: 3 },
    { person1: 1, person2: 2, pairings: 3 },
    { person1: 3, person2: 4, pairings: 3 },
  ];

  describe('pairCounter', function() {
    it('should return an array with the pair index for each group', function() {
      expect(makeGroups.pairCounter([ [1,2,5], [3,4,6] ], pairings4)).toEqual([ 4, 8 ]);
    });
  });

});
