function NewT(){
  return {
    "id": "",
    "name": "",
    "brief": "",
    "sport": "",
    "series": "",
    "organizer": "",
    "sponsors": {},
    "format": "",
    "prize": {},
    "startDate": "",
    "duration": "",
    "others": "",
    "tier": "",
    "players": [

    ],
    "stages": [
      {
        "name": "",
        "groups": [
          {
            "format": "tbd"
          }
        ]
      }
    ]
  };
}

function NewGroupDual(){
  return {
    name: "Group " + (this.props.groupIndex + 1),
    format: "groupDual",
    when: "",
    location: "",
    links: {},
    scores: [
      {
        icon: "",
        tid: "",
        score: 0,
        points: 0,
        color: ""
      }
    ],
    matches: [
      {
        icon: "",
        note: "",
        players: [
          {
            tid: "",
            name: "",
            color: ""
          },
          {
            tid: "",
            name: "",
            color: ""
          }
        ]
      }
    ]
  };
}

export var NewT;
export var NewGroupDual;
