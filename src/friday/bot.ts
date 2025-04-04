import {
  Wechaty,
  WechatyBuilder,
  log,
  Message,
}             from 'wechaty'

import { pluginList }       from './plugins/mod.js'
import { vorpalPluginList } from './vorpals/mod.js'

import { getMemory }   from './get-memory.js'
import { setupFinis }  from './setup-finis.js'
import { getIoClient } from './get-io-client.js'
import { setHandlers } from './set-handlers.js'

let bot: undefined | Wechaty

function getFriday (name: string): Wechaty {
  log.verbose('getWechaty', 'getFriday(%s)', name)

  const memory = getMemory(name)

  const wechaty = WechatyBuilder.build({
    memory,
    name,
  })

  setHandlers(wechaty)

  // void pluginList
  // void vorpalPluginList

  /**
   * Initialize Plugins
   */
  wechaty.use(
    ...pluginList,
    ...vorpalPluginList,
  )

  const ioClient = getIoClient(wechaty)

  /**
   * Io Client Hook
   */
  wechaty.on('start', () => ioClient.start())
  wechaty.on('stop',  () => ioClient.stop())

  /**
   * Finis Hook
   */
  setupFinis(wechaty)
    .catch(e => {
      log.error('getWechaty', 'setupFinis() rejection: %s', e)
    })

  bot = wechaty

  return wechaty
}

const ceibsChatOps = async (message: Message) => {
  if (!bot) { return }

  const ROOM_ID = '19537208917@chatroom'  // ChatOps - OA
  const room = await bot.Room.find({ id: ROOM_ID })
  if (!room) {
    throw new Error('room id: ' + ROOM_ID + ' not found')
  }
  await room.say(message.toString())
}

export {
  getFriday,
  ceibsChatOps,
}
