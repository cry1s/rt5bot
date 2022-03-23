import { Telegraf } from 'telegraf';


if (!process.env.BOT_TOKEN) {
    console.log("dev mode");
    require('dotenv').config();
}

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start((ctx) => {
    ctx.reply('Welcome')
    console.log("Welcome")
})
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

class Subject {
    time1: string;
    time2: string;
    name: string;
    prepod: string;
    notes: string[];
    constructor(time1: string, time2: string, name: string, prepod: string, notes: string[]) {
        this.name = name;
        this.time1 = time1;
        this.time2 = time2;
        this.prepod = prepod;
        this.notes = notes;
    }

    addNote(note: string) {
        this.notes.push(note);
    }
}

class WorkDay {
    weekday: Weekday;
    subjects: Subject[];
    notes: string[];
    constructor(weekday: Weekday, subjects: Subject[], notes: string[]) {
        this.weekday = weekday;
        this.subjects = subjects;
        this.notes = notes
    }
}

class Schedule {
    days: WorkDay[];
    chat: number;
    constructor(days: WorkDay[], chat: number) {
        this.days = days;
        this.chat = chat;
    }
}

enum Weekday {
    mon = "Понедельник",
    tue = "Вторник",
    wed = "Среда",
    thu = "Четверг", 
    fri = "Пятница", 
    sat = "Суббота", 
    sun = "Воскресенье",
}