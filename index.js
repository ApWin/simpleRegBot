const telegraf = require('telegraf')
const data = require('./data')
const Stage = require('telegraf/stage')
const session = require('telegraf/session')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage
const stage = new Stage()
const bot = new telegraf(data.token)

const getName = new Scene('getName')
stage.register(getName)
const getYear = new Scene('getYear')
stage.register(getYear)
const getEduc = new Scene('getEduc')
stage.register(getEduc)
const getTheme = new Scene('getTheme')
stage.register(getTheme)
const getLangs = new Scene('getLangs')
stage.register(getLangs)
const getCompSkills = new Scene('getCompSkills')
stage.register(getCompSkills)
const getNumber = new Scene('getNumber')
stage.register(getNumber)
const main = new Scene('main')
stage.register(main)

bot.use(session())
bot.use(stage.middleware())


bot.hears('️⬅️ На главную', (ctx) => {
  ctx.reply('Введите имя, фамилию и отчество')
  ctx.scene.enter('getName')
})

bot.start((ctx) => {
  ctx.reply('Введите имя, фамилию и отчество')
  ctx.scene.enter('getName')
})


getName.on('text', async (ctx) => {
  if (ctx.message.text === '◀️ Назад') {
    return ctx.reply('Вы уже вернулись в самое начало. Введите, пожалуйста, свое имя')
  }

  ctx.session.name = ctx.message.text
  ctx.reply(
    'Введидте год рождения',
    { reply_markup: { keyboard: [['◀️ Назад']], resize_keyboard: true, one_time_keyboard: true } }
    )
  await ctx.scene.leave('getName')
  ctx.scene.enter('getYear')
})

getYear.hears(/^[0-9]{4}$/, async (ctx) => {
  ctx.session.year = ctx.message.text
  ctx.reply('А теперь расскажите о своем образовании. В каком вузе Вы учились и на каком факультете?',
  { reply_markup: { keyboard: [['◀️ Назад', '❌ Стереть все']], resize_keyboard: true, one_time_keyboard: true } }
  )
  await ctx.scene.leave('getYear')
  ctx.scene.enter('getEduc')
})

getYear.hears('◀️ Назад', async (ctx) => {
  ctx.reply(
    'Введите имя, фамилию и отчество',
    { reply_markup: { keyboard: [['◀️ Назад']], resize_keyboard: true, one_time_keyboard: true } }
    )
  await ctx.scene.leave('getYear')
  ctx.scene.enter('getName')
})

getYear.on('text', async (ctx) => {
  ctx.reply('Введите только год в формате 1990',
  { reply_markup: { keyboard: [['◀️ Назад', '❌ Стереть все']], resize_keyboard: true, one_time_keyboard: true } }
  )
})


getEduc.hears('◀️ Назад', async (ctx) => {
  ctx.reply(
    'Введидте год рождения',
    { reply_markup: { keyboard: [['◀️ Назад', '❌ Стереть все']], resize_keyboard: true, one_time_keyboard: true } }
    )
  await ctx.scene.leave('getEduc')
  ctx.scene.enter('getYear')
})

getEduc.hears('❌ Стереть все', async (ctx) => {
  ctx.reply('Начнем заново. Введите имя, фамилию и отчество')
  await ctx.scene.leave('getEduc')
  ctx.scene.enter('getName')
})

getEduc.on('text', async (ctx) => {
  ctx.session.educ = ctx.message.text
  ctx.reply(
    'Напишите тему Вашей дипломной работы',
    { reply_markup: { keyboard: [['◀️ Назад', '❌ Стереть все']], resize_keyboard: true, one_time_keyboard: true } }
  )
  await ctx.scene.leave('getEduc')
  ctx.scene.enter('getTheme')
})


getTheme.hears('◀️ Назад', async (ctx) => {
  ctx.reply(
    'А теперь расскажите о своем образовании. В каком вузе Вы учились и на каком факультете?',
    { reply_markup: { keyboard: [['◀️ Назад', '❌ Стереть все']], resize_keyboard: true, one_time_keyboard: true } }
    )
  await ctx.scene.leave('getTheme')
  ctx.scene.enter('getEduc')
})

getTheme.hears('❌ Стереть все', async (ctx) => {
  ctx.reply('Начнем заново. Введите имя, фамилию и отчество')
  await ctx.scene.leave('getTheme')
  ctx.scene.enter('getName')
})

