import {
  Message,
  type,
}               from 'wechaty'
import {
  SourceToTargetRoomConnector,
  matchers,
}                                     from 'wechaty-plugin-contrib'

import {
  MIKE_CONTACT_ID,
}                             from '../../../../../database.js'

import {
  wechatyDevelopers,
}                             from '../../../../../database/mod.js'

import { bidirectionalMapper }  from '../../bidirectional-mapper.js'
import { unidirectionalMapper } from '../../unidirectional-mapper.js'

const matchChinese = matchers.languageMatcher('chinese')

/**
 *
 * Many to One
 *
 */
const HomeToChinesePlugin = SourceToTargetRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  map: async (message: Message) => {
    if (message.type() === type.Message.Text) {
      if (!matchChinese(message.text())) {
        return undefined
      }
    } else if (message.type() === type.Message.Url) {
      const urlLink = await message.toUrlLink()
      const text = urlLink.description() ?? urlLink.title()
      if (!matchChinese(text)) {
        return undefined
      }
    }

    const room = message.room()
    // if (message.room()?.id === HEADQUARTERS_ROOM_ID) {
    if (room && wechatyDevelopers.homeHq.includes(room.id)) {
      return unidirectionalMapper(message)
    } else {
      return bidirectionalMapper(message)
    }
  },
  source: [
    ...wechatyDevelopers.home,  // DEVELOPERS_ROOM_ID_LIST,
    ...wechatyDevelopers.homeHq, // HEADQUARTERS_ROOM_ID,
  ],
  target: [
    ...wechatyDevelopers.chinese, // DEVELOPERS_ROOM_ID_CHINESE,
  ],
})

export {
  HomeToChinesePlugin,
}
