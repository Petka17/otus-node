export const stringifyTree = (tree) =>
  [`${tree.name}`].concat(stringifyTreeItems(tree.items)).join('\n')

const stringifyTreeItems = (treeItems, levels = []) =>
  treeItems.reduce(
    (rows, item, index) => [
      ...rows,
      ...stringifyTreeItem(item, levels.concat(index + 1 === treeItems.length ? 0 : 1)),
    ],
    [],
  )

const stringifyTreeItem = (treeItem, levels) => [
  `${getLevelLines(levels)}-${treeItem.name}`,
  ...(treeItem.items ? stringifyTreeItems(treeItem.items, levels) : []),
]

const getLevelLines = (levels) =>
  levels
    .slice(0, -1)
    .map((level) => (level === 1 ? '| ' : '  '))
    .concat(levels.slice(-1).map((last) => (last === 1 ? '├' : '└')))
    .join('')
