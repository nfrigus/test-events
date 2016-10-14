module.exports = {
  "example": [
    // `start` & `duration` are measured in minutes
    // `start: 0` is 8:00a
    {start: 0,  duration: 15, title: "Exercise"},
    {start: 25, duration: 30, title: "Travel to work"},
    {start: 30, duration: 30, title: "Plan day"},
    {start: 60, duration: 15, title: "Review yesterday's commits"},
    {start: 100,  duration: 15, title: "Code review"},
    {start: 180,  duration: 90, title: "Have lunch with John"},
    {start: 360,  duration: 30, title: "Skype call"},
    {start: 370,  duration: 45, title: "Follow up with designer"},
    {start: 405,  duration: 30, title: "Push up branch"},
  ],
  "example_ordered": [
    [
      [{start: 0,  duration: 15, title: "Exercise"}],
    ], [
      [{start: 25, duration: 30, title: "Travel to work"}],
      [{start: 30, duration: 30, title: "Plan day"}],
    ], [
      [{start: 60, duration: 15, title: "Review yesterday's commits"}],
    ], [
      [{start: 100,  duration: 15, title: "Code review"}],
    ], [
      [{start: 180,  duration: 90, title: "Have lunch with John"}],
    ], [
      [
        {start: 360,  duration: 30, title: "Skype call"},
        {start: 405,  duration: 30, title: "Push up branch"}
      ],
      [{start: 370,  duration: 45, title: "Follow up with designer"}],
    ]
  ],
  "sort": {
    "unsorted": [
      {start: 100, duration: 15},
      {start: 99, duration: 30},
      {start: 100, duration: 10},
    ],
    "sorted": [
      {start: 99, duration: 30},
      {start: 100, duration: 10},
      {start: 100, duration: 15},
    ]
  },
  "intersect": {
    "two_rows": [
      {start: 0, duration: 10},
      {start: 5, duration: 10},
      {start: 10, duration: 10},
      {start: 15, duration: 10},
    ]
  }
}