getTheme.on('text', async (ctx) => {
  ctx.session.theme = ctx.message.text
  ctx.reply(
    'Какими Вы языками и на каком уровне владеете? \n\nНапример: \nEnglish - Intermediate\nРусский - родной',
    { reply_markup: { keyboard: [['◀️ Назад', '❌ Стереть все']], resize_keyboard: true, one_time_keyboard: true } }
  )
  await ctx.scene.leave('getTheme')
  ctx.scene.enter('getLangs')
})


getLangs.hears('◀️ Назад', async (ctx) => {
  ctx.reply(
    'Напишите тему Вашей дипломной работы',
    { reply_markup: { keyboard: [['◀️ Назад', '❌ Стереть все']], resize_keyboard: true, one_time_keyboard: true } }
    )
  await ctx.scene.leave('getLangs')
  ctx.scene.enter('getTheme')
})

getLangs.hears('❌ Стереть все', async (ctx) => {
  ctx.reply('Начнем заново. Введите имя, фамилию и отчество')
  await ctx.scene.leave('getLangs')
  ctx.scene.enter('getName')
})

getLangs.on('text', async (ctx) => {
  ctx.session.langs = ctx.message.text
  ctx.reply('Какими компьютерными программами и на каком уровне Вы владеете?' +
  '\n\nНапример: \nMS Office - в совершенстве,\nAutoCad - средний',
    { reply_markup: { keyboard: [['◀️ Назад', '❌ Стереть все']], resize_keyboard: true, one_time_keyboard: true } }
    )
  await ctx.scene.leave('getLangs')
  ctx.scene.enter('getCompSkills')
})


getCompSkills.hears('◀️ Назад', async (ctx) => {
  ctx.reply(
    'Какими Вы языками и на каком уровне владеете? \n\nНапример: \nEnglish - Intermediate\nРусский - родной',
    { reply_markup: { keyboard: [['◀️ Назад', '❌ Стереть все']], resize_keyboard: true, one_time_keyboard: true } }
    )
  await ctx.scene.leave('getCompSkills')
  ctx.scene.enter('getLangs')
})

getCompSkills.hears('❌ Стереть все', async (ctx) => {
  ctx.reply('Начнем заново. Введите имя, фамилию и отчество')
  await ctx.scene.leave('getCompSkills')
  ctx.scene.enter('getName')
})

getCompSkills.on('text', async (ctx) => {
  ctx.session.compSkills = ctx.message.text
  ctx.reply(
    'Нажмите кнопку "Отправить контакт" ниже, чтобы поделиться номером.',
    { reply_markup: { keyboard: [[{text: '📱 Отправить контакт', request_contact: true}], ['◀️ Назад', '❌ Стереть все']], resize_keyboard: true, one_time_keyboard: true } }
    )
  await ctx.scene.leave('getCompSkills')
  ctx.scene.enter('getNumber')
})


getNumber.hears('◀️ Назад', async (ctx) => {
  ctx.reply(
    'Какими компьютерными программами и на каком уровне Вы владеете?' +
  '\n\nНапример: \nMS Office - в совершенстве,\nAutoCad - средний',
    { reply_markup: { keyboard: [['◀️ Назад', '❌ Стереть все']], resize_keyboard: true, one_time_keyboard: true } }
    )
  await ctx.scene.leave('getNumber')
  ctx.scene.enter('getCompSkills')
})

getNumber.hears('❌ Стереть все', async (ctx) => {
  ctx.reply('Начнем заново. Введите имя, фамилию и отчество')
  await ctx.scene.leave('getNumber')
  ctx.scene.enter('getCompSkills')
})

getNumber.on('contact', async (ctx) => {
  ctx.reply(
    '✅ Спасибо! Ваша заявка принята. Мы Вам перезвоним.',
    { reply_markup: { keyboard: [['️⬅️ На главную']], resize_keyboard: true, one_time_keyboard: true } }
    )
  await ctx.scene.leave('getNumber')
  ctx.scene.enter('main')

  for (let key of data.admins) {
    bot.telegram.sendMessage(
      key,
      `Новая заявка! \n\nФ.И.О: [${ctx.session.name}](tg://user?id=${ctx.from.id}), \nГод рождения: ${ctx.session.year}, \nОбразование: ${ctx.session.educ},` + 
      `\nТема диплома: ${ctx.session.theme}, \nЯзыки: ${ctx.session.langs}, \nВладение компьютером: ${ctx.session.compSkills},` +
      `\nНомер: ${ctx.message.contact.phone_number}`,
      { parse_mode: 'markdown' }
    )
  }
  ctx.session = null
})

bot.startPolling()