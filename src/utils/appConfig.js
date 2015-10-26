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
    status: '',
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
    players: [

    ],
    stages: [
      newStage(0)
    ]
  };
}

export function newGroupDual(groupIndex){
  return {
    name: 'Group ' + (groupIndex + 1),
    format: 'groupDual',
    status: 'Upcoming',
    when: '',
    location: '',
    scores: [
      {
        icon: '',
        tid: '',
        score: 0,
        points: 0,
        color: ''
      }
    ],
    matches: [
      {
        icon: '',
        note: '',
        players: [
          {
            tid: '',
            name: '',
            color: ''
          },
          {
            tid: '',
            name: '',
            color: ''
          }
        ]
      }
    ],
    notes: []
  };
}
