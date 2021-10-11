import _ from 'lodash'

/**
 * Global helper methods available for use in Nunjucks templates
 */
export default (env) => {
  const globals = {}

  globals.nextSection = (logId) => ({
    text: 'Household characteristics',
    href: `/logs/${logId}/household-characteristics`
  })

  globals.taskListSections = function (logId) {
    const { logs, groups, sections } = this.ctx.data
    const log = logs.find(log => log.id === logId)

    const taskListItem = (section) => {
      const sectionId = _.kebabCase(section.title)
      return {
        id: sectionId,
        text: section.title,
        href: `/logs/${log.id}/${sectionId}`,
        tag: {
          text: log?.[sectionId]?.completed ? 'Completed' : 'Not started',
          colour: log?.[sectionId]?.completed ? false : 'grey'
        }
      }
    }

    const taskListSections = []
    for (const group of groups) {
      taskListSections.push({
        titleText: group.title,
        items: sections
          .filter(section => section.group === group.id)
          .map(section => taskListItem(section))
      })
    }

    return taskListSections
  }

  return globals
}
