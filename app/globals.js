import sections from './data/sections.js'

/**
 * Global helper methods available for use in Nunjucks templates
 */
export default (env) => {
  const globals = {}

  const tagStatuses = {
    notStarted: {
      id: 'notStarted',
      text: 'Not started',
      colour: 'grey',
      canStart: true
    },
    inProgress: {
      id: 'inProgress',
      text: 'In progress',
      colour: 'blue',
      canStart: true
    },
    completed: {
      id: 'completed',
      text: 'Completed',
      canStart: true
    },
    cannotStart: {
      id: 'cannotStart',
      text: 'Cannot start yet',
      colour: 'grey'
    }
  }

  globals.nextSection = (logId) => ({
    text: 'About this log',
    href: `/logs/${logId}/about-this-log`
  })

  globals.taskListSections = function (logId) {
    const { logs, groups } = this.ctx.data
    const log = logs[logId]

    const taskListItem = (section) => {
      let status

      switch (section.id) {
        case 'about-this-log':
          if (log[section.id]?.completed === 'true') {
            status = 'completed'
          } else {
            status = 'notStarted'
          }
          break
        case 'declaration':
          status = 'cannotStart'
          break
        default:
          if (log['about-this-log']?.completed === 'true') {
            if (log[section.id]?.completed === 'true') {
              status = 'completed'
            } else if (log[section.id] === undefined) {
              status = 'notStarted'
            } else {
              status = 'inProgress'
            }
          } else {
            status = 'cannotStart'
          }
          break
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
