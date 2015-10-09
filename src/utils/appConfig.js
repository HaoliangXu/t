function newTBD( groupNumber ){
  return {
    name: 'Group ' + groupNumber,
    format: 'groupDual',
    when: '',
    location: '',
    links: {},
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
    ]
  };
}
function newT(){
  return {
    'id': '',
    'name': '',
    'brief': '',
    'sport': '',
    'series': '',
    'organizer': '',
    'sponsors': {},
    'format': '',
    'prize': {},
    'startDate': '',
    'duration': '',
    'others': '',
    'tier': '',
    'players': [

    ],
    'stages': [
      {
        'name': 'Stage 1',
        'groups': [
          {
            'format': 'tbd'
          }
        ]
      }
    ]
  };
}

function newGroupDual(){
  return {
    name: 'Group ' + (this.props.groupIndex + 1),
    format: 'groupDual',
    when: '',
    location: '',
    links: {},
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
    ]
  };
}

export {newT, newGroupDual, newTBD};
