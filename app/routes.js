import express from 'express'
import sections from '../app/data/sections.js'
import * as utils from './utils.js'

const router = express.Router()

/**
 * Logs
 */
router.get('/logs/:logId', (req, res) => {
  const { logId } = req.params
  const { logs } = req.session.data

  const log = utils.getEntryById(logs, logId)

  res.render('logs/log', {
    log
  })
})

router.get('/logs/:logId/:sectionId', (req, res) => {
  const { logId, sectionId } = req.params
  const { logs } = req.session.data

  const log = utils.getEntryById(logs, logId)
  const section = utils.getById(sections, sectionId)
  const sectionRoot = `/logs/${logId}/${sectionId}`
  const sectionFirstPath = section.paths(sectionRoot)[0]

  if (log[sectionId]?.completed === 'true') {
    res.redirect(`${sectionRoot}/check-answers`)
  } else {
    res.redirect(`${sectionFirstPath}`)
  }
})

router.get('/logs/:logId/:sectionId/:view?', (req, res) => {
  const { logId, sectionId, view } = req.params
  const { referrer } = req.query
  const { logs } = req.session.data

  const log = utils.getEntryById(logs, logId)
  const section = utils.getById(sections, sectionId)
  const sectionRoot = `/logs/${logId}/${sectionId}`

  // Calculate back and next paths
  const paths = section.paths
    ? utils.nextAndBackPaths(section.paths(sectionRoot), req)
    : {}

  res.render(`logs/${sectionId}/${view}`, {
    caption: section.title,
    log,
    logPath: `/logs/${log.id}`,
    section,
    paths,
    referrer
  })
})

router.post('/logs/:logId/:sectionId/:view?', (req, res) => {
  const { logId, sectionId } = req.params

  const section = utils.getById(sections, sectionId)
  const sectionRoot = `/logs/${logId}/${sectionId}`
  const sectionKeyPath = `logs[${logId}][${sectionId}]`

  // Calculate back and next paths
  const paths = section.paths
    ? utils.nextAndBackPaths(section.paths(sectionRoot), req)
    : {}

  // Fork if next path is a fork
  const fork = utils.nextForkPath(section.forks(sectionRoot, sectionKeyPath), req)

  fork ? res.redirect(fork) : res.redirect(paths.next)
})

export default router
