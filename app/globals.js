import { sections as getSections } from './data/sections.js'
import * as utils from './utils.js'

/**
 * Prototype specific global functions for use in Nunjucks templates.
 */
export default () => {
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

  globals.nextSection = function (logId) {
    const { logs } = this.ctx.data

    const log = utils.getEntityById(logs, logId)
    const sections = getSections(log)
    const incompleteSections = []

    for (const section of sections) {
      // Get sections that are not complete
      // Only return sections with paths (i.e. sections in the prototype)
      if (log[section.id]?.completed !== 'true' && section.paths) {
        incompleteSections.push({
          id: section.id,
          title: section.title
        })
      }
    }

    return incompleteSections[1]
  }

  globals.taskListSections = function (logId) {
    const { logs, groups } = this.ctx.data
    const log = logs[logId]

    const taskListItem = (section) => {
      let status

      switch (section.id) {
        case 'tailor-log':
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
          if (log['tailor-log']?.completed === 'true') {
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
        href: status !== 'cannotStart' ? href : false,
        tag: tagStatuses[status]
      }
    }

    const taskListSections = []
    for (const group of groups) {
      taskListSections.push({
        titleText: group.title,
        items: getSections(log)
          .filter(section => section.group === group.id)
          .map(section => taskListItem(section))
      })
    }

    return taskListSections
  }

  /**
   * Generate action link(s)
   *
   * @param {Array|object} actions List of actions
   * @returns object Value for `actions` parameter
   */
  globals.actionLinks = actions => {
    const items = []

    actions = Array.isArray(actions) ? actions : [actions]
    actions.forEach(action => {
      items.push({
        href: action.href,
        text: action.text ? action.text : 'Change',
        visuallyHiddenText: action.text ? false : action.visuallyHiddenText
      })
    })

    return { items }
  }

  return globals
}
