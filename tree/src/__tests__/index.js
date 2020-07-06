import { stringifyTree } from '../index.js'

test('tree stringigy work as expected', () => {
  const tree = {
    name: 1,
    items: [
      {
        name: 2,
        items: [
          {
            name: 3,
          },
          {
            name: 4,
            items: [
              {
                name: 9,
              },
            ],
          },
          {
            name: 7,
          },
        ],
      },
      {
        name: 5,
        items: [
          {
            name: 6,
          },
        ],
      },
    ],
  }

  expect(stringifyTree(tree)).toMatchSnapshot()
})

