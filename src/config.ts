/**
 * VERSION
 */
import readPkgUp from 'read-pkg-up'

import { KeywordRoomConfig, CRONConfig } from './schema'

export {
  log,
} from 'brolog'

const pkg = readPkgUp.sync({ cwd: __dirname })!.packageJson
export const VERSION = pkg.version

/**
 * Env Vars
 */
export const PORT = process.env.PORT || 8788

export const BOT_ROOM_ID       = '18131996049@chatroom'  // 'ChatOps - BOT5 Wechaty'
export const HEARTBEAT_ROOM_ID = '17376996519@chatroom'  // 'ChatOps - Heartbeat'

export const KEYWORD_ROOM_CONFIG: KeywordRoomConfig[] = [
  {
    cipherList: [
      'wechaty',
    ],
    id: '24113855649@chatroom',
    rules: [
      `Thanks for asking me to invite you for joining the "Wechaty Developers' Home"!`,
      `Wechaty is a Conversational RPA for Wechat, we have a FAQ at https://github.com/wechaty/wechaty/wiki/FAQ`,
      `Please introduce yourself after you join the room, cheers!`,
    ],
    topic: `Wechaty Developers' Home`,
    welcomes: [
      'is joining us as a new Wechaty developer, welcome and please introduce yourself to the community!',
    ],
  },
  {
    cipherList: [
      'aidog',
    ],
    rules: [],
    topic: 'Youth fed the 5th dog',
    welcomes: [
      '禁止在本群测试机器人。 注意：老群已满，此群为AiDog第五个新群',
    ],
  },
  {
    cipherList: [
      'bot5',
      'BotFriday',
    ],
    rules: [
      `I'm trying to invite you into Bot5, please read the manual first: https://www.bot5.club/manuals/newcomer `,
    ],
    topic: 'Bot Friday Open Forum - BFOF',
    welcomes: [
      'Welcome to join us!',
    ],
  },
]

// 定时任务测试
// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *
export const CRON_CONFIG: CRONConfig[] = [
  {
    reply: '星期一了，如果主席还没发活动总结的话要注意了',
    time: '0 0 19 * * 1',
  },
]
