export function newTBD(){
  return {
    format: 'tbd'
  };
}

export function newStage(stageIndex){
  return {
    name: 'Stage ' + (stageIndex + 1),
    groups: [
      newTBD()
    ],
    notes: [],
    status: 'Upcoming',
    location: '',
    startAt: '',
    expand: true
  };
}

export function newT(){
  return {
    id: '',
    name: '',
    sport: '',
    city: '',
    geoPoint: null,
    startAt: null,
    finished: false,
    //tier: 0,
    bgPic: null,
    //like: 0,
    info: {
      brief: '',
      organizer: '',
      sponsors: [],
      prize: '',
      format: '',
      notes: [],
      duration: 0,
      address: ''
    },
    creatorId: '',
    //creator: null,
    players: [],
    results: {
      stages: [
        newStage(0)
      ]
    }
  };
}

export function newRoundRobin(groupIndex, numOfScoreRow, numOfMatches){
  var scores= [];
  for (var i = 0; i < numOfScoreRow; i++){
    scores[i] = newScoreRow();
  }
  var matches= [];
  for (var i = 0; i < numOfMatches; i++){
    matches[i] = newMatch();
  }
  return {
    name: 'Group ' + (groupIndex + 1),
    format: 'roundRobin',
    status: 'Upcoming',
    startAt: '',
    location: '',
    notes: [],
    players: [],
    scores: scores,
    matches: matches
  };
}

export function newScoreRow(){
  return {
    icon: '',
    sn: -1,
    score: '',
    points: '',
    color: 0,
    notes: ''
  };
}

export function newMatch(){
  return {
    notes: '',
    color: 0,
    status: 'Upcoming',
    startAt: '',
    location: '',
    players: [
      {
        icon: '',
        sn: -1,
        color: '',
        points: '0'
      },
      {
        icon: '',
        sn: -1,
        color: '',
        points: '0'
      }
    ],
    games: [
      newGameOfMatch()
    ]
  };
}

export function newGameOfMatch(){
  return {
    leftProperty: '',
    leftColor: 0,
    set: '',
    rightColor: 0,
    rightProperty: ''
  };
}

export function newElimination(groupIndex, format, sizeOfGroup, numOfMatches, numofLabels){
  var matches = [];
  var labels = [];
  numOfMatches = numOfMatches ? numOfMatches : sizeOfGroup - 1;
  numofLabels = numofLabels ? numofLabels : Math.log2(sizeOfGroup);
  var numofLabels = Math.log2(sizeOfGroup) * 3;
  for (var i = 0; i < numOfMatches; i++){
    matches[i] = newMatch();
  }
  for (var i = 0; i < numofLabels; i++){
    labels[i] = {
      title: '',
      color: ''
    };
  }
  return {
    name: 'Group ' + (groupIndex + 1),
    format: format,
    status: 'Upcoming',
    startAt: '',
    location: '',
    notes: [],
    players: [],
    labels: labels,
    matches: matches
  };
}

export function newDoubleElimination(groupIndex, format, sizeOfGroup){
  var numOfMatches = (sizeOfGroup - 1) * 2;
  var numofLabels = Math.log2(sizeOfGroup) * 3;
  return newElimination(groupIndex, format, sizeOfGroup, numOfMatches, numofLabels);
}
