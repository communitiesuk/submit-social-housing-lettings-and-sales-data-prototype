import { getEntryById } from './utils.js'

/**
 * Global helper methods available for use in Nunjucks templates
 */
export default (env) => {
  const globals = {}

  const tagStatuses = {
    notStarted: {
      text: 'Not started',
      colour: 'grey'
    },
    inProgress: {
      text: 'In progress',
      colour: 'blue'
    },
    completed: {
      text: 'Completed'
    }
  }

  globals.nextSection = (logId) => ({
    text: 'Household characteristics',
    href: `/logs/${logId}/household-characteristics`
  })

  globals.taskListSections = function (logId) {
    const { logs, groups, sections } = this.ctx.data

    const taskListItem = (section) => {
      console.log('sectionData', logs[logId])

      let status
      if (logs[logId][section.id] === undefined) {
        status = 'notStarted'
      } else if (logs[logId][section.id]?.completed === 'true') {
        status = 'completed'
      } else {
        status = 'inProgress'
      }

      return {
        id: section.id,
        text: section.title,
        href: `/logs/${logId}/${section.id}`,
        tag: tagStatuses[status]
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
