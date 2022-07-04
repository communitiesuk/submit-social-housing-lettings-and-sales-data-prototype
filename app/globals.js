import { sections as getSections } from './data/sections.js'
import data from './data.js'
import * as utils from './utils.js'

const sessionData = await data() // eslint-disable-line

/**
 * Prototype specific global functions for use in Nunjucks templates.
 */
export default () => {
  const globals = {}

  globals.incompleteSections = function (logId, logsObject = false) {
    const logs = logsObject || this.ctx.data.logs
    const log = utils.getFromObjectById(logs, logId)
    const sections = getSections(log)
    const incompleteSections = []

    for (const section of sections) {
      // Get sections that are not complete
      // Only return sections with paths (i.e. sections in the prototype)
      if (log[section.id]?.completed !== 'true') {
        incompleteSections.push({
          id: section.id,
          title: section.title
        })
      }
    }

    return incompleteSections
  }

  globals.taskListSections = function (logId) {
    const { logs, groups } = this.ctx.data
    const log = logs[logId]
    const incompleteSections = globals.incompleteSections(logId, logs)

    const canSubmit = incompleteSections[0]?.id === 'submit'

    const taskListItem = (section) => {
      let status
      let href = `/logs/${log.id}/${section.id}`

      switch (section.id) {
        case 'setup':
          if (log[section.id]?.completed === 'true') {
            status = 'completed'
          } else {
            status = 'notStarted'
          }
          break
        case 'submit':
          if (log[section.id]?.completed === 'true') {
            status = 'completed'
          } else {
            href = canSubmit ? section.paths[0] : false
            status = canSubmit ? 'notStarted' : 'cannotStart'
          }
          break
        default:
          if (log.setup?.completed === 'true') {
            if (log[section.id]?.completed === 'true') {
              status = 'completed'
            } else if (log[section.id] === undefined) {
              status = 'notStarted'
            } else {
              status = 'inProgress'
            }
          } else {
            href = false
            status = 'cannotStart'
          }
          break
      }

      return {
        id: section.id,
        text: section.title,
        href,
        tag: sessionData.statuses[status]
      }
    }

    let taskListSections = []
    for (const group of groups) {
      taskListSections.push({
        titleText: group.title,
        items: getSections(log)
          .filter(section => section.group === group.id)
          .map(section => taskListItem(section))
      })
    }

    // Remove groups with no sections (i.e. ‘Submission’ post-submit)
    taskListSections = taskListSections
      .filter(section => section.items.length !== 0)

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
