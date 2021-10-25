import sections from './data/sections.js'

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
    const { logs, groups } = this.ctx.data
    const log = logs[logId]

    const taskListItem = (section) => {
      let status
      if (log[section.id] === undefined) {
        status = 'notStarted'
      } else if (log[section.id]?.completed === 'true') {
        status = 'completed'
      } else {
        status = 'inProgress'
      }

      const href = section.paths ? `/logs/${log.id}/${section.id}` : '#'

      return {
        id: section.id,
        text: section.title,
        href,
        tag: tagStatuses[status]
      }
    }

    const taskListSections = []
    for (const group of groups) {
      taskListSections.push({
        titleText: group.title,
        items: sections(log)
          .filter(section => section.group === group.id)
          .map(section => taskListItem(section))
      })
    }

    return taskListSections
  }

  return globals
}
