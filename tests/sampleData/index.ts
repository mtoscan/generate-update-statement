const document = {
  _id: 1,
  name: "Johnny Content Creator",
  posts: [
    {
      _id: 2,
      value: "one",
      mentions: []
    },
    {
      _id: 3,
      value: "two",
      mentions: [
        {
          _id: 5,
          text: "apple"
        },
        {
          _id: 6,
          text: "orange"
        }
      ]
    },
    {
      _id: 4,
      value: "three",
      mentions: []
    }
  ]
};

const addMutations = [
  {
    "posts": [
      {
        "value": "four"
      }
    ]
  },
  {
    "posts": [
      {
        "_id": 3,
        "mentions": [
          {
            "text": "banana"
          }
        ]
      }
    ]
  }
];

const updateMutations = [
  {
    posts: [
      {
        _id: 2,
        value: "too"
      }
    ]
  },
  {
    posts: [
      {
        _id: 3,
        mentions: [
          {
            _id: 5,
            text: "pear"
          }
        ]
      }
    ]
  }
];

const deleteMutations = [
  {
    posts: [
      {
        _id: 2,
        _delete: true
      }
    ]
  },
  {
    posts: [
      {
        _id: 3,
        mentions: [
          {
            _id: 6,
            _delete: true
          }
        ]
      }
    ]
  }
]

const anotherDocument = {
  _id: 1,
  name: "Site Name",
  menu: [
    {
      _id: 2,
      name: "Dashboard",
      pages: [
        {
          _id: 3,
          name: "Status",
          columns: [
            { height: 34, _id: 10 },
            { height: 18, _id: 20 },
            { height: 45, _id: 30 },
            { height: 59, _id: 40 },
          ],
        },
        {
          _id: 4,
          name: "Detail",
          columns: [
            { height: 34, _id: 50 },
            { height: 34, _id: 60 },
            { height: 34, _id: 70 },
          ],
        },
      ],
    },
    {
      _id: 5,
      name: "Settings",
      pages:[
        {
          _id: 6,
          name: "Account",
          columns: [
            { height: 34, _id: 80 },
            { height: 18, _id: 90 },
            { height: 45, _id: 100 },
            { height: 59, _id: 110 },
          ],
        },
        {
          _id: 7,
          name: "Site settings",
          columns: [
            { height: 34, _id: 120 },
            { height: 34, _id: 130 },
            { height: 34, _id: 140 },
          ],
        },
      ],
    }
  ]
}

const updateMutationforAnotherDocument = [
  {
    menu: [
      {
        _id: 5,
        name: "Configuration"
      }
    ]
  },
  {
    menu: [
      {
        _id: 2,
        pages: [
          {
            _id: 3,
            name: "Summary"
          }
        ]
      }
    ]
  },
  {
    menu: [
      {
        _id: 5,
        pages: [
          {
            _id: 7,
            columns: [
              {
                _id:110,
                height: 50,
              }
            ]

          }
        ]
      }
    ]
  }
]

export {
  document,
  anotherDocument,
  addMutations,
  deleteMutations,
  updateMutations,
  updateMutationforAnotherDocument
}