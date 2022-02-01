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

  globals.incompleteSections = function (logId, logsObject = false) {
    const logs = logsObject || this.ctx.data.logs
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

    return incompleteSections
  }

  globals.taskListSections = function (logId) {
    const { logs, groups } = this.ctx.data
    const log = logs[logId]
    const incompleteSections = globals.incompleteSections(logId, logs)

    const canSubmit = incompleteSections[0]?.id === 'submit'

    const taskListItem = (section) => {
      let status
      let href = section.paths ? `/logs/${log.id}/${section.id}` : false

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
            href = canSubmit ? section.paths : false
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
        tag: tagStatuses[status]
      }
    }

    let taskListSections = []
    for (const group of groups) {
      let titleHtml = false
      if (group.id === 'household') {
        titleHtml = `<h2 class="rig-task-list__section-heading">About the household</h2>
        <p>Make sure the tenant has seen <a href="/public/files/privacy-notice.pdf">the Department for Levelling Up, Housing &amp; Communities (DLUHC) privacy notice</a> before completing this section.</p>`
      }

      taskListSections.push({
        titleHtml,
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
