import { format, isThisWeek, isToday, isYesterday } from "date-fns"

export default function dateGenerator(messageDate: Date) {

        if (isToday(messageDate)) {
            return "Today at " + format(messageDate, "p")
        } else if (isYesterday(messageDate)) {
            return "Yesterday at " + format(messageDate, "p")
        } else if (isThisWeek(messageDate)) {
            return format(messageDate, "EEEE")
        } else {
            return format(messageDate, "PP")
        }
}