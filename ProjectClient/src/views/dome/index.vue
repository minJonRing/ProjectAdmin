<script>
export default {
  name: 'Dome',
  setup() {
    let list = [
      {
        value: 1,
        label: '1',
        parentId: 0,
        problem: [{ name: '问题4', parentId: 1 }],
        children: [
          {
            value: 2,
            label: '2',
            parentId: 1,
            problem: [{ name: '问题1', parentId: 2 }],
            children: [
              {
                value: 3,
                label: '3',
                parentId: 2,
                problem: [
                  { name: '问题2', parentId: 3 },
                  { name: '问题3', parentId: 3 },
                  { name: '问题4', parentId: 3 }
                ]
              },
              {
                value: 4,
                label: '4',
                parentId: 2,
                problem: [
                  { name: '问题2', parentId: 4 },
                  { name: '问题3', parentId: 4 }
                ]
              }
            ]
          }
        ]
      },
      {
        value: 8,
        label: '8',
        parentId: 0,
        children: [
          {
            value: 9,
            label: '9',
            parentId: 8,
            children: [
              {
                value: 11,
                label: '11',
                parentId: 9,
                problem: [
                  { name: '问题2', parentId: 11 },
                  { name: '问题3', parentId: 11 },
                  { name: '问题4', parentId: 11 }
                ]
              },
              {
                value: 14,
                label: '14',
                parentId: 9,
                problem: [
                  { name: '问题2', parentId: 14 },
                  { name: '问题3', parentId: 14 }
                ]
              }
            ]
          }
        ]
      }
    ]

    const generate = list => {
      return list.map(el => {
        const { children, problem } = el
        let option = {
          problem: [],
          ...el
        }
        if (children) {
          option = {
            ...option,
            problem: [...option.problem, ...filter(children)].sort(
              (x, y) => x.parentId - y.parentId
            ),
            children: generate(children)
          }
        }
        return option
      })
    }

    const filter = data => {
      let list = []
      for (let el of data) {
        const { problem, children } = el
        if (problem) {
          list = [...list, ...problem]
        }
        if (children) {
          list = [...list, ...filter(children)]
        }
      }
      return list
    }

    const _list = generate(list)
  }
}
</script>

<template>
  <div class="dome">

  </div>
</template>
