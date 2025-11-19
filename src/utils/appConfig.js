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
    when: '',
    expand: true
  };
}

export function newT(){
  return {
    id: '',
    name: '',
    location: '',
    status: 'Upcoming',
    brief: '',
    sport: '',
    series: '',
    organizer: '',
    sponsors: [],
    format: '',
    prize: {},
    when: '',
    duration: '',
    others: '',
    tier: '',
    polularity: {
      view: 0,
      like: 0,
      share: 0
    },
    creator: '',
    editors: [],
    players: [],
    stages: [
      newStage(0)
    ]
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
    when: '',
    location: '',
    players: [],
    scores: scores,
    matches: matches,
    notes: []
  };
}

export function newScoreRow(){
  return {
    icon: '',
    tid: -1,
    score: '',
    points: '',
    color: 0,
    notes: ''
  };
}

export function newMatch(){
  return {
    note: '',
    color: 0,
    status: 'Upcoming',
    when: '',
    location: '',
    players: [
      {
        icon: '',
        tid: -1,
        color: '',
        points: '0'
      },
      {
        icon: '',
        tid: -1,
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
  }
}
